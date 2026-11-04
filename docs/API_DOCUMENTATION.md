# Peace Haven REST API Documentation

Base URL: `/api/v1`

## 1. Authentication & Security

All protected administrative endpoints require a valid JWT token in the `Authorization` header:
```http
Authorization: Bearer <jwt_token>
```

Tokens are valid for 24 hours. Requests lacking a token return `401 Unauthorized`. Requests with insufficient role permissions return `403 Forbidden`.

---

## 2. Authentication Endpoints (`/api/v1/admin/auth`)

### 2.1 Authenticate Staff Session
- **Method**: `POST`
- **Path**: `/api/v1/admin/auth/login`
- **Access**: Public (Rate-limited: 15 req / 15 min)
- **Request Body**:
  ```json
  {
    "email": "admin@peacehaven.tech",
    "password": "PeaceHavenAdmin2026!"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6724fa10e3012a048a12bc01",
      "name": "Executive Technical Lead",
      "email": "admin@peacehaven.tech",
      "role": "superadmin",
      "status": "active"
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid credentials.
  - `423 Locked`: Account locked due to 5 consecutive failed attempts.

### 2.2 Verify Session
- **Method**: `GET`
- **Path**: `/api/v1/admin/auth/me`
- **Access**: Protected (`Bearer` token)
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "user": {
      "id": "6724fa10e3012a048a12bc01",
      "name": "Executive Technical Lead",
      "email": "admin@peacehaven.tech",
      "role": "superadmin"
    }
  }
  ```

---

## 3. Administrative Management Endpoints (`/api/v1/admin`)

### 3.1 Dashboard Statistics
- **Method**: `GET`
- **Path**: `/api/v1/admin/dashboard-stats`
- **Access**: Protected (`dashboard:read`)
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "totalUsers": 6,
      "activeUsers": 5,
      "inactiveUsers": 0,
      "suspendedUsers": 0,
      "pendingInvitations": 1,
      "rolesCount": 7,
      "recentActivities": [],
      "recentSecurityEvents": []
    }
  }
  ```

### 3.2 List Administrative Users
- **Method**: `GET`
- **Path**: `/api/v1/admin/users`
- **Access**: Protected (`users:read`)
- **Query Parameters**:
  - `role`: Filter by role slug (e.g. `admin`, `editor`)
  - `status`: Filter by status (`active`, `inactive`, `suspended`, `pending_invitation`)
  - `search`: Case-insensitive text search across name and email
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "6724fa10e3012a048a12bc01",
        "name": "Executive Technical Lead",
        "email": "admin@peacehaven.tech",
        "role": "superadmin",
        "status": "active",
        "lastLogin": "2026-11-04T10:30:00.000Z",
        "createdAt": "2026-10-30T10:00:00.000Z"
      }
    ]
  }
  ```

### 3.3 Create Administrative User
- **Method**: `POST`
- **Path**: `/api/v1/admin/users`
- **Access**: Protected (`users:create`)
- **Request Body**:
  ```json
  {
    "name": "Elena Rostova",
    "email": "elena.rostova@peacehaven.tech",
    "password": "SecurePassword2026!",
    "role": "admin",
    "status": "active"
  }
  ```

### 3.4 Update User Details & Status
- **Method**: `PATCH`
- **Path**: `/api/v1/admin/users/:id`
- **Access**: Protected (`users:update`)
- **Request Body**:
  ```json
  {
    "name": "Elena Rostova, PhD",
    "role": "admin",
    "status": "active"
  }
  ```

### 3.5 Delete User Account
- **Method**: `DELETE`
- **Path**: `/api/v1/admin/users/:id`
- **Access**: Protected (`users:delete`)
- **Constraints**: Cannot delete the last remaining active superadmin account.

### 3.6 Invite Administrative User via Email
- **Method**: `POST`
- **Path**: `/api/v1/admin/invitations`
- **Access**: Protected (`users:create`)
- **Request Body**:
  ```json
  {
    "email": "alex.vance@peacehaven.tech",
    "role": "editor"
  }
  ```
- **Response `201 Created`**: Returns invitation details and dispatches a time-limited token email valid for 48 hours.

### 3.7 Public Invitation Acceptance
- **Method**: `POST`
- **Path**: `/api/v1/admin/invitations/accept`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "token": "a1b2c3d4e5f6...",
    "name": "Alex Vance",
    "password": "NewStaffPassword2026!"
  }
  ```

### 3.8 RBAC Roles & Permissions Matrix
- **Method**: `GET`
- **Path**: `/api/v1/admin/roles`
- **Access**: Protected (`roles:read`)
- **Response `200 OK`**: Lists all 7 system roles and their permission mappings across all 15 modules.

### 3.9 Update Role Permissions
- **Method**: `PUT`
- **Path**: `/api/v1/admin/roles/:id`
- **Access**: Protected (`roles:update`)
- **Request Body**:
  ```json
  {
    "description": "Updated editor privileges",
    "permissions": {
      "cms": ["read", "create", "update", "publish"],
      "blog": ["read", "create", "update"]
    }
  }
  ```

### 3.10 Immutable Audit Logs
- **Method**: `GET`
- **Path**: `/api/v1/admin/audit-logs`
- **Access**: Protected (`audit_logs:read`)
- **Query Parameters**: `module`, `result`, `search`, `page`, `limit`
- **Response `200 OK`**: Paginated append-only audit trail entries.

### 3.11 Export Audit Logs to CSV
- **Method**: `GET`
- **Path**: `/api/v1/admin/audit-logs/export`
- **Access**: Protected (`audit_logs:export`)
- **Response `200 OK`**: Returns a downloadable CSV file attachment.

---

## 4. Project Inquiry & Lead Management (`/api/v1/inquiries`)

### 4.1 Submit Project Inquiry
- **Method**: `POST`
- **Path**: `/api/v1/inquiries`
- **Access**: Public (Rate-limited: 30 req / 15 min)
- **Request Body**:
  ```json
  {
    "clientName": "Marcus Vance",
    "email": "mvance@apexrobotics.io",
    "phoneNumber": "+1-415-555-0199",
    "companyName": "Apex Robotics Systems",
    "jobTitle": "VP of Automation",
    "country": "United States",
    "selectedServices": ["Robotics & Automation"],
    "industry": "Manufacturing & Industrial Automation",
    "projectTitle": "Autonomous Mobile Fleet Deployment",
    "projectRequirements": "ROS 2 Humble fleet integration with custom SLAM navigation.",
    "projectType": "Custom Development",
    "timeline": "3 to 6 months",
    "budgetRange": "$100,000 - $250,000",
    "startPreference": "Immediately"
  }
  ```
- **Response `201 Created`**: Returns created inquiry with unique `referenceNumber` (e.g. `PH-MW1O...`). Dispatches client confirmation and internal notification emails.

### 4.2 List Inquiries
- **Method**: `GET`
- **Path**: `/api/v1/admin/inquiries`
- **Access**: Protected (`inquiries:read`)
- **Query Parameters**: `status`, `service`, `industry`, `search`, `page`, `limit`, `sortBy`, `sortOrder`

### 4.3 Update Inquiry Status
- **Method**: `PATCH`
- **Path**: `/api/v1/admin/inquiries/:id/status`
- **Access**: Protected (`inquiries:update`)
- **Request Body**:
  ```json
  {
    "status": "QUALIFIED",
    "notes": "Reviewed technical specifications with robotics team."
  }
  ```

### 4.4 Add Internal Lead Note
- **Method**: `POST`
- **Path**: `/api/v1/admin/inquiries/:id/notes`
- **Access**: Protected (`inquiries:update`)
- **Request Body**:
  ```json
  {
    "text": "Client requested NDA before sharing hardware CAD files."
  }
  ```

### 4.5 Export Inquiries to CSV
- **Method**: `GET`
- **Path**: `/api/v1/admin/inquiries/export`
- **Access**: Protected (`inquiries:export`)

---

## 5. Telemetry & Analytics (`/api/v1/analytics`)

### 5.1 Ingest Telemetry Event
- **Method**: `POST`
- **Path**: `/api/v1/analytics/event`
- **Access**: Public (Sanitized & Deduplicated)
- **Request Body**:
  ```json
  {
    "anonymousVisitorId": "vis_991823ab",
    "sessionId": "ses_441829cd",
    "eventName": "page_view",
    "pagePath": "/services/robotics",
    "serviceSlug": "robotics"
  }
  ```

### 5.2 Analytics Overview Dashboard
- **Method**: `GET`
- **Path**: `/api/v1/admin/analytics/overview`
- **Access**: Protected (`analytics:read`)
- **Query Parameters**: `period` (`today`, `7d`, `30d`, `90d`, `custom`), `startDate`, `endDate`

### 5.3 8-Stage Conversion Funnel
- **Method**: `GET`
- **Path**: `/api/v1/admin/analytics/funnel`
- **Access**: Protected (`analytics:read`)

---

## 6. Content Management System (`/api/v1/cms`)

### 6.1 CMS Dashboard Summary
- **Method**: `GET`
- **Path**: `/api/v1/admin/cms/summary`
- **Access**: Protected (`cms:read`)

### 6.2 Update Dynamic Page Content
- **Method**: `PUT`
- **Path**: `/api/v1/admin/cms/pages/:idOrSlug`
- **Access**: Protected (`cms:update`)
- **Behavior**: Creates an automated `ContentRevision` snapshot before applying updates.

### 6.3 Public Technical Insights
- **Method**: `GET`
- **Path**: `/api/v1/cms/blog`
- **Access**: Public
- **Query Parameters**: `category`, `search`, `tag`, `page`, `limit`

