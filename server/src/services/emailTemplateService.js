import { EmailTemplate } from '../models/EmailTemplate.js';

// Peace Haven Brand Color Tokens
export const EMAIL_THEME = {
  deepCharcoalNavy: '#17232B',
  mutedTeal: '#344B50',
  sageGrey: '#A8B5AE',
  warmOffWhite: '#E8E5DC',
  mutedChampagne: '#C4A77D',
};

// Base HTML layout wrapper applying Peace Haven styling
export function wrapInBaseEmailLayout({ title, content, previewText = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0f171d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E8E5DC; -webkit-font-smoothing: antialiased; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #17232B; border: 1px solid #344B50; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .email-header { background: linear-gradient(135deg, #17232B 0%, #20313c 100%); padding: 32px 36px 24px; border-bottom: 1px solid #344B50; text-align: center; }
    .brand-title { color: #C4A77D; font-size: 20px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px; }
    .brand-tagline { color: #A8B5AE; font-size: 11px; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }
    .email-body { padding: 36px; font-size: 14px; line-height: 1.6; color: #E8E5DC; }
    .info-card { background-color: #121c23; border: 1px solid #344B50; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .btn-action { display: inline-block; background-color: #C4A77D; color: #17232B !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 6px; letter-spacing: 0.05em; text-align: center; margin: 16px 0; }
    .email-footer { background-color: #101920; padding: 24px 36px; border-top: 1px solid #23343e; text-align: center; font-size: 11px; color: #A8B5AE; line-height: 1.5; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-family: monospace; font-weight: 600; text-transform: uppercase; background-color: #344B50; color: #C4A77D; }
    table.data-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    table.data-table td { padding: 8px 0; border-bottom: 1px solid #253843; }
    table.data-table td.label { color: #A8B5AE; font-weight: 600; width: 35%; }
    table.data-table td.val { color: #ffffff; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${previewText}
  </div>
  <div class="email-container">
    <div class="email-header">
      <h1 class="brand-title">Peace Haven</h1>
      <p class="brand-tagline">Engineering Ideas. Empowering Industries.</p>
    </div>
    <div class="email-body">
      ${content}
    </div>
    <div class="email-footer">
      <p style="margin: 0 0 6px;">Peace Haven Technologies Inc. &bull; Enterprise Engineering Solutions</p>
      <p style="margin: 0; color: #64748b; font-family: monospace;">This is an automated system notification from the Peace Haven Communication Infrastructure.</p>
    </div>
  </div>
</body>
</html>`;
}

// 10 Standard Templates
export const DEFAULT_TEMPLATES = [
  {
    slug: 'client_inquiry_confirmation',
    name: 'Client Inquiry Confirmation',
    category: 'inquiry',
    subject: '[Peace Haven] Inquiry Received: Ref {{referenceNumber}}',
    description: 'Dispatched to prospective client immediately upon multi-step intake submission',
    variables: ['clientName', 'referenceNumber', 'service', 'companyName', 'budgetRange', 'timeline', 'contactEmail'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Inquiry Confirmation',
      previewText: 'Your Peace Haven inquiry reference is {{referenceNumber}}',
      content: `<p>Dear <strong>{{clientName}}</strong>,</p>
<p>Thank you for submitting your engineering requirements to Peace Haven Technologies. Your project inquiry has been logged in our intake queue with tracking reference:</p>

<div class="info-card" style="text-align: center;">
  <span style="font-size: 11px; text-transform: uppercase; color: #A8B5AE; letter-spacing: 0.1em;">Official Tracking Reference</span>
  <h2 style="color: #C4A77D; margin: 8px 0 0; font-family: monospace; font-size: 22px;">{{referenceNumber}}</h2>
</div>

<p>Our principal engineering architects are reviewing your specifications and will follow up with an initial technical assessment within <strong>24–48 business hours</strong>.</p>

<table class="data-table">
  <tr><td class="label">Primary Discipline:</td><td class="val">{{service}}</td></tr>
  <tr><td class="label">Organization:</td><td class="val">{{companyName}}</td></tr>
  <tr><td class="label">Budget Scope:</td><td class="val">{{budgetRange}}</td></tr>
  <tr><td class="label">Target Timeline:</td><td class="val">{{timeline}}</td></tr>
</table>

<p style="margin-top: 24px; font-size: 13px; color: #A8B5AE;">If you have supplemental diagrams or architectural briefs to provide, please reply directly to this email referencing <strong>{{referenceNumber}}</strong> in the subject line.</p>`,
    }),
    textContent: `Dear {{clientName}},

Thank you for submitting your project requirements to Peace Haven Technologies.
Your inquiry has been registered under tracking reference: {{referenceNumber}}

Discipline: {{service}}
Company: {{companyName}}
Budget Scope: {{budgetRange}}
Target Timeline: {{timeline}}

Our engineering architects are reviewing your specifications and will follow up within 24-48 business hours.

Peace Haven Technologies Inc.
Engineering Ideas. Empowering Industries.`,
  },
  {
    slug: 'new_inquiry_admin_alert',
    name: 'New Inquiry Admin Alert',
    category: 'inquiry',
    subject: '[NEW LEAD] {{service}} - {{companyName}} ({{referenceNumber}})',
    description: 'Sent to internal leadership and lead managers when new inquiry arrives',
    variables: ['referenceNumber', 'service', 'companyName', 'clientName', 'email', 'phone', 'industry', 'budgetRange', 'timeline', 'dashboardUrl'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'New Project Inquiry Alert',
      previewText: 'New lead from {{companyName}} for {{service}}',
      content: `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
  <span class="badge" style="background-color: #C4A77D; color: #17232B;">New Inquiry Ingested</span>
  <span style="font-family: monospace; color: #A8B5AE; font-size: 12px;">Ref: {{referenceNumber}}</span>
</div>

<p>A new commercial inquiry has been registered through the Peace Haven intake portal and requires engineering triage:</p>

<table class="data-table">
  <tr><td class="label">Client Name:</td><td class="val"><strong>{{clientName}}</strong></td></tr>
  <tr><td class="label">Enterprise:</td><td class="val">{{companyName}}</td></tr>
  <tr><td class="label">Email:</td><td class="val"><a href="mailto:{{email}}" style="color: #C4A77D;">{{email}}</a></td></tr>
  <tr><td class="label">Phone:</td><td class="val">{{phone}}</td></tr>
  <tr><td class="label">Discipline:</td><td class="val">{{service}}</td></tr>
  <tr><td class="label">Industry:</td><td class="val">{{industry}}</td></tr>
  <tr><td class="label">Budget Tier:</td><td class="val">{{budgetRange}}</td></tr>
  <tr><td class="label">Timeline:</td><td class="val">{{timeline}}</td></tr>
</table>

<div style="text-align: center; margin-top: 28px;">
  <a href="{{dashboardUrl}}" class="btn-action">Inspect Lead Dossier &rarr;</a>
</div>`,
    }),
    textContent: `New Project Inquiry Received:
Ref: {{referenceNumber}}
Client: {{clientName}}
Company: {{companyName}}
Email: {{email}}
Phone: {{phone}}
Discipline: {{service}}
Industry: {{industry}}
Budget: {{budgetRange}}
Timeline: {{timeline}}

Inspect Dossier: {{dashboardUrl}}`,
  },
  {
    slug: 'inquiry_status_update',
    name: 'Inquiry Status Update',
    category: 'inquiry',
    subject: '[Peace Haven] Status Update for Inquiry {{referenceNumber}}',
    description: 'Dispatched to client when their inquiry status is advanced',
    variables: ['clientName', 'referenceNumber', 'newStatus', 'statusDescription', 'notes', 'service'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Inquiry Status Update',
      previewText: 'Status updated to {{newStatus}} for {{referenceNumber}}',
      content: `<p>Dear <strong>{{clientName}}</strong>,</p>
<p>We are writing to provide an update on your project inquiry for <strong>{{service}}</strong> (Ref: <strong>{{referenceNumber}}</strong>).</p>

<div class="info-card">
  <span style="font-size: 11px; text-transform: uppercase; color: #A8B5AE;">Current Lead Stage</span>
  <h3 style="color: #C4A77D; margin: 6px 0 10px; font-size: 20px;">{{newStatus}}</h3>
  <p style="margin: 0; font-size: 13px; color: #E8E5DC;">{{statusDescription}}</p>
</div>

<p>{{notes}}</p>

<p style="margin-top: 24px; font-size: 13px; color: #A8B5AE;">If you have any questions regarding next steps, simply reply directly to this email message.</p>`,
    }),
    textContent: `Dear {{clientName}},

Status update regarding inquiry Ref: {{referenceNumber}} ({{service}}):

Current Stage: {{newStatus}}
{{statusDescription}}

Notes:
{{notes}}

Peace Haven Technologies Inc.`,
  },
  {
    slug: 'admin_invitation',
    name: 'Admin Invitation',
    category: 'invitation',
    subject: '[Peace Haven] Administrative Portal Invitation',
    description: 'Invitation sent to new staff with single-use onboarding link',
    variables: ['name', 'role', 'inviteUrl', 'expiresAt', 'invitedBy'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Administrative Portal Invitation',
      previewText: 'You have been invited to join the Peace Haven Administrative Portal',
      content: `<p>Hello <strong>{{name}}</strong>,</p>
<p>You have been invited by <strong>{{invitedBy}}</strong> to join the Peace Haven Technologies administrative platform with governed role:</p>

<div class="info-card" style="text-align: center;">
  <span class="badge" style="font-size: 13px; background-color: #344B50; color: #C4A77D;">Role: {{role}}</span>
</div>

<p>To configure your secure administrative credentials and activate your account, please click the button below within <strong>48 hours</strong>:</p>

<div style="text-align: center; margin: 28px 0;">
  <a href="{{inviteUrl}}" class="btn-action">Activate Admin Account</a>
</div>

<p style="font-size: 12px; color: #A8B5AE;">This secure one-time invitation link will expire at <strong>{{expiresAt}}</strong>.</p>
<p style="font-size: 11px; color: #64748b; font-family: monospace; word-break: break-all;">If the button does not work, copy and paste this URL into your browser:<br/>{{inviteUrl}}</p>`,
    }),
    textContent: `Hello {{name}},

You have been invited by {{invitedBy}} to join the Peace Haven Technologies administrative platform as {{role}}.

Activate your account within 48 hours:
{{inviteUrl}}

Link expires at {{expiresAt}}.`,
  },
  {
    slug: 'password_reset',
    name: 'Password Reset',
    category: 'auth',
    subject: '[Peace Haven] Reset Your Administrative Password',
    description: 'Password reset request with time-limited cryptographic token',
    variables: ['name', 'resetUrl', 'expiresIn', 'ipAddress'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Password Reset Request',
      previewText: 'Reset your Peace Haven administrative password',
      content: `<p>Hello <strong>{{name}}</strong>,</p>
<p>We received a request to reset the password for your Peace Haven administrative account. If you initiated this request, click the button below to choose a new password:</p>

<div style="text-align: center; margin: 28px 0;">
  <a href="{{resetUrl}}" class="btn-action">Reset Password</a>
</div>

<p style="font-size: 12px; color: #A8B5AE;">This link will expire in <strong>{{expiresIn}}</strong>.</p>
<p style="font-size: 12px; color: #A8B5AE;">Request originated from IP: <code style="color: #C4A77D;">{{ipAddress}}</code>.</p>
<p style="font-size: 12px; color: #dc2626;">If you did not request this reset, your account may be under reconnaissance. Please contact security@peacehaven.tech immediately.</p>`,
    }),
    textContent: `Hello {{name}},

A password reset was requested for your Peace Haven administrative account.
Reset link: {{resetUrl}}
Expires in {{expiresIn}}.
Request IP: {{ipAddress}}

If you did not request this, please notify security@peacehaven.tech immediately.`,
  },
  {
    slug: 'email_verification',
    name: 'Email Verification',
    category: 'auth',
    subject: '[Peace Haven] Verify Your Administrative Email Address',
    description: 'Dispatched to confirm email ownership',
    variables: ['name', 'verificationUrl'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Email Verification',
      previewText: 'Verify your administrative email address',
      content: `<p>Hello <strong>{{name}}</strong>,</p>
<p>Please confirm that this is your authorized business email address by clicking the verification button below:</p>

<div style="text-align: center; margin: 28px 0;">
  <a href="{{verificationUrl}}" class="btn-action">Verify Email Address</a>
</div>`,
    }),
    textContent: `Hello {{name}},

Please verify your business email address for Peace Haven Technologies:
{{verificationUrl}}`,
  },
  {
    slug: 'account_activation',
    name: 'Account Activation',
    category: 'auth',
    subject: '[Peace Haven] Welcome to the Administrative Portal',
    description: 'Confirmation email after staff invitation acceptance and setup',
    variables: ['name', 'role', 'loginUrl'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Account Activated',
      previewText: 'Your Peace Haven administrative account is ready',
      content: `<p>Welcome, <strong>{{name}}</strong>!</p>
<p>Your Peace Haven administrative account has been verified and activated with role: <strong>{{role}}</strong>.</p>

<div style="text-align: center; margin: 28px 0;">
  <a href="{{loginUrl}}" class="btn-action">Sign In to Dashboard</a>
</div>

<p style="font-size: 13px; color: #A8B5AE;">Please ensure you adhere to organizational zero-trust protocols and review the system audit guidelines upon logging in.</p>`,
    }),
    textContent: `Welcome {{name}},

Your administrative account has been activated with role: {{role}}.
Sign in at: {{loginUrl}}`,
  },
  {
    slug: 'cms_approval_request',
    name: 'CMS Approval Request',
    category: 'cms',
    subject: '[CMS] Content Submitted for Review: {{title}}',
    description: 'Alert sent to editors/managers when an author submits content for review',
    variables: ['title', 'contentType', 'submittedBy', 'reviewUrl'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'CMS Review Request',
      previewText: 'Review requested for {{contentType}}: {{title}}',
      content: `<p>A new piece of content has been submitted for editorial review:</p>

<div class="info-card">
  <span class="badge">{{contentType}}</span>
  <h3 style="color: #C4A77D; margin: 8px 0;">{{title}}</h3>
  <p style="margin: 0; font-size: 12px; color: #A8B5AE;">Submitted by: <strong>{{submittedBy}}</strong></p>
</div>

<div style="text-align: center; margin: 24px 0;">
  <a href="{{reviewUrl}}" class="btn-action">Review & Publish</a>
</div>`,
    }),
    textContent: `CMS Review Request:
Content: {{title}} ({{contentType}})
Submitted by: {{submittedBy}}
Review link: {{reviewUrl}}`,
  },
  {
    slug: 'content_published',
    name: 'Content Published',
    category: 'cms',
    subject: '[CMS] Content Published: {{title}}',
    description: 'Notification dispatched when an article or dynamic page is published',
    variables: ['title', 'contentType', 'publishedBy', 'publicUrl'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Content Published',
      previewText: '{{title}} has been published live',
      content: `<p>The following content has been published to the live Peace Haven platform:</p>

<div class="info-card">
  <span class="badge" style="background-color: #059669; color: #ffffff;">Live on Website</span>
  <h3 style="color: #C4A77D; margin: 8px 0;">{{title}}</h3>
  <p style="margin: 0; font-size: 12px; color: #A8B5AE;">Published by: <strong>{{publishedBy}}</strong></p>
</div>

<div style="text-align: center; margin: 24px 0;">
  <a href="{{publicUrl}}" class="btn-action">View Live Page</a>
</div>`,
    }),
    textContent: `Content Published:
{{title}} ({{contentType}})
Published by: {{publishedBy}}
Public URL: {{publicUrl}}`,
  },
  {
    slug: 'security_alert',
    name: 'Security Alert',
    category: 'security',
    subject: '[CRITICAL SECURITY] {{eventTitle}}',
    description: 'Urgent notification to superadmins regarding account lockouts or security anomalies',
    variables: ['eventTitle', 'accountEmail', 'ipAddress', 'timestamp', 'details', 'actionRequired'],
    htmlContent: wrapInBaseEmailLayout({
      title: 'Security Alert',
      previewText: 'Critical Security Alert: {{eventTitle}}',
      content: `<div style="background-color: #3f1212; border: 1px solid #7f1d1d; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
  <span class="badge" style="background-color: #dc2626; color: #ffffff;">Security Alert</span>
  <h3 style="color: #fca5a5; margin: 8px 0 0;">{{eventTitle}}</h3>
</div>

<table class="data-table">
  <tr><td class="label">Target Account:</td><td class="val"><strong style="color: #fca5a5;">{{accountEmail}}</strong></td></tr>
  <tr><td class="label">Originating IP:</td><td class="val"><code style="color: #C4A77D;">{{ipAddress}}</code></td></tr>
  <tr><td class="label">Timestamp:</td><td class="val">{{timestamp}}</td></tr>
  <tr><td class="label">Incident Details:</td><td class="val">{{details}}</td></tr>
</table>

<div class="info-card">
  <strong style="color: #C4A77D;">Action Required:</strong>
  <p style="margin: 6px 0 0; font-size: 13px;">{{actionRequired}}</p>
</div>`,
    }),
    textContent: `CRITICAL SECURITY ALERT: {{eventTitle}}
Target Account: {{accountEmail}}
IP: {{ipAddress}}
Timestamp: {{timestamp}}
Details: {{details}}
Action Required: {{actionRequired}}`,
  },
];

export const emailTemplateService = {
  /**
   * Replaces {{variable}} placeholders with payload values
   */
  render(templateStr, data = {}) {
    if (!templateStr) return '';
    return templateStr.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
      const val = data[key];
      return val !== undefined && val !== null ? String(val) : '';
    });
  },

  /**
   * Renders both HTML and plain text for an email template slug
   */
  async renderTemplateBySlug(slug, data = {}) {
    let tpl = await EmailTemplate.findOne({ slug });
    if (!tpl) {
      // Fallback to in-memory default if not seeded yet
      tpl = DEFAULT_TEMPLATES.find((t) => t.slug === slug);
    }
    if (!tpl) {
      throw new Error(`Email template with slug '${slug}' not found.`);
    }

    const subject = this.render(tpl.subject, data);
    const html = this.render(tpl.htmlContent, data);
    const text = this.render(tpl.textContent, data);

    return {
      template: tpl,
      subject,
      html,
      text,
    };
  },

  /**
   * Seed default templates if not present in MongoDB
   */
  async ensureDefaultTemplates() {
    let count = 0;
    for (const t of DEFAULT_TEMPLATES) {
      const existing = await EmailTemplate.findOne({ slug: t.slug });
      if (!existing) {
        await EmailTemplate.create(t);
        count++;
      }
    }
    return count;
  },
};
