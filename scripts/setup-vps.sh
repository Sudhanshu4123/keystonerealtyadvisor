#!/bin/bash
# ==============================================================================
# KEYSTONE REALTY ADVISOR - VPS PRODUCTION SECURITY & PROVISIONING SCRIPT
# Configures Firewall (UFW), Docker-UFW Fix, Permissions & Automated Backups
# ==============================================================================

set -euo pipefail

echo "======================================================================"
echo " Keystone Realty Advisor - Production VPS Provisioning"
echo "======================================================================"

if [ "$EUID" -ne 0 ]; then
  echo "[ERROR] Please run this script as root or using sudo."
  exit 1
fi

APP_DIR="/opt/keystone"

# 1. Update Packages and Install Essential Security Tools
echo "[INFO] Updating system packages..."
apt-get update && apt-get install -y ufw fail2ban curl git unattended-upgrades

# 2. Configure UFW Firewall
echo "[INFO] Configuring UFW firewall rules..."
ufw default deny incoming
ufw default allow outgoing

# Allow standard SSH (Port 22), HTTP (80), and HTTPS (443)
ufw allow 22/tcp comment 'SSH Access'
ufw allow 80/tcp comment 'HTTP Web Traffic'
ufw allow 443/tcp comment 'HTTPS Encrypted Traffic'

# Enable UFW without prompting
ufw --force enable
echo "[SUCCESS] UFW enabled with strict inbound policy (22, 80, 443 only)."

# 3. Docker-UFW Security Fix (Prevents Docker from exposing container ports through iptables)
echo "[INFO] Securing Docker iptables with ufw-docker configuration..."
UFW_AFTER_RULES="/etc/ufw/after.rules"
if ! grep -q "ufw-docker-routes" "$UFW_AFTER_RULES"; then
  cat << 'EOF' >> "$UFW_AFTER_RULES"

# ==================== UFW-DOCKER ISOLATION RULES ====================
*filter
:ufw-user-forward - [0:0]
:ufw-docker-logging-deny - [0:0]
:DOCKER-USER - [0:0]
-A DOCKER-USER -j ufw-user-forward
-A DOCKER-USER -j RETURN -m comment --comment "allow all internal docker traffic"
COMMIT
# ====================================================================
EOF
  systemctl restart ufw || true
  echo "[SUCCESS] Docker iptables firewall bypass prevented."
fi

# 4. Lockdown File Permissions
echo "[INFO] Setting secure file permissions in ${APP_DIR}..."
if [ -d "${APP_DIR}" ]; then
  chmod 700 "${APP_DIR}/scripts/"*.sh || true
  if [ -f "${APP_DIR}/.env" ]; then
    chmod 600 "${APP_DIR}/.env"
    echo "[SUCCESS] .env permissions restricted to owner only (chmod 600)."
  fi
fi

# 5. Configure Automated Daily Backup Cron Job
echo "[INFO] Setting up daily backup cron job at 02:00 AM..."
CRON_JOB="0 2 * * * ${APP_DIR}/scripts/backup.sh >> /var/log/keystone_backup.log 2>&1"
(crontab -l 2>/dev/null | grep -v "keystone/scripts/backup.sh" ; echo "${CRON_JOB}") | crontab -
echo "[SUCCESS] Automated backup schedule configured."

echo "======================================================================"
echo " VPS Security & Infrastructure Provisioning Complete!"
echo " Next Steps:"
echo " 1. Verify /opt/keystone/.env credentials."
echo " 2. Run: cd /opt/keystone && docker compose up --build -d"
echo " 3. Verify health: curl -I http://localhost/actuator/health"
echo "======================================================================"
