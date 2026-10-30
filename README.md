# Peace Haven — Cinematic Corporate Portfolio & Systems Platform

> **"Engineering Ideas. Empowering Industries."**

Peace Haven is an integrated technology powerhouse delivering mission-critical web platforms, institutional financial ledgers, autonomous mobile robotics (AMR), drone aerospace technology, healthcare interoperability systems, technical staffing, and algorithmic trading engines.

---

## 1. System Architecture & Tech Stack

### Frontend Architecture
- **Framework**: React 18, Vite 5, TypeScript 5.
- **Port**: `5155` ([http://localhost:5155](http://localhost:5155))
- **Styling**: Vanilla Tailwind CSS with custom Dark Navy (`#030712`), Electric Blue (`#2563eb`), and Cyan (`#06b6d4`, `#22d3ee`) design tokens.
- **Cinematic Visuals**: Interactive Canvas particle constellation (`ParticleHeroCanvas`) with 60 FPS requestAnimationFrame throttling and `@media (prefers-reduced-motion: reduce)` accessibility compliance.
- **State & Data**: React Router v6, TanStack React Query v5, React Hook Form, Zod schema validation.
- **Components**: Lucide React icons, accessible button primitives, glassmorphism card surfaces, and confetti celebration.

### Backend Architecture
- **Runtime**: Node.js v18+, Express v4 (ES Modules).
- **Port**: `8001` ([http://localhost:8001/api/v1](http://localhost:8001/api/v1))
- **Database & Modeling**: MongoDB & Mongoose v8. Includes built-in embedded fallback to `mongodb-memory-server` for zero-dependency local development on Windows if external MongoDB is offline.
- **Security & Hardening**:
  - Helmet for security HTTP headers (CSP, HSTS, X-Frame-Options).
  - CORS with configurable origins.
  - Rate limiting with `express-rate-limit` on public endpoints (200 req/15min), intake forms (30 req/15min), and authentication (15 req/15min).
  - JWT Bearer authentication with 24h expiration and role-based access control (`superadmin`, `admin`, `editor`).
  - Bcrypt password hashing (10 salt rounds).
  - Audit logging middleware capturing administrative mutations.
  - Strict zero-trust policy: Public administrator registration is permanently disabled.
- **Transactional Notifications**: Nodemailer email dispatch for client inquiry confirmations and internal notifications with safe failure resilience.

---

## 2. 8 Core Engineering Disciplines

1. **Web Development**: High-performance SPAs, edge-rendered SSR, distributed event-driven microservices (Kafka), and enterprise design systems.
2. **FinTech Solutions**: Cryptographically verified double-entry ledger cores, PCI-DSS payment gateways, and real-time fraud mitigation.
3. **Robotics & Automation**: ROS 2 Humble/Iron autonomous mobile robots (AMR), industrial PLC/SCADA (Siemens, Allen-Bradley), and edge computer vision.
4. **Drone Technology**: Autonomous aerial thermography, RTK-GPS centimeter missions, and BVLOS flight operations.
5. **Healthcare Technology**: HIPAA-compliant telemedicine platforms, remote patient monitoring hubs, and HL7 FHIR clinical interoperability.
6. **US Staffing & Augmentation**: Pre-vetted senior software & robotics engineering squads with compliant W2/C2C operations.
7. **Trading Systems**: Ultra-low latency execution engines, FIX protocol gateways (4.2/4.4/5.0), and sub-15µs pre-trade risk firewalls.
8. **Digital Marketing & Growth**: Technical B2B SEO, multi-touch revenue attribution modeling, and ABM pipelines.

---

## 3. Windows Development Setup & Quickstart

### Prerequisites
- Node.js v18.12.0 or higher.
- npm v9+ or higher.
- Windows PowerShell / Terminal.

### Installation
From the root workspace directory (`d:\portfolio`):

```powershell
# Install root orchestration tools
npm install

# Install client packages
cd client
npm install
cd ..

# Install server packages
cd server
npm install
cd ..
```

### Running Locally (Dual Server)

1. **Start the Express Backend API (Port 8001)**:
   ```powershell
   cd d:\portfolio\server
   npm start
   ```
   *The server automatically boots an embedded MongoDB memory engine if an external MongoDB instance is not detected, seeds the initial superadmin, and populates all 8 services.*

2. **Start the Vite Client Development Server (Port 5155)**:
   ```powershell
   cd d:\portfolio\client
   npm run dev
   ```
   *Open [http://localhost:5155](http://localhost:5155) in your browser.*

---

## 4. Environment Configuration (`.env.example`)

### Server (`server/.env`):
```env
PORT=8001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/peace_haven
JWT_SECRET=peace_haven_jwt_secret_super_secure_key_2026_xyz
JWT_EXPIRES_IN=24h

# Transactional Email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=
SMTP_PASS=
NOTIFICATION_EMAIL=inquiries@peacehaven.tech
FROM_EMAIL="Peace Haven Technologies" <noreply@peacehaven.tech>

# Initial Administrator Credentials (Auto-seeded on first run)
INITIAL_ADMIN_EMAIL=admin@peacehaven.tech
INITIAL_ADMIN_PASSWORD=PeaceHavenAdmin2026!
INITIAL_ADMIN_NAME=Executive Technical Lead
```

---

## 5. REST API Documentation (`/api/v1`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Public | System status and uptime indicator |
| `GET` | `/api/v1/services` | Public | List all 8 engineering disciplines |
| `GET` | `/api/v1/services/:slug` | Public | Get single service capabilities and deliverables |
| `GET` | `/api/v1/projects` | Public | List laboratory prototypes and case studies |
| `GET` | `/api/v1/projects/:slug` | Public | Get case study challenge, architecture, and metrics |
| `POST` | `/api/v1/inquiries` | Public (Rate Limited) | Submit 5-step guided project intake form |
| `POST` | `/api/v1/contact` | Public (Rate Limited) | Submit general corporate message |
| `POST` | `/api/v1/admin/auth/login` | Admin (Rate Limited) | Authenticate staff session & receive JWT Bearer token |
| `GET` | `/api/v1/admin/auth/me` | Protected | Verify active admin session |
| `GET` | `/api/v1/admin/inquiries` | Protected | List inquiries with status/service filtering & search |
| `GET` | `/api/v1/admin/inquiries/:id` | Protected | Inspect full inquiry dossier |
| `PATCH`| `/api/v1/admin/inquiries/:id/status` | Protected | Transition lead pipeline status & add internal notes |
| `POST` | `/api/v1/admin/projects` | Protected | Publish new case study prototype |
| `PUT`  | `/api/v1/admin/projects/:id` | Protected | Update case study prototype |
| `DELETE`| `/api/v1/admin/projects/:id`| Protected | Remove case study prototype |

---

## 6. Testing Instructions

Run the automated test suites using Vitest:

```powershell
# Run frontend tests
npm --prefix client run test

# Run backend integration tests
npm --prefix server run test
```

---

## 7. Administrative Portal Credentials

Navigate to [http://localhost:5155/admin/login](http://localhost:5155/admin/login):
- **Email**: `admin@peacehaven.tech`
- **Password**: `PeaceHavenAdmin2026!`

### Lead Pipeline Workflow:
Inquiries progress through standard commercial statuses:
`New` &rarr; `Reviewing` &rarr; `Contacted` &rarr; `Qualified` &rarr; `Proposal Sent` &rarr; `Won` / `Lost` / `Archived`.
Every status update writes an immutable entry into the inquiry's `auditHistory` including operator email, timestamp, and notes.
