# KEYSTONE REALTY ADVISOR
### Production Real Estate Advisory & Property Management Platform

A high-end, production-grade real estate platform and management system architected for **Keystone Realty Advisor**. Built with **React 18**, **Spring Boot 3 (Java 21)**, **MySQL 8**, **Spring Security 6 with JWT**, and fully containerized using **Docker & Docker Compose**.

---

## 1. Production Network Architecture & Isolation

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

## 2. Technology Stack

* **Frontend**: React 18, React Router v6, Axios, Lucide React, Bespoke CSS Design System (`Plus Jakarta Sans` & `Outfit`).
* **Backend**: Java 21, Spring Boot 3.3.4, Spring Data JPA, Spring Security 6, Spring Boot Actuator, JJWT (0.12.6), Bean Validation, REST API.
* **Database**: MySQL 8.0.36 with InnoDB, relational foreign key constraints, timestamps, and indexes.
* **Security**: Stateless JWT token authentication, BCrypt password encryption, role-based authorization (`ROLE_USER`, `ROLE_ADMIN`), rate limiting, IDOR prevention.
* **Storage**: Persistent local disk / Docker volume asset storage with MIME type validation.
* **Containerization**: Multi-stage Docker builds for backend and frontend orchestrated via Docker Compose with segmented networks and resource limits.

---

## 3. Zero Demo Data Compliance

In accordance with institutional standards:
* **Zero fake listings, fake agents, fake testimonials, or fake metrics are included.**
* When the database is newly initialized, the platform displays custom, high-end empty states:
  * **"No properties available at the moment."**
  * **"No image available"** (Architectural SVG fallback).
* All properties, images, inquiries, favorites, and dashboard counts reflect **100% authentic database state**.

---

## 4. Key Platform Features

### A. Public Client Experience
* **Hero Search Engine**: Instant filtering across keywords, cities, property types, listing types (Sale, Rent, Lease), and price thresholds.
* **Dynamic Property Discovery**: Responsive grid with specs (Beds, Baths, Area, Price), listing status badges, and favorites integration.
* **Property Detail & Gallery**: High-resolution image carousel, fullscreen lightbox view, comprehensive specifications, and direct enquiry modal.
* **Advisory Practice**: Dedicated consultation pages for residential acquisitions, commercial leasing, and portfolio valuations.
* **Direct Enquiries**: Public and user-authenticated consultation enquiry submissions.

### B. Authenticated Client Dashboard (`/dashboard`)
* **Saved Shortlist**: Add/remove properties to client favorites with instant portfolio sync.
* **Enquiry Tracking**: Live lifecycle monitoring of submitted consultations (`PENDING`, `CONTACTED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).
* **Profile & Security**: Name/phone updates and secure password changes.

### C. Executive Admin Console (`/admin`)
* **Live Dashboard Metrics**: Real database aggregates (Total Properties, Available, Sold, Rented, Users, Enquiries).
* **Property Inventory Management**: Full CRUD, status transitions, multi-image uploads, thumbnail management, and primary image selection.
* **Enquiry Management Desk**: Filter inquiries by status, view complete inquiry history, update resolution status, or delete entries.
* **User Accounts Console**: View registered accounts, portfolios, enquiry activity, and manage account statuses (`ACTIVE`, `INACTIVE`, `SUSPENDED`).

---

## 5. Security & Hardening Features

* **Network Segmentation**: MySQL is placed on an isolated `backend_net` (`internal: true`) with no public host port binding. Port 3306 is completely inaccessible from the outside.
* **Reverse Proxy Rate Limiting**: Nginx applies `5 req/min` limits on `/api/auth/` and `30 req/sec` limits on general `/api/` endpoints to protect against brute-force attacks.
* **Hardened Security Headers**: Strict Content Security Policy (CSP), HSTS (`max-age=31536000`), X-Frame-Options (`SAMEORIGIN`), X-Content-Type-Options (`nosniff`), Permissions-Policy.
* **IDOR & Ownership Controls**: Object authorization checks on User, Favorites, and Enquiry resources ensure standard users cannot access other users' data.
* **Resource Limits**: CPU and memory limits are configured in Docker Compose to prevent denial of service from runaway container processes.
* **Actuator Protection**: Spring Boot Actuator exposes only `/actuator/health` and `/actuator/info` while keeping all internal environment and config endpoints restricted.

---

## 6. REST API Reference

### Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public (Rate Limited) | Register new client account |
| `POST` | `/api/auth/login` | Public (Rate Limited) | Authenticate user & receive JWT |

### Properties
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Public | Search and filter properties with pagination |
| `GET` | `/api/properties/featured` | Public | Retrieve latest available properties |
| `GET` | `/api/properties/{id}` | Public | Get property details by ID |
| `POST` | `/api/properties` | Admin | Create a new property listing |
| `PUT` | `/api/properties/{id}` | Admin | Update property specifications |
| `DELETE` | `/api/properties/{id}` | Admin | Delete property and physical images |
| `POST` | `/api/properties/{id}/images` | Admin | Upload multi-image assets |
| `DELETE` | `/api/properties/{id}/images/{imgId}` | Admin | Delete specific property image |
| `PUT` | `/api/properties/{id}/images/{imgId}/primary` | Admin | Set primary listing image |
| `PATCH` | `/api/properties/{id}/status` | Admin | Update property status |

### Client Dashboard & Favorites
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Authenticated | Get current user profile |
| `PUT` | `/api/users/profile` | Authenticated | Update name & phone |
| `PUT` | `/api/users/password` | Authenticated | Change password |
| `GET` | `/api/favorites` | Authenticated | List saved properties |
| `POST` | `/api/favorites/{propertyId}` | Authenticated | Add property to favorites |
| `DELETE` | `/api/favorites/{propertyId}` | Authenticated | Remove property from favorites |

### Enquiries
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/enquiries` | Public / Auth | Submit an advisory inquiry |
| `GET` | `/api/enquiries/my` | Authenticated | Get user's inquiry history |
| `GET` | `/api/enquiries/{id}` | Authenticated | Get inquiry detail (IDOR protected) |

### Admin Operations
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Admin | Real-time database metrics |
| `GET` | `/api/admin/users` | Admin | List all registered user accounts |
| `PATCH` | `/api/admin/users/{id}/status` | Admin | Update account status (`ACTIVE`, etc.) |
| `GET` | `/api/admin/enquiries` | Admin | View all customer enquiries |
| `PATCH` | `/api/admin/enquiries/{id}/status` | Admin | Update inquiry workflow status |
| `DELETE` | `/api/admin/enquiries/{id}` | Admin | Delete enquiry record |

---

## 7. Local Development Setup

### Prerequisites
* Java 21 JDK
* Node.js 18+ & npm
* MySQL 8.0 (or Docker)

### 1. Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```
API runs on `http://localhost:8080`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` and proxies API requests automatically to `http://localhost:8080`.

---

## 8. Docker Deployment (Docker Compose)

### 1. Configure Environment
```bash
cp .env.example .env
# Edit .env to set your secure database password and JWT secret
```

### 2. Launch Stack
```bash
docker compose up --build -d
```

### 3. Verify Health & Security
```bash
docker compose ps
curl -I http://localhost/actuator/health
```

### Initial Administrator Access
On first startup, the system automatically creates the root administrator account:
* **Email**: `keystonerealtyhepldesk@gmail.com`
* **Password**: `KeystoneAdmin2026!`
* **Phone**: `9911956274`

---

## 9. VPS Production Provisioning & Hardening

### Step 1: Provision Firewall & Security on Ubuntu VPS
Run the included provisioning script to configure UFW firewall rules (allowing only 22, 80, 443), apply the Docker-UFW iptables fix, lock down file permissions (`chmod 600 .env`), and schedule daily backups:
```bash
sudo /opt/keystone/scripts/setup-vps.sh
```

### Step 2: Automated HTTPS / TLS with Certbot
```bash
# Request SSL Certificate:
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  --email keystonerealtyhepldesk@gmail.com \
  -d yourdomain.com -d www.yourdomain.com \
  --agree-tos --force-renewal" certbot

# Enable Certbot auto-renewal background daemon:
docker compose --profile ssl up -d certbot
```

### Step 3: Automated Backups & Disaster Recovery
* **Automated Daily Backups**: Scheduled at 02:00 AM via cron job to `/opt/keystone/backups/`.
* **Manual Backup Execution**:
  ```bash
  sudo /opt/keystone/scripts/backup.sh
  ```
* **Restore from Backup**:
  ```bash
  sudo /opt/keystone/scripts/restore.sh \
    /opt/keystone/backups/keystone_db_<TIMESTAMP>.sql.gz \
    /opt/keystone/backups/keystone_uploads_<TIMESTAMP>.tar.gz
  ```

---

## 10. License & Proprietary Information

Proprietary platform built exclusively for **Keystone Realty Advisor**. All rights reserved.
