# Keystone Realty Advisor - Production Security & Hardening Guide

Comprehensive operational guide for securing, deploying, and maintaining the **Keystone Realty Advisor** real-estate platform on a Linux VPS.

---

## 1. Network Topology & Isolation

```
                         INTERNET
                            │
                            ▼
                     DNS (A Record)
                            │
                            ▼
                      UFW FIREWALL
                (Ports 22, 80, 443 ONLY)
                            │
                            ▼
              NGINX REVERSE PROXY (Port 80/443)
              (frontend_net: 172.20.0.0/16)
                    ├── Static React Assets
                    ├── Rate Limiting (5r/m auth, 30r/s API)
                    ├── Security Headers (CSP, HSTS, X-Frame)
                    └── Reverse Proxy (/api/ & /uploads/)
                            │
                            ▼
               SPRING BOOT API (Port 8080)
           (Bridges frontend_net & backend_net)
                    ├── Stateless JWT Authentication
                    ├── BCrypt Password Hashing
                    ├── IDOR Ownership Verification
                    └── Input Sanitization & Actuator Health
                            │
                            ▼ (internal: true)
                MYSQL 8.0 (Port 3306)
             (backend_net: 172.21.0.0/16)
           * No host port binding (0.0.0.0:3306)
           * Completely isolated from external network
```

---

## 2. Server SSH Security Checklist

To prevent brute force attacks on VPS SSH:

### A. Setup Dedicated Admin User & SSH Key
```bash
# On your local machine:
ssh-keygen -t ed25519 -C "admin@keystonerealty.com"
ssh-copy-id -i ~/.ssh/id_ed25519.pub deployer@<YOUR_VPS_IP>
```

### B. Harden `/etc/ssh/sshd_config`
```ini
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no
```

```bash
sudo systemctl restart ssh
```
*(Verify key-based login in a new terminal window before closing your active session).*

---

## 3. UFW Firewall & Docker-UFW Bypass Fix

Standard Docker modifies `iptables` directly, which can bypass standard UFW rules. We prevent this by enforcing UFW user-forwarding in `/etc/ufw/after.rules`.

Run the automated provisioning script:
```bash
sudo /opt/keystone/scripts/setup-vps.sh
```

Rules applied:
* `ufw default deny incoming`
* `ufw default allow outgoing`
* `ufw allow 22/tcp`
* `ufw allow 80/tcp`
* `ufw allow 443/tcp`

---

## 4. Rate Limiting & Denial of Service Protection

Configured at Nginx reverse proxy level:
* **Authentication Rate Limit (`/api/auth/`)**: 5 requests per minute with burst of 5 per IP address.
* **General API Rate Limit (`/api/`)**: 30 requests per second with burst of 20 per IP address.
* **Status Code on Limit Exceeded**: `429 Too Many Requests`.

---

## 5. Automated HTTPS / TLS Setup with Certbot

To enable production SSL on your domain:

### Step 1: Issue SSL Certificate
```bash
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  --email keystonerealtyhepldesk@gmail.com \
  -d yourdomain.com -d www.yourdomain.com \
  --rsa-key-size 4096 \
  --agree-tos \
  --force-renewal" certbot
```

### Step 2: Switch Nginx to SSL Mode
Replace `frontend/nginx.conf` with `frontend/nginx-ssl.conf` inside the Dockerfile or mount it:
```bash
docker compose restart frontend
```

### Step 3: Enable Auto-Renewal Background Service
```bash
docker compose --profile ssl up -d certbot
```

---

## 6. Disaster Recovery & Automated Backups

### Automated Schedule
The backup script (`scripts/backup.sh`) is executed automatically every night at 02:00 AM via cron.

### Manual Backup
```bash
sudo /opt/keystone/scripts/backup.sh
```
Outputs:
* `keystone_db_<TIMESTAMP>.sql.gz`
* `keystone_uploads_<TIMESTAMP>.tar.gz`
* `checksum_<TIMESTAMP>.sha256`

### Restoration Procedure
```bash
sudo /opt/keystone/scripts/restore.sh \
  /opt/keystone/backups/keystone_db_20260912_120000.sql.gz \
  /opt/keystone/backups/keystone_uploads_20260912_120000.tar.gz
```

---

## 7. Security Hardening Summary Table

| Security Concern | Implementation Mechanism | Status |
| :--- | :--- | :--- |
| **MySQL Exposure** | Internal Docker network (`internal: true`), no host port mapping | Active |
| **Direct Backend Access** | Backend port 8080 unmapped to host; routed exclusively via Nginx | Active |
| **Authentication & Auth** | Stateless JWT (JJWT 0.12.6), BCrypt hashing, Spring Security 6 | Active |
| **IDOR Protection** | Backend ownership checks on User & Enquiry resources | Active |
| **Brute Force Defense** | Nginx `limit_req` zones (5 req/min on `/api/auth/`) | Active |
| **XSS & Clickjacking** | Strict CSP, X-Frame-Options (`SAMEORIGIN`), X-Content-Type-Options (`nosniff`) | Active |
| **Malicious Uploads** | MIME + extension validation, random UUID storage filenames | Active |
| **Resource Starvation** | CPU & Memory limits in Docker Compose | Active |
| **Data Loss** | Automated timestamped backups with 14-day retention | Active |
