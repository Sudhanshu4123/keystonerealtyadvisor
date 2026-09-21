import paramiko
import os
import tarfile
import time
import sys

sys.stdout.reconfigure(encoding='utf-8', line_buffering=True)

hostname = "187.127.134.114"
username = "root"
password = "Shrishyam@2026#"

remote_dir = "/opt/keystone"
local_base = r"c:\Users\sanje\Downloads\keystone"
archive_name = r"c:\Users\sanje\Downloads\keystone_bundle.tar.gz"

print(">>> Step 1: Creating tar.gz bundle of Keystone project...")

def make_tarfile(output_filename, source_dir):
    with tarfile.open(output_filename, "w:gz") as tar:
        for root, dirs, files in os.walk(source_dir):
            # Ignore node_modules, target, .git, dist, etc.
            dirs[:] = [d for d in dirs if d not in ['node_modules', 'target', '.git', '.mvn', 'dist', '.gemini', 'scratch']]
            for file in files:
                if file.endswith('.tar.gz') or file.endswith('.log') or file.startswith('scratch_'):
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

# 3. Create .env file for production
env_content = """# Production Environment Configuration
HTTP_PORT=3002
HTTPS_PORT=443
DOMAIN_NAME=keystonerealtyadvisors.shrishyamassociate.com

DB_NAME=keystonedb
DB_USERNAME=keystone_user
DB_PASSWORD=KeystoneSecure2026!Prod
DB_ROOT_PASSWORD=KeystoneRoot2026!Pass

JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
CLOUDINARY_CLOUD_NAME=Root
CLOUDINARY_API_KEY=877916588632514
CLOUDINARY_API_SECRET=81UKRoZlSzOgkntxnN7Jdf9e4_A

CORS_ALLOWED_ORIGINS=http://localhost:3002,http://localhost:80,https://keystonerealtyadvisors.shrishyamassociate.com,https://keystonerealtyadvisors.com,https://keystonerealtyadvisor.com,https://www.keystonerealtyadvisor.com

INITIAL_ADMIN_EMAIL=keystonerealtyhepldesk@gmail.com
INITIAL_ADMIN_PASSWORD=KeystoneAdmin2026!
INITIAL_ADMIN_NAME=Keystone Executive Admin
INITIAL_ADMIN_PHONE=9911956274
"""

sftp = client.open_sftp()
with sftp.file(f"{remote_dir}/.env", "w") as f:
    f.write(env_content)
sftp.close()
run_cmd(f"chmod 600 {remote_dir}/.env", "Securing .env permissions")

# 4. Update Host Nginx Configuration for Keystone
nginx_keystone_conf = """server {
    server_name keystonerealtyadvisors.shrishyamassociate.com www.keystonerealtyadvisors.shrishyamassociate.com keystonerealtyadvisors.com www.keystonerealtyadvisors.com keystonerealtyadvisor.com www.keystonerealtyadvisor.com;

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
    server_name keystonerealtyadvisor.com www.keystonerealtyadvisor.com keystonerealtyadvisors.com www.keystonerealtyadvisors.com keystonerealtyadvisors.shrishyamassociate.com www.keystonerealtyadvisors.shrishyamassociate.com;
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
run_cmd("pm2 list", "Verify Shrishyam website is still running unharmed in PM2")

client.close()

if os.path.exists(archive_name):
    os.remove(archive_name)

print("\n>>> ALL DEPLOYMENT TASKS COMPLETED! <<<")
