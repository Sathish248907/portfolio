# Peace Haven — Cinematic Corporate Portfolio & Systems Platform

> **"Engineering Ideas. Empowering Industries."**

Peace Haven is an integrated technology powerhouse delivering mission-critical web platforms, institutional financial ledgers, autonomous mobile robotics (AMR), drone aerospace technology, healthcare interoperability systems, technical staffing, algorithmic trading engines, and digital growth infrastructure.

---

## 1. Documentation Suite

Comprehensive architecture, API, and database schema documentation is maintained in the [`docs/`](file:///d:/portfolio/docs) directory:

- [**System Architecture & Technical Design (`docs/ARCHITECTURE.md`)**](file:///d:/portfolio/docs/ARCHITECTURE.md) — 3-tier system design, layer separation, component hierarchy, RBAC matrix, and conversion funnel mechanics.
- [**REST API Documentation (`docs/API_DOCUMENTATION.md`)**](file:///d:/portfolio/docs/API_DOCUMENTATION.md) — Complete endpoint reference for `/api/v1` including authentication, administrative users, RBAC roles, leads, telemetry, and CMS.
- [**Database Schema Reference (`docs/DATABASE_SCHEMA.md`)**](file:///d:/portfolio/docs/DATABASE_SCHEMA.md) — Full Mongoose data dictionary covering all models, validations, indexes, and append-only constraints.

---

## 2. System Architecture & Tech Stack

### Frontend Architecture (`client/`)
- **Framework**: React 18, Vite 5, TypeScript 5.
- **Port**: `5155` ([http://localhost:5155](http://localhost:5155))
- **Styling**: Vanilla Tailwind CSS with custom Dark Navy (`#030712`), Electric Blue (`#2563eb`), and Cyan (`#06b6d4`, `#22d3ee`) design tokens.
- **Cinematic Visuals**: Interactive Canvas particle constellation (`ParticleHeroCanvas`) with 60 FPS requestAnimationFrame throttling and `@media (prefers-reduced-motion: reduce)` accessibility compliance.
- **State & Data**: React Router v6, TanStack React Query v5, React Hook Form, Zod schema validation.
- **Security & RBAC UI**: Dynamic `<PermissionGuard>` wrappers, granular action-level controls, and `<AccessDenied>` fallback views.

### Backend Architecture (`server/`)
- **Runtime**: Node.js v18+, Express v4 (ES Modules).
- **Port**: `8001` ([http://localhost:8001/api/v1](http://localhost:8001/api/v1))
- **Layered Architecture**: Strict 3-tier pattern separating HTTP Controllers, Domain Services (`inquiryService`, `analyticsService`, `cmsService`, `rbacService`, `emailService`), and Mongoose Data Models.
- **Database & Persistence**: MongoDB & Mongoose v8. Includes built-in embedded fallback to `mongodb-memory-server` for zero-dependency local development on Windows if external MongoDB is offline.
- **Security & Hardening**:
  - Helmet for security HTTP headers (CSP, HSTS, X-Frame-Options).
  - CORS with configurable origins.
  - Rate limiting with `express-rate-limit` on public endpoints (200 req/15min), intake forms (30 req/15min), and authentication (15 req/15min).
  - Account lockout protection: 5 consecutive failed logins lock account for 15 minutes.
  - JWT Bearer authentication with 24h expiration and role-based access control.
  - Bcrypt password hashing (10 salt rounds).
  - Append-only immutable audit logging capturing all administrative mutations and security events.
  - Protection of the last remaining active Super Admin against deletion or deactivation.
- **Transactional Notifications & Email Automation**: Event-driven notification engine (`automationService`), 10 Peace Haven branded HTML templates, in-app real-time notification dropdown (`NotificationDropdown.tsx`) with 25-second polling, idempotent dispatches, delivery logs with retry capabilities, and CRM lead follow-up reminders.

---

## 3. 8 Core Engineering Disciplines

1. **Web Development**: High-performance SPAs, edge-rendered SSR, distributed event-driven microservices, and enterprise design systems.
2. **FinTech Solutions**: Cryptographically verified double-entry ledger cores, PCI-DSS payment gateways, and real-time fraud mitigation.
3. **Robotics & Automation**: ROS 2 Humble/Iron autonomous mobile robots (AMR), industrial PLC/SCADA (Siemens, Allen-Bradley), and edge computer vision.
4. **Drone Technology**: Autonomous aerial thermography, RTK-GPS centimeter missions, and BVLOS flight operations.
5. **Healthcare Technology**: HIPAA-compliant telemedicine platforms, remote patient monitoring hubs, and HL7 FHIR clinical interoperability.
6. **US Staffing & Augmentation**: Pre-vetted senior software & robotics engineering squads with compliant W2/C2C operations.
7. **Trading Systems**: Ultra-low latency execution engines, FIX protocol gateways (4.2/4.4/5.0), and sub-15µs pre-trade risk firewalls.
8. **Digital Marketing & Growth**: Technical B2B SEO, multi-touch revenue attribution modeling, and ABM pipelines.

---

## 4. 10 Industry Verticals Served

1. **Information Technology & Software** — Enterprise applications, custom SaaS, business automation.
2. **Banking & Financial Services** — Digital gold/silver bullion, payment gateways, institutional ledgers.
3. **Manufacturing & Industrial Automation** — Robotics, sensor automation, SCADA & telemetry.
4. **Healthcare & Medical Technology** — Telemedicine, diagnostic tools, rapid screening tests.
5. **Agriculture & Agritech** — Smart farming, animal detection, aerial drone surveillance.
6. **Real Estate & Property Technology** — Property portals, virtual tours, dynamic listings.
7. **Logistics & Supply Chain** — Fleet dispatching, automated warehousing, inventory tracking.
8. **Retail & E-commerce** — High-concurrency storefronts, omnichannel checkouts, payment engines.
9. **Human Resources & Staffing** — Technical recruiting, talent analytics, applicant screening.
10. **Education & EdTech** — Learning management systems (LMS), student portals, interactive labs.

---

## 5. Windows Development Setup & Quickstart

### Prerequisites
- Node.js v18.12.0 or higher.
- npm v9+ or higher.
- Windows PowerShell / Terminal.

### Running Locally (Dual Server)

1. **Start the Express Backend API (Port 8001)**:
   ```powershell
   cd d:\portfolio\server
   npm run dev
   ```
   *The server automatically boots an embedded MongoDB memory engine if an external MongoDB instance is not detected, seeds the initial superadmin, multi-role test staff, RBAC roles, and baseline services.*

2. **Start the Vite Client Development Server (Port 5155)**:
   ```powershell
   cd d:\portfolio\client
   npm run dev
   ```
   *Open [http://localhost:5155](http://localhost:5155) in your browser.*

---

## 6. Testing Instructions

Run the automated test suites using Vitest:

```powershell
# Run all 122 frontend unit & integration tests across 20 test suites
npm --prefix client run test

# Run all 76 backend integration & RBAC tests across 4 test suites
npm --prefix server run test
```

Total: **198 passing tests across client and server (100% pass rate)**.

---

## 7. Administrative Portal Credentials & Roles

Navigate to [http://localhost:5155/admin/login](http://localhost:5155/admin/login):

| Email | Password | Role | Governed Scope |
| :--- | :--- | :--- | :--- |
| `admin@peacehaven.tech` | `PeaceHavenAdmin2026!` | `superadmin` | Complete root control across all 16 modules |
| `david.okafor@peacehaven.tech` | `PeaceHavenAdmin2026!` | `admin` | Operations, users, leads, CMS, analytics & alerts |
| `marcus.chen@peacehaven.tech` | `PeaceHavenAdmin2026!` | `content_manager` | CMS pages, articles, media library & navigation |
| `elena.rostova@peacehaven.tech` | `PeaceHavenAdmin2026!` | `sales_manager` | Inquiries, lead qualification, triage dossiers & reminders |
| `sarah.jenkins@peacehaven.tech`| `PeaceHavenAdmin2026!` | `viewer` | Read-only access across approved administrative views |

### Lead Pipeline Workflow:
Inquiries progress through standard commercial statuses:
`NEW` &rarr; `REVIEWING` &rarr; `CONTACTED` &rarr; `QUALIFIED` &rarr; `PROPOSAL_SENT` &rarr; `CONVERTED` / `CLOSED`.
Every status update writes an immutable entry into the inquiry's `auditHistory` including operator email, timestamp, and notes.
