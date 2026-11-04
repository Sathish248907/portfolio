# Peace Haven Corporate Website — Architecture & Systems Specification

## 1. System Overview

Peace Haven is a multi-industry corporate technology enterprise specializing in Web Development, FinTech, Robotics & Automation, Drone Technology, Healthcare Solutions, Technical Staffing, Quantitative Trading Systems, and Digital Growth.

The software platform consists of:
1. **Frontend Application**: Modern Single Page Application (SPA) built with React 18, Vite 5, Tailwind CSS, TypeScript 5, React Router v6, and TanStack React Query v5.
2. **Backend API Service**: High-performance RESTful API microservice built on Node.js and Express v4 (ES Modules), with MongoDB and Mongoose v8 persistence.
3. **Enterprise RBAC & Security Layer**: Role-Based Access Control matrix supporting 7 system roles, 15 permission modules, append-only immutable audit logging, and account lockout protection.
4. **Telemetry & Conversion Engine**: Anonymous visitor tracking, event deduplication, and an 8-stage commercial conversion funnel connected directly to lead management.
5. **Content Management System (CMS)**: Versioned content engine with automated snapshot generation, rollback capabilities, media library, and dynamic navigation.

```mermaid
graph TD
    User([Public Visitor / Enterprise Client]) -->|HTTPS / Port 5155| ClientSPA[Vite + React SPA]
    Admin([Administrative Staff / Super Admin]) -->|HTTPS / Port 5155| ClientSPA

    ClientSPA -->|Axios REST API / Port 8001| NGINX_Or_Express[Express API Gateway / Router]
    
    subgraph Express_Backend [Express Backend Service]
        NGINX_Or_Express --> SecurityMW[Security Middleware: Helmet, CORS, Rate Limiters]
        SecurityMW --> AuthMW[Authentication & Account Lockout Middleware]
        AuthMW --> RbacMW[RBAC Permission Guard: requirePermission]
        
        RbacMW --> ControllerLayer[Thin HTTP Controller Layer]
        ControllerLayer --> ServiceLayer[Dedicated Business Service Layer]
        
        ServiceLayer --> inquiryService[Inquiry & Lead Service]
        ServiceLayer --> analyticsService[Telemetry & Aggregation Service]
        ServiceLayer --> cmsService[CMS & Versioning Service]
        ServiceLayer --> rbacService[RBAC & Audit Service]
        ServiceLayer --> emailService[Transactional Email Dispatcher]
    end

    subgraph Data_Persistence [Data Persistence Layer]
        inquiryService --> MongoStore[(MongoDB / MongoMemoryServer)]
        analyticsService --> MongoStore
        cmsService --> MongoStore
        rbacService --> MongoStore
    end
```

---

## 2. Frontend Architecture (`client/`)

### 2.1 Design Tokens & Cinematic UI
- **Primary Color Palette**: Dark Navy (`#030712`, `#0a0f1d`), Electric Blue (`#2563eb`, `#1d4ed8`), Cyan Accent (`#06b6d4`, `#22d3ee`).
- **Interactive Visuals**: `ParticleHeroCanvas` provides a high-performance 60 FPS HTML5 canvas particle constellation with distance-based tethering and automatic `prefers-reduced-motion` detection.
- **Glassmorphic Components**: Layered semi-transparent backdrops (`backdrop-blur-md bg-slate-900/60 border border-slate-800/80`).

### 2.2 Client Layer Structure
```
client/src/
├── components/
│   ├── common/         # Atomic primitives: Navbar, Footer, MobileMenu, PermissionGuard, AccessDenied
│   ├── layout/         # Shell layouts: PublicLayout, AdminLayout
│   ├── sections/       # Domain sections: HeroSection, ServicesSection, IndustriesSection, etc.
│   └── inquiry/        # 5-step guided inquiry modal and interactive form components
├── pages/
│   ├── public/         # Public pages: HomePage, ServicesPage, IndustriesPage, PortfolioPage, etc.
│   └── admin/          # Admin pages: AdminDashboardPage, AdminUsersPage, AdminRolesPage, etc.
├── services/
│   └── api/            # Domain API clients: client.ts, adminApi.ts, inquiriesApi.ts, etc.
├── hooks/              # Custom React hooks (useAuth, useInquiryForm, useTelemetry)
├── context/            # React Context providers (AuthContext, ThemeContext)
└── types/              # Comprehensive TypeScript type definitions
```

### 2.3 Route & Navigation Hierarchy
- **Public Routes**:
  - `/` — Homepage (Hero, Capabilities, 10 Industries, Case Studies, Philosophy, Contact CTA)
  - `/services` & `/services/:slug` — 8 Core Engineering Disciplines
  - `/industries` & `/industries/:slug` — 10 Industry Verticals
  - `/portfolio` & `/portfolio/:slug` — Prototype laboratory & case studies
  - `/about` — Executive leadership, engineering credentials, values
  - `/contact` — Interactive multi-step inquiry intake system
- **Administrative Routes** (Protected by `AdminLayout` and `PermissionGuard`):
  - `/admin` — Central Admin Dashboard & telemetry overview
  - `/admin/users` — Administrative user provisioning and status toggles
  - `/admin/roles-permissions` — RBAC permission matrix configuration
  - `/admin/audit-logs` — Immutable audit log viewer with CSV export
  - `/admin/profile` — Personal profile, security credentials, active sessions
  - `/admin/inquiries` — Project lead pipeline & qualification triage
  - `/admin/analytics` — Business intelligence & funnel analytics
  - `/admin/cms` — Dynamic page, media, and navigation management

---

## 3. Backend Architecture (`server/`)

### 3.1 3-Tier Layered Architecture Pattern
The backend adheres to a strict 3-tier architecture:
1. **Controller Layer (`server/src/controllers/`)**: Handles HTTP requests, parameter extraction, Zod validation handling, and status code responses. Controllers contain **no database logic**.
2. **Service Layer (`server/src/services/`)**: Implements core business logic, domain rules, notifications, complex MongoDB aggregations, and data formatting.
3. **Data Access Layer (`server/src/models/`)**: Mongoose schemas defining database structures, constraints, virtuals, and append-only pre-hooks.

### 3.2 Backend Directory Structure
```
server/src/
├── config/             # Environment, database, and rate-limiting configuration
├── controllers/        # Thin HTTP controllers (authController, adminManagementController, etc.)
├── middleware/         # Auth verification, RBAC requirePermission, error handler, rate limiters
├── models/             # Mongoose schemas: AdminUser, Role, AuditLog, Inquiry, Page, etc.
├── routes/v1/          # RESTful route definitions grouped by domain
├── services/           # Business services: rbacService, inquiryService, analyticsService, etc.
└── validators/         # Zod schemas for input validation
```

---

## 4. Role-Based Access Control (RBAC) & Security Architecture

### 4.1 System Roles
The system provides 7 predefined roles with configurable permissions:
1. **Super Administrator (`superadmin`)**: Complete system authority. Root permissions across all 15 modules. Cannot be deleted or deactivated if it is the last remaining active superadmin.
2. **Administrator (`admin`)**: Broad management authority over operations, users, leads, CMS, and analytics.
3. **Content Manager (`content_manager`)**: Full CMS, pages, blog, media, and navigation authority.
4. **Editor (`editor`)**: Content authoring and revision rights with publication workflows.
5. **Marketing Manager (`marketing_manager`)**: Analytics, SEO, campaign tracking, and content review.
6. **Sales Manager (`sales_manager`)**: Lead qualification, inquiry triage, client dossiers, and notes.
7. **Viewer (`viewer`)**: Read-only oversight across authorized modules.

### 4.2 15 Governed Permission Modules
Each module supports granular actions (`read`, `create`, `update`, `delete`, `publish`, `export`):
1. `dashboard` — High-level metric visibility
2. `users` — Administrator user provisioning & status management
3. `roles` — RBAC matrix configuration & custom role creation
4. `cms` — Dynamic page content authoring
5. `services` — Service discipline capability editing
6. `industries` — Industry vertical solution editing
7. `portfolio` — Case study and prototype management
8. `blog` — Technical insights publication
9. `media` — Media asset uploading & storage
10. `navigation` — Header/footer link management
11. `seo` — Metadata, OpenGraph, and sitemap configuration
12. `analytics` — Telemetry & conversion funnel metrics
13. `inquiries` — Project lead pipeline & client dossiers
14. `audit_logs` — Immutable audit log review & export
15. `settings` — System-wide security and environment parameters

### 4.3 Brute-Force & Account Lockout Defense
- **Max Failed Attempts**: 5 consecutive incorrect passwords.
- **Lockout Duration**: 15 minutes (`lockUntil` timestamp).
- **Audit Logging**: Every failed attempt and lockout is immutably logged with client IP and user agent.

### 4.4 Append-Only Audit Integrity
Audit logs cannot be edited or deleted through the API. The Mongoose model enforces strict pre-hooks:
```javascript
// Pre-hooks prevent modification or deletion of audit logs
auditLogSchema.pre('updateOne', function () {
  throw new Error('Audit logs are append-only and cannot be updated.');
});
auditLogSchema.pre('findOneAndDelete', function () {
  throw new Error('Audit logs are append-only and cannot be deleted.');
});
```

---

## 5. Resilient Database Persistence
To guarantee uninterrupted operation across local development, testing, and production:
- In production, the system connects directly to `MONGODB_URI`.
- In offline or local zero-dependency development environments, `server/src/config/db.js` automatically spawns an embedded `MongoMemoryServer` instance if external MongoDB is unreachable, ensuring 100% developer and test uptime.
