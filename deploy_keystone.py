import paramiko
import os
import tarfile
import time
import sys

import getpass

sys.stdout.reconfigure(encoding='utf-8', line_buffering=True)

hostname = os.environ.get("DEPLOY_HOST")
if not hostname:
    if sys.stdin.isatty():
        hostname = input("Enter VPS IP/hostname: ").strip()
    else:
        print("ERROR: Please set DEPLOY_HOST environment variable.")
        sys.exit(1)

username = os.environ.get("DEPLOY_USER", "root")
password = os.environ.get("DEPLOY_PASSWORD")
if not password:
    if len(sys.argv) > 1 and not sys.argv[1].startswith("-"):
        password = sys.argv[1]
    elif sys.stdin.isatty():
        password = getpass.getpass("Enter VPS SSH password: ")
    else:
        print("ERROR: Please set DEPLOY_PASSWORD environment variable or pass password as argument.")
        sys.exit(1)

remote_dir = "/opt/keystone"
local_base = os.path.dirname(os.path.abspath(__file__))
archive_name = os.path.join(os.environ.get("TEMP", "/tmp"), "keystone_bundle.tar.gz")

print(">>> Step 1: Creating tar.gz bundle of Keystone project...")

def make_tarfile(output_filename, source_dir):
    with tarfile.open(output_filename, "w:gz") as tar:
        for root, dirs, files in os.walk(source_dir):
            # Ignore node_modules, target, .git, dist, scratch, backups, etc.
            dirs[:] = [d for d in dirs if d not in ['node_modules', 'target', '.git', '.mvn', 'dist', '.gemini', 'scratch', 'backups']]
            for file in files:
                if (file.endswith('.tar.gz') or file.endswith('.log') or 
                    file.endswith('.sql') or file.endswith('.sql.gz') or file.endswith('.dump') or file.endswith('.bak') or
                    file.startswith('.env') or file.startswith('scratch_')):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                tar.add(full_path, arcname=rel_path)

make_tarfile(archive_name, local_base)
size_mb = os.path.getsize(archive_name) / (1024 * 1024)
print(f"Bundle created: {archive_name} ({size_mb:.2f} MB)")

print("\n>>> Step 2: Connecting to server via SSH & SFTP...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname, port=22, username=username, password=password, timeout=30)

sftp = client.open_sftp()
remote_tar = "/tmp/keystone_bundle.tar.gz"

print(f"Uploading bundle to {remote_tar}...")
sftp.put(archive_name, remote_tar)
print("Upload completed successfully!")
sftp.close()

def run_cmd(cmd, desc):
    print(f"\n--- {desc} ---")
    print(f"[EXEC]: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    if out:
        print(out.strip())
    if err and not out:
        print(f"[STDERR]: {err.strip()}")
    return out, err

print("\n>>> Step 3: Preparing server environment...")

# 1. Stop old keystone PM2 processes if any
run_cmd("pm2 delete keystone-backend keystone-frontend keystone-admin 2>/dev/null || true; pm2 save", "Clean up old PM2 processes")

# 2. Setup /opt/keystone directory and extract
run_cmd(f"mkdir -p {remote_dir} && tar -xzf {remote_tar} -C {remote_dir} && rm -f {remote_tar}", "Extracting files to /opt/keystone")

# 3. Handle .env file for production (preserve existing remote secrets)
sftp = client.open_sftp()
env_remote_path = f"{remote_dir}/.env"
env_exists = False
try:
    sftp.stat(env_remote_path)
    env_exists = True
    print(f"[INFO] Existing {env_remote_path} found on server. Preserving production secrets.")
except IOError:
    env_exists = False

if not env_exists:
    # If no .env exists on server, check for local .env or create from environment variables
    local_env_path = os.path.join(local_base, ".env")
    if os.path.exists(local_env_path):
        print(f"[INFO] Uploading local .env to {env_remote_path}...")
        sftp.put(local_env_path, env_remote_path)
    else:
        print(f"[WARN] No .env found on server or locally. Creating configuration from environment variables...")
        env_content = f"""# Production Environment Configuration
HTTP_PORT=3002
HTTPS_PORT=443
DOMAIN_NAME=keystonerealtyadvisor.com

DB_NAME=keystonedb
DB_USERNAME=keystone_user
DB_PASSWORD={os.environ.get('DB_PASSWORD', '')}
DB_ROOT_PASSWORD={os.environ.get('DB_ROOT_PASSWORD', '')}

JWT_SECRET={os.environ.get('JWT_SECRET', '')}
CLOUDINARY_CLOUD_NAME={os.environ.get('CLOUDINARY_CLOUD_NAME', '')}
CLOUDINARY_API_KEY={os.environ.get('CLOUDINARY_API_KEY', '')}
CLOUDINARY_API_SECRET={os.environ.get('CLOUDINARY_API_SECRET', '')}

CORS_ALLOWED_ORIGINS=https://keystonerealtyadvisor.com,https://www.keystonerealtyadvisor.com,http://localhost:3002

INITIAL_ADMIN_EMAIL={os.environ.get('INITIAL_ADMIN_EMAIL', 'keystonexhelpdesk@gmail.com')}
INITIAL_ADMIN_PASSWORD={os.environ.get('INITIAL_ADMIN_PASSWORD', '')}
INITIAL_ADMIN_NAME=Keystone Executive Admin
INITIAL_ADMIN_PHONE=9911956274
"""
        with sftp.file(env_remote_path, "w") as f:
            f.write(env_content)
sftp.close()
run_cmd(f"chmod 600 {env_remote_path}", "Securing .env permissions")

# 4. Update Host Nginx Configuration for Keystone
nginx_keystone_conf = """server {
    server_name keystonerealtyadvisors.com www.keystonerealtyadvisors.com keystonerealtyadvisor.com www.keystonerealtyadvisor.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Cross-Origin-Opener-Policy "same-origin-allow-popups" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    client_max_body_size 50M;

    # Proxy all Keystone traffic to the container on port 3002
    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/keystonerealtyadvisor.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/keystonerealtyadvisor.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name keystonerealtyadvisor.com www.keystonerealtyadvisor.com keystonerealtyadvisors.com www.keystonerealtyadvisors.com;
    return 301 https://$host$request_uri;
}
"""

sftp = client.open_sftp()
with sftp.file("/etc/nginx/sites-available/keystone", "w") as f:
    f.write(nginx_keystone_conf)
sftp.close()

run_cmd("ln -sf /etc/nginx/sites-available/keystone /etc/nginx/sites-enabled/keystone && nginx -t && systemctl reload nginx", "Testing and reloading Host Nginx")

print("\n>>> Step 4: Building and launching Docker Compose services...")
run_cmd(f"cd {remote_dir} && docker compose down 2>/dev/null || true", "Stopping any existing compose instances")
run_cmd("docker builder prune -f", "Pruning stale Docker build cache")
run_cmd(f"cd {remote_dir} && docker compose up --build -d", "Docker Compose Build & Run")

print("\n>>> Step 5: Waiting 20 seconds for services to initialize...")
time.sleep(20)

run_cmd(f"cd {remote_dir} && docker compose ps", "Check container status")
run_cmd("curl -I http://localhost:3002", "Local container health check")
run_cmd("curl -s http://localhost:3002/actuator/health || true", "Backend actuator health check")

client.close()

if os.path.exists(archive_name):
    os.remove(archive_name)

print("\n>>> ALL DEPLOYMENT TASKS COMPLETED! <<<")
