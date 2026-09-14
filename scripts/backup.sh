#!/bin/bash
# ==============================================================================
# KEYSTONE REALTY ADVISOR - AUTOMATED BACKUP SCRIPT
# Backs up MySQL Database & Uploaded Property Images
# ==============================================================================

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/keystone/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=14

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

echo "[INFO] Starting Keystone Realty Advisor backup at $(date)..."

# 1. Backup MySQL Database
DB_BACKUP_FILE="${BACKUP_DIR}/keystone_db_${TIMESTAMP}.sql.gz"
echo "[INFO] Dumping MySQL database to ${DB_BACKUP_FILE}..."

docker exec keystone_mysql mysqldump \
  -u root -p"${DB_ROOT_PASSWORD:-keystone_root_pass}" \
  --single-transaction \
  --quick \
  --routines \
  --triggers \
  "${DB_NAME:-keystonedb}" | gzip > "${DB_BACKUP_FILE}"

# Verify DB backup file size
if [ ! -s "${DB_BACKUP_FILE}" ]; then
  echo "[ERROR] Database backup failed or created empty file!"
  exit 1
fi
echo "[SUCCESS] Database backup completed. Size: $(du -h "${DB_BACKUP_FILE}" | cut -f1)"

# 2. Backup Uploaded Property Images
MEDIA_BACKUP_FILE="${BACKUP_DIR}/keystone_uploads_${TIMESTAMP}.tar.gz"
echo "[INFO] Archiving property media assets to ${MEDIA_BACKUP_FILE}..."

docker run --rm \
  --volumes-from keystone_backend \
  -v "${BACKUP_DIR}:/backup" \
  alpine:latest \
  tar -czf "/backup/keystone_uploads_${TIMESTAMP}.tar.gz" -C /app uploads

echo "[SUCCESS] Media backup completed. Size: $(du -h "${MEDIA_BACKUP_FILE}" | cut -f1)"

# 3. Generate SHA256 Checksums
cd "${BACKUP_DIR}"
sha256sum "keystone_db_${TIMESTAMP}.sql.gz" "keystone_uploads_${TIMESTAMP}.tar.gz" > "${BACKUP_DIR}/checksum_${TIMESTAMP}.sha256"

# 4. Clean up backups older than RETENTION_DAYS
echo "[INFO] Purging backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -name "keystone_*" -type f -mtime +${RETENTION_DAYS} -delete
find "${BACKUP_DIR}" -name "checksum_*" -type f -mtime +${RETENTION_DAYS} -delete

echo "[SUCCESS] Backup workflow successfully finalized at $(date)."
