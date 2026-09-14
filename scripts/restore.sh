#!/bin/bash
# ==============================================================================
# KEYSTONE REALTY ADVISOR - RESTORE SCRIPT
# Restores Database and Uploaded Media from Backups
# ==============================================================================

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <timestamp_or_sql_gz_path> [uploads_tar_gz_path]"
  echo "Example: $0 /opt/keystone/backups/keystone_db_20260912_120000.sql.gz /opt/keystone/backups/keystone_uploads_20260912_120000.tar.gz"
  exit 1
fi

DB_ARCHIVE="$1"
MEDIA_ARCHIVE="${2:-}"

# Verify Database archive exists
if [ ! -f "${DB_ARCHIVE}" ]; then
  echo "[ERROR] Database archive file not found: ${DB_ARCHIVE}"
  exit 1
fi

echo "[CAUTION] This will overwrite the current database '${DB_NAME:-keystonedb}'."
read -p "Are you sure you want to proceed with restore? (y/N): " CONFIRM
if [[ "${CONFIRM}" != "y" && "${CONFIRM}" != "Y" ]]; then
  echo "[INFO] Restore operation cancelled."
  exit 0
fi

echo "[INFO] Restoring MySQL database from ${DB_ARCHIVE}..."
gunzip < "${DB_ARCHIVE}" | docker exec -i keystone_mysql mysql -u root -p"${DB_ROOT_PASSWORD:-keystone_root_pass}" "${DB_NAME:-keystonedb}"
echo "[SUCCESS] Database restored successfully."

# Restore Media Assets if provided
if [ -n "${MEDIA_ARCHIVE}" ] && [ -f "${MEDIA_ARCHIVE}" ]; then
  echo "[INFO] Restoring property media assets from ${MEDIA_ARCHIVE}..."
  docker run --rm \
    --volumes-from keystone_backend \
    -v "$(dirname "${MEDIA_ARCHIVE}"):/backup" \
    alpine:latest \
    tar -xzf "/backup/$(basename "${MEDIA_ARCHIVE}")" -C /app
  echo "[SUCCESS] Property media assets restored successfully."
fi

echo "[SUCCESS] Complete restore operation finished."
