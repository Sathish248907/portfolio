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
Multi-step commercial project leads, engineering intake dossiers, and client communication records.

| Field | Type | Description |
| :--- | :--- | :--- |
| `referenceNumber` | `String` | Immutable unique tracking code (format: `PH-XXXXXX-XXXX`) |
| `clientName` | `String` | Client full name (aliased from `fullName`) |
| `email` | `String` | Business email address (aliased from `businessEmail`) |
| `phoneNumber` | `String` | Direct contact number (aliased from `phone`) |
| `companyName` | `String` | Enterprise organization name |
| `jobTitle` | `String` | Client executive or engineering title |
| `country` | `String` | Client country of operation |
| `selectedServices`| `[String]` | Array of chosen disciplines from the 8 core service categories |
| `service` | `String` | Primary engineering discipline |
| `industry` | `String` | Vertical market category |
| `projectTitle` | `String` | Scope title |
| `projectOverview` | `String` | High-level summary of business context and requirements |
| `projectRequirements` | `String` | Technical deliverables and specifications |
| `detailedRequirements` | `String` | Expanded architectural and functional requirements |
| `projectObjectives` | `String` | Core business goals and KPI milestones |
| `requiredFeatures` | `String` | Key capabilities and specifications required |
| `technicalRequirements` | `String` | Architectural constraints, integration touchpoints |
| `additionalInformation` | `String` | Non-disclosure or special operational constraints |
| `budgetRange` | `String` | Budget category or custom specification |
| `budgetCurrency` | `String` | Currency denomination (`USD`, `EUR`, `GBP`, `CAD`, `AUD`, `INR`, `SGD`) |
| `customBudget` | `String` | Custom target budget amount if specified |
| `timeline` | `String` | Target delivery window |
| `expectedTimeline` | `String` | Delivery timeframe expectation |
| `startPreference` | `String` | Preferred initiation timeframe |
| `expectedStartDate` | `String` | Target kickoff schedule |
| `urgency` | `String` | Urgency tier (`Normal`, `High`, `Urgent / Critical`) |
| `preferredContactMethod`| `String` | Primary communication channel (`Email`, `Phone`, `Video Meeting`) |
| `priority` | `String` | Lead priority tier: `low`, `medium`, `high`, `urgent` (Default: `medium`) |
| `status` | `String` | Lead pipeline: `NEW`, `UNDER_REVIEW`, `NEED_MORE_INFORMATION`, `CONTACTED`, `REVIEWING`, `QUALIFIED`, `IN_DISCUSSION`, `PROPOSAL_SENT`, `CONVERTED`, `CLOSED`, `REJECTED` |
| `assignedTo` | `Object` | Responsible engineering staff member (`name`, `email`, `role`) |
| `internalNotes` | `[Note]` | Private engineering staff triage notes (hidden from clients) |
| `auditHistory` | `[History]` | Status transition and activity audit timeline |
| `communicationHistory` | `[Entry]` | Complete record of client emails, acknowledgments, attachments, and timestamps |
| `lastCommunicatedAt` | `Date` | Timestamp of latest client email dispatch |

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

---

## 5. Notification, Email & Reminder Models (Phase 11)

### 5.1 `Notification` (`server/src/models/Notification.js`)
Stores in-app administrative notifications routed to specific users or broadcast by role.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `recipientId` | `ObjectId` | Ref: `AdminUser`, optional | Targeted user (or broadcast if null) |
| `targetRole` | `String` | Enum: `all`, `superadmin`, `admin`, `sales_manager`, etc. | Targeted role for broadcast alerts |
| `title` | `String` | Required, trimmed, max 200 chars | Alert title headline |
| `message` | `String` | Required, trimmed, max 2000 chars | Alert message body |
| `category` | `String` | Enum: `inquiry`, `cms`, `user_management`, `reminder`, `security`, `system` | Notification category |
| `type` | `String` | Enum: `info`, `success`, `warning`, `error`, `urgent` | Visual priority tier |
| `isRead` | `Boolean` | Default: `false` | Read receipt flag |
| `isArchived` | `Boolean` | Default: `false` | Archive dismissal flag |
| `link` | `String` | Trimmed | Click-through admin path |
| `metadata` | `Mixed` | Optional | Related document IDs, IPs, references |
| `createdAt` | `Date` | Default: `Date.now` | Dispatch timestamp |

---

### 5.2 `EmailLog` (`server/src/models/EmailLog.js`)
Reliable transactional email tracking record with idempotency safeguards and retry capabilities.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `recipientEmail` | `String` | Required, lowercase, trimmed | Recipient email address |
| `subject` | `String` | Required, trimmed | Message subject line |
| `templateSlug` | `String` | Required, trimmed | Slug of template rendered |
| `status` | `String` | Enum: `pending`, `processing`, `sent`, `failed`, `retrying` | Delivery status lifecycle |
| `idempotencyKey` | `String` | Unique, sparse | Deduplication key preventing duplicate sends |
| `errorMessage` | `String` | Optional | Error trace if delivery failed |
| `retryCount` | `Number` | Default: `0` | Number of redelivery attempts |
| `sentAt` | `Date` | Optional | Timestamp when delivery succeeded |
| `createdAt` | `Date` | Default: `Date.now` | Initial enqueue timestamp |

---

### 5.3 `EmailTemplate` (`server/src/models/EmailTemplate.js`)
Managed transactional email templates compiled into Peace Haven branded HTML.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required, trimmed | Human-readable template name |
| `slug` | `String` | Required, unique, lowercase | Template identifier slug |
| `subject` | `String` | Required, trimmed | Default subject line with placeholders |
| `htmlBody` | `String` | Required | Branded HTML markup with variable mustache tags |
| `textBody` | `String` | Required | Plain-text fallback markup |
| `variables` | `[String]` | Array of tokens | Allowed variable replacement tokens |
| `category` | `String` | Enum: `inquiry`, `user_management`, `cms`, `security`, `general` | Template category |
| `isSystem` | `Boolean` | Default: `true` | System-critical template guard |

---

### 5.4 `NotificationPreference` (`server/src/models/NotificationPreference.js`)
Configures channel delivery preferences for each administrator.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `userId` | `ObjectId` | Required, unique, Ref: `AdminUser` | Owner administrator |
| `categories` | `Map of { inApp, email }` | Keys: `inquiry`, `cms`, `user_management`, `reminder`, `security`, `system` | Channel enablement per category |
| `deliveryFrequency` | `String` | Enum: `immediate`, `daily_digest` | Notification cadence |

*Note: Enforces an immutable constraint ensuring `categories.security.inApp = true` and `categories.security.email = true`.*

---

### 5.5 `Reminder` (`server/src/models/Reminder.js`)
Lead follow-up tasks and inquiry action items.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Required, trimmed, max 200 chars | Action item title |
| `dueDate` | `Date` | Required | Scheduled deadline timestamp |
| `priority` | `String` | Enum: `low`, `medium`, `high`, `urgent` | Priority tier |
| `status` | `String` | Enum: `pending`, `completed`, `cancelled` | Task status |
| `notes` | `String` | Optional, trimmed | Operational notes |
| `inquiryId` | `ObjectId` | Optional, Ref: `Inquiry` | Linked lead record |
| `inquiryReference`| `String` | Optional, trimmed | Human-readable tracking reference (e.g. `PH-MW1PJNI3-7336`) |
| `assignedTo` | `ObjectId` | Optional, Ref: `AdminUser` | Staff member responsible |
| `createdBy` | `ObjectId` | Required, Ref: `AdminUser` | Creator staff member |
| `completedAt` | `Date` | Optional | Completion timestamp |


