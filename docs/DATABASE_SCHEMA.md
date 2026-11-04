# Peace Haven Database Schemas & Data Models

Persistence is managed via MongoDB using Mongoose v8. All models are defined under `server/src/models/`.

---

## 1. Administrative & RBAC Models

### 1.1 `AdminUser` (`server/src/models/AdminUser.js`)
Stores authenticated administrative accounts with status flags and account lockout counters.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required, trimmed, max 100 chars | Full legal name of administrator |
| `email` | `String` | Required, unique, lowercase, trimmed | Corporate login email |
| `password` | `String` | Required, bcrypt hashed (min 8 chars) | Secure credential hash |
| `role` | `String` | Enum: `superadmin`, `admin`, `content_manager`, `editor`, `marketing_manager`, `sales_manager`, `viewer` | Assigned system role |
| `status` | `String` | Enum: `active`, `inactive`, `pending_invitation`, `suspended` (Default: `active`) | Account authorization state |
| `failedLoginAttempts` | `Number` | Default: `0` | Consecutive failed password counter |
| `lockUntil` | `Date` | Default: `null` | Timestamp until which account is locked |
| `lastLogin` | `Date` | Default: `null` | Last successful authentication timestamp |
| `createdAt` | `Date` | Default: `Date.now` | Account provisioning date |
| `updatedAt` | `Date` | Default: `Date.now` | Last profile update timestamp |

**Virtuals:**
- `isLocked`: Returns `true` if `lockUntil && lockUntil > Date.now()`.

---

### 1.2 `Role` (`server/src/models/Role.js`)
Configures permission privileges across 15 governed modules.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required, trimmed | Human-readable role title (e.g. "Content Manager") |
| `slug` | `String` | Required, unique, lowercase | Role identifier token (e.g. `content_manager`) |
| `description` | `String` | Trimmed | Scope of responsibilities |
| `isSystemRole` | `Boolean` | Default: `false` | If true, role slug cannot be deleted |
| `permissions` | `Map of [String]` | Keys must match 15 governed modules | Actions: `read`, `create`, `update`, `delete`, `publish`, `export` |

---

### 1.3 `AdminInvitation` (`server/src/models/AdminInvitation.js`)
Time-limited cryptographic tokens for staff onboarding.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `email` | `String` | Required, lowercase, trimmed | Recipient email address |
| `role` | `String` | Required, valid role slug | Role to be granted upon acceptance |
| `token` | `String` | Required, unique, crypto hex (32 bytes) | Single-use redemption token |
| `status` | `String` | Enum: `pending`, `accepted`, `expired`, `revoked` | Invitation state |
| `invitedBy` | `ObjectId` | Ref: `AdminUser` | Staff member who initiated invite |
| `expiresAt` | `Date` | Default: `Date.now() + 48 hours` | TTL expiration timestamp |

---

### 1.4 `AuditLog` (`server/src/models/AuditLog.js`)
Append-only immutable record of administrative actions, authentication attempts, and security events.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `userId` | `ObjectId` | Ref: `AdminUser`, optional | Authenticated user performing action |
| `userName` | `String` | Trimmed | Snapshot of user name at action time |
| `userEmail` | `String` | Trimmed | Snapshot of user email |
| `userRole` | `String` | Trimmed | User role at time of execution |
| `action` | `String` | Required | Event verb (e.g. `LOGIN_FAILED`, `CREATE_USER`, `UPDATE_ROLE`) |
| `module` | `String` | Required | Governed module (e.g. `users`, `roles`, `inquiries`) |
| `targetId` | `String` | Optional | ID or slug of entity acted upon |
| `targetTitle` | `String` | Optional | Title of entity acted upon |
| `details` | `Mixed` | Optional | Contextual metadata / changed fields |
| `ipAddress` | `String` | Trimmed | Client IP address |
| `userAgent` | `String` | Trimmed | Client user agent string |
| `result` | `String` | Enum: `SUCCESS`, `FAILURE`, `DENIED` | Outcome of operation |
| `createdAt` | `Date` | Default: `Date.now`, immutable | Timestamp of event |

**Integrity Pre-Hooks**: Pre-hooks throw runtime errors on `updateOne`, `updateMany`, and `findOneAndDelete` to enforce immutable persistence.

---

### 1.5 `AdminSession` (`server/src/models/AdminSession.js`)
Active administrative browser sessions for multi-device tracking and remote revocation.

| Field | Type | Description |
| :--- | :--- | :--- |
| `userId` | `ObjectId` | Reference to `AdminUser` |
| `sessionToken` | `String` | Unique cryptographic session identifier |
| `ipAddress` | `String` | Client IP address |
| `userAgent` | `String` | Browser / device details |
| `deviceType` | `String` | Desktop, Mobile, or Tablet |
| `lastActive` | `Date` | Timestamp of latest authenticated request |
| `isActive` | `Boolean` | Flag indicating whether session remains valid |

---

## 2. Inquiries & Lead Management Models

### 2.1 `Inquiry` (`server/src/models/Inquiry.js`)
Multi-step commercial project leads and engineering intake dossiers.

| Field | Type | Description |
| :--- | :--- | :--- |
| `referenceNumber` | `String` | Unique tracking code (e.g. `PH-MW1O...`) |
| `clientName` | `String` | Client full name |
| `email` | `String` | Business email |
| `phoneNumber` | `String` | Direct contact number |
| `companyName` | `String` | Enterprise organization name |
| `jobTitle` | `String` | Client executive or engineering title |
| `country` | `String` | Client country of operation |
| `selectedServices`| `[String]` | Array of chosen disciplines |
| `service` | `String` | Primary engineering discipline |
| `industry` | `String` | Vertical market category |
| `projectTitle` | `String` | Scope title |
| `projectRequirements` | `String` | Technical deliverables and specifications |
| `timeline` | `String` | Target delivery window |
| `budgetRange` | `String` | Budget category |
| `status` | `String` | Lead pipeline: `NEW`, `REVIEWING`, `QUALIFIED`, `IN_DISCUSSION`, `PROPOSAL_SENT`, `CONVERTED`, `CLOSED` |
| `internalNotes` | `[Note]` | Private engineering staff triage notes |
| `auditHistory` | `[History]` | Status transition timeline |

---

## 3. Telemetry & Analytics Models

### 3.1 `AnalyticsEvent` (`server/src/models/AnalyticsEvent.js`)
Privacy-compliant, server-side deduplicated telemetry stream.

| Field | Type | Description |
| :--- | :--- | :--- |
| `anonymousVisitorId` | `String` | High-entropy random visitor cookie |
| `sessionId` | `String` | Current browsing session token |
| `eventName` | `String` | `page_view`, `cta_click`, `inquiry_form_start`, `inquiry_form_submit`, etc. |
| `pagePath` | `String` | Web route visited |
| `serviceSlug` | `String` | Related service if applicable |
| `industrySlug` | `String` | Related industry category if applicable |
| `projectSlug` | `String` | Related portfolio project if applicable |
| `deviceCategory` | `String` | `desktop`, `mobile`, `tablet` |
| `browser` | `String` | User browser |
| `country` | `String` | Geolocation country code |
| `duration` | `Number` | Time spent on page in seconds |
| `timestamp` | `Date` | Timestamp of event |

---

## 4. Content Management System (CMS) Models

- **`Page` (`server/src/models/Page.js`)**: Dynamic page content, hero metadata, content sections, and SEO tags.
- **`BlogPost` (`server/src/models/BlogPost.js`)**: Technical articles, cover images, reading time, view count, tags.
- **`MediaAsset` (`server/src/models/MediaAsset.js`)**: Uploaded image and document assets with MIME type validation.
- **`NavigationItem` (`server/src/models/NavigationItem.js`)**: Menu items and footer links with ordering.
- **`ContentRevision` (`server/src/models/ContentRevision.js`)**: Immutable point-in-time snapshots of page and blog content for instant rollback.
- **`CMSActivityLog` (`server/src/models/CMSActivityLog.js`)**: History of publishing, updating, and asset management actions.
