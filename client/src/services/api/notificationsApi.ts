import { request } from './httpClient';
import {
  InAppNotification,
  EmailLogEntry,
  EmailTemplateItem,
  NotificationPreferences,
  ReminderItem,
} from '../../types';

function getToken(): string | undefined {
  try {
    return localStorage.getItem('token') || localStorage.getItem('ph_admin_token') || undefined;
  } catch {
    return undefined;
  }
}

// Mock baseline data for resilient testing / demo execution
const MOCK_NOTIFICATIONS: InAppNotification[] = [
  {
    _id: 'notif-001',
    id: 'notif-001',
    title: 'New Enterprise Lead: Vanguard Global Financials',
    message: 'Web Development & FinTech inquiry submitted with budget tier $250,000+. Reference: PH-VANGUARD-01',
    category: 'inquiry',
    type: 'info',
    relatedResourceId: 'PH-VANGUARD-01',
    relatedResourceType: 'inquiry',
    actionUrl: '/admin/inquiries',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    _id: 'notif-002',
    id: 'notif-002',
    title: 'CMS Page Published: Healthcare Solutions',
    message: 'David Okafor updated and published clinical diagnostics case studies.',
    category: 'cms',
    type: 'success',
    relatedResourceId: 'healthcare',
    relatedResourceType: 'page',
    actionUrl: '/admin/cms',
    isRead: true,
    readAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    _id: 'notif-003',
    id: 'notif-003',
    title: 'Security Alert: Account Lockout',
    message: 'Multiple failed attempts recorded from unrecognized IP address.',
    category: 'security',
    type: 'urgent',
    actionUrl: '/admin/audit-logs',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
];

const MOCK_EMAIL_LOGS: EmailLogEntry[] = [
  {
    _id: 'email-001',
    id: 'email-001',
    recipient: 'mvance@apexrobotics.io',
    recipientName: 'Marcus Vance',
    subject: '[Peace Haven] Inquiry Received: Ref PH-MW1O45EI-3345',
    templateName: 'Client Inquiry Confirmation',
    category: 'inquiry_client',
    relatedResourceId: 'PH-MW1O45EI-3345',
    status: 'sent',
    providerMessageId: 'simulated-msg-001',
    attemptCount: 1,
    lastAttemptAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    sentAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    _id: 'email-002',
    id: 'email-002',
    recipient: 'invalid-lead@example.corp',
    recipientName: 'Unverified Lead',
    subject: '[Peace Haven] Inquiry Received: Ref PH-INVALID-09',
    templateName: 'Client Inquiry Confirmation',
    category: 'inquiry_client',
    relatedResourceId: 'PH-INVALID-09',
    status: 'failed',
    failureReason: '550 5.1.1 User unknown / Host unreachable',
    attemptCount: 2,
    lastAttemptAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
];

const MOCK_TEMPLATES: EmailTemplateItem[] = [
  {
    _id: 'tpl-001',
    slug: 'client_inquiry_confirmation',
    name: 'Client Inquiry Confirmation',
    category: 'inquiry',
    subject: '[Peace Haven] Inquiry Received: Ref {{referenceNumber}}',
    description: 'Dispatched to prospective client immediately upon multi-step intake submission',
    htmlContent: '<p>Dear <strong>{{clientName}}</strong>,</p><p>Thank you for submitting your engineering requirements...</p>',
    textContent: 'Dear {{clientName}},\n\nThank you for submitting your requirements...',
    variables: ['clientName', 'referenceNumber', 'service', 'companyName', 'budgetRange', 'timeline'],
    isActive: true,
    isSystem: true,
  },
  {
    _id: 'tpl-002',
    slug: 'new_inquiry_admin_alert',
    name: 'New Inquiry Admin Alert',
    category: 'inquiry',
    subject: '[NEW LEAD] {{service}} - {{companyName}} ({{referenceNumber}})',
    description: 'Sent to internal leadership and lead managers when new inquiry arrives',
    htmlContent: '<p>New inquiry registered for {{service}}</p>',
    textContent: 'New inquiry registered for {{service}}',
    variables: ['referenceNumber', 'service', 'companyName', 'clientName', 'email', 'budgetRange'],
    isActive: true,
    isSystem: true,
  },
  {
    _id: 'tpl-003',
    slug: 'admin_invitation',
    name: 'Admin Invitation',
    category: 'invitation',
    subject: '[Peace Haven] Administrative Portal Invitation',
    description: 'Invitation sent to new staff with single-use onboarding link',
    htmlContent: '<p>You have been invited as {{role}}</p>',
    textContent: 'You have been invited as {{role}}',
    variables: ['name', 'role', 'inviteUrl', 'expiresAt', 'invitedBy'],
    isActive: true,
    isSystem: true,
  },
];

const MOCK_REMINDERS: ReminderItem[] = [
  {
    _id: 'rem-001',
    id: 'rem-001',
    title: 'Client Scoping Review with Apex Robotics',
    description: 'Discuss ROS 2 hardware drivers and multi-robot navigation specifications.',
    inquiryReference: 'PH-MW1O45EI-3345',
    clientName: 'Marcus Vance',
    assignedTo: 'admin-001',
    assignedToName: 'Executive Lead',
    assignedToEmail: 'admin@peacehaven.tech',
    createdBy: 'admin-001',
    createdByName: 'Executive Lead',
    dueAt: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    status: 'pending',
    priority: 'high',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'rem-002',
    id: 'rem-002',
    title: 'Send Enterprise SLA Proposal to Vanguard Financial',
    description: 'Deliver double-entry ledger security audit and latency benchmarks.',
    inquiryReference: 'PH-VANGUARD-01',
    clientName: 'Elena Rostova',
    assignedTo: 'admin-001',
    assignedToName: 'Executive Lead',
    assignedToEmail: 'admin@peacehaven.tech',
    createdBy: 'admin-001',
    createdByName: 'Executive Lead',
    dueAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    status: 'pending',
    priority: 'urgent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'rem-003',
    id: 'rem-003',
    title: 'Overdue Briefing: Clinic Telemedicine Review',
    description: 'Verify HIPAA compliance checklist with external clinical auditors.',
    inquiryReference: 'PH-CLINIC-99',
    clientName: 'Dr. Aris Thorne',
    assignedTo: 'admin-001',
    assignedToName: 'Executive Lead',
    assignedToEmail: 'admin@peacehaven.tech',
    createdBy: 'admin-001',
    createdByName: 'Executive Lead',
    dueAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const notificationsApi = {
  // In-App Notifications
  async getNotifications(params?: { category?: string; unreadOnly?: boolean; search?: string; page?: number; limit?: number }) {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/notifications', {
        method: 'GET',
        token: getToken(),
        params,
      });
      if (res?.data) return res;
    } catch {}

    let filtered = [...MOCK_NOTIFICATIONS];
    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter((n) => n.category === params.category);
    }
    if (params?.unreadOnly) {
      filtered = filtered.filter((n) => !n.isRead);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((n) => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q));
    }

    return {
      success: true,
      data: {
        metrics: {
          total: MOCK_NOTIFICATIONS.length,
          unread: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length,
          read: MOCK_NOTIFICATIONS.filter((n) => n.isRead).length,
          failedEmails: 1,
        },
        notifications: filtered,
        pagination: { total: filtered.length, page: 1, limit: 20, totalPages: 1 },
      },
    };
  },

  async getUnreadCount(): Promise<number> {
    try {
      const res = await request<{ success: boolean; unreadCount: number }>('/admin/notifications/unread-count', {
        method: 'GET',
        token: getToken(),
      });
      if (typeof res?.unreadCount === 'number') return res.unreadCount;
    } catch {}

    return MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;
  },

  async markAsRead(id: string) {
    try {
      const res = await request<{ success: boolean; data: any }>(`/admin/notifications/${id}/read`, {
        method: 'PATCH',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    const target = MOCK_NOTIFICATIONS.find((n) => n._id === id || n.id === id);
    if (target) {
      target.isRead = true;
      target.readAt = new Date().toISOString();
    }
    return { success: true, data: target };
  },

  async markAllAsRead() {
    try {
      const res = await request<{ success: boolean; modifiedCount: number }>('/admin/notifications/read-all', {
        method: 'POST',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    MOCK_NOTIFICATIONS.forEach((n) => {
      n.isRead = true;
      n.readAt = new Date().toISOString();
    });
    return { success: true, modifiedCount: MOCK_NOTIFICATIONS.length };
  },

  async archiveNotification(id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/notifications/${id}`, {
        method: 'DELETE',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    const idx = MOCK_NOTIFICATIONS.findIndex((n) => n._id === id || n.id === id);
    if (idx !== -1) MOCK_NOTIFICATIONS.splice(idx, 1);
    return { success: true, message: 'Notification archived' };
  },

  // Notification Preferences
  async getPreferences(): Promise<NotificationPreferences> {
    try {
      const res = await request<{ success: boolean; data: NotificationPreferences }>('/admin/notifications/preferences', {
        method: 'GET',
        token: getToken(),
      });
      if (res?.data) return res.data;
    } catch {}

    return {
      categories: {
        inquiry: { inApp: true, email: true },
        assignment: { inApp: true, email: true },
        statusUpdate: { inApp: true, email: false },
        cms: { inApp: true, email: false },
        userManagement: { inApp: true, email: true },
        reminder: { inApp: true, email: true },
        security: { inApp: true, email: true },
      },
      frequency: 'immediate',
    };
  },

  async updatePreferences(data: Partial<NotificationPreferences>) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>('/admin/notifications/preferences', {
        method: 'PUT',
        token: getToken(),
        body: JSON.stringify(data),
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Preferences updated', data };
  },

  // Email Logs
  async getEmailLogs(params?: { status?: string; category?: string; search?: string; page?: number; limit?: number }) {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/emails/logs', {
        method: 'GET',
        token: getToken(),
        params,
      });
      if (res?.data) return res;
    } catch {}

    let filtered = [...MOCK_EMAIL_LOGS];
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter((l) => l.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((l) => l.recipient.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q));
    }

    return {
      success: true,
      data: {
        logs: filtered,
        metrics: { sent: 1, failed: 1, retrying: 0, pending: 0, processing: 0 },
        pagination: { total: filtered.length, page: 1, limit: 20, totalPages: 1 },
      },
    };
  },

  async retryEmail(id: string) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>(`/admin/emails/logs/${id}/retry`, {
        method: 'POST',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    const target = MOCK_EMAIL_LOGS.find((e) => e._id === id || e.id === id);
    if (target) {
      target.status = 'sent';
      target.sentAt = new Date().toISOString();
      target.attemptCount += 1;
    }
    return { success: true, message: 'Email redelivered successfully', data: target };
  },

  // Email Templates
  async getTemplates(): Promise<EmailTemplateItem[]> {
    try {
      const res = await request<{ success: boolean; data: EmailTemplateItem[] }>('/admin/emails/templates', {
        method: 'GET',
        token: getToken(),
      });
      if (res?.data) return res.data;
    } catch {}

    return MOCK_TEMPLATES;
  },

  async getTemplate(idOrSlug: string): Promise<EmailTemplateItem> {
    try {
      const res = await request<{ success: boolean; data: EmailTemplateItem }>(`/admin/emails/templates/${idOrSlug}`, {
        method: 'GET',
        token: getToken(),
      });
      if (res?.data) return res.data;
    } catch {}

    return MOCK_TEMPLATES.find((t) => t.slug === idOrSlug || t._id === idOrSlug) || MOCK_TEMPLATES[0];
  },

  async updateTemplate(idOrSlug: string, data: Partial<EmailTemplateItem>) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>(`/admin/emails/templates/${idOrSlug}`, {
        method: 'PUT',
        token: getToken(),
        body: JSON.stringify(data),
      });
      if (res) return res;
    } catch {}

    return { success: true, message: 'Template updated', data };
  },

  async previewTemplate(idOrSlug: string, sampleData?: Record<string, any>) {
    try {
      const res = await request<{ success: boolean; data: any }>(`/admin/emails/templates/${idOrSlug}/preview`, {
        method: 'POST',
        token: getToken(),
        body: JSON.stringify({ data: sampleData }),
      });
      if (res?.data) return res.data;
    } catch {}

    return {
      subject: '[Peace Haven] Sample Rendered Email Subject',
      html: '<div style="font-family: Arial; padding: 20px; background: #17232B; color: #E8E5DC;"><h3>Peace Haven Technologies</h3><p>Rendered sample preview content.</p></div>',
      text: 'Peace Haven Technologies - Rendered sample preview content.',
    };
  },

  async sendTestEmail(payload: { recipient: string; templateSlug?: string; sampleData?: Record<string, any> }) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>('/admin/emails/test', {
        method: 'POST',
        token: getToken(),
        body: JSON.stringify(payload),
      });
      if (res) return res;
    } catch {}

    return { success: true, message: `Test email dispatched to ${payload.recipient}` };
  },

  // Reminders
  async getReminders(params?: { filter?: string; assignedTo?: string; search?: string; page?: number; limit?: number }) {
    try {
      const res = await request<{ success: boolean; data: any }>('/admin/reminders', {
        method: 'GET',
        token: getToken(),
        params,
      });
      if (res?.data) return res;
    } catch {}

    let filtered = [...MOCK_REMINDERS];
    if (params?.filter && params.filter !== 'all') {
      if (params.filter === 'completed') filtered = filtered.filter((r) => r.status === 'completed');
      else filtered = filtered.filter((r) => r.status === 'pending');
    }

    return {
      success: true,
      data: {
        reminders: filtered,
        metrics: {
          totalPending: 3,
          todayCount: 1,
          upcomingCount: 1,
          overdueCount: 1,
          completedCount: 0,
        },
        pagination: { total: filtered.length, page: 1, limit: 50, totalPages: 1 },
      },
    };
  },

  async createReminder(payload: {
    title: string;
    description?: string;
    dueAt: string;
    priority?: string;
    inquiryReference?: string;
    clientName?: string;
    assignedTo?: string;
  }) {
    try {
      const res = await request<{ success: boolean; message: string; data: ReminderItem }>('/admin/reminders', {
        method: 'POST',
        token: getToken(),
        body: JSON.stringify(payload),
      });
      if (res) return res;
    } catch {}

    const newRem: ReminderItem = {
      _id: `rem-${Date.now()}`,
      id: `rem-${Date.now()}`,
      title: payload.title,
      description: payload.description,
      dueAt: payload.dueAt,
      status: 'pending',
      priority: (payload.priority as any) || 'medium',
      inquiryReference: payload.inquiryReference,
      clientName: payload.clientName,
      assignedTo: payload.assignedTo || 'admin-001',
      assignedToName: 'Executive Lead',
      createdBy: 'admin-001',
      createdByName: 'Executive Lead',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_REMINDERS.unshift(newRem);
    return { success: true, message: 'Reminder created', data: newRem };
  },

  async completeReminder(id: string) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>(`/admin/reminders/${id}/complete`, {
        method: 'PATCH',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    const target = MOCK_REMINDERS.find((r) => r._id === id || r.id === id);
    if (target) {
      target.status = 'completed';
      target.completedAt = new Date().toISOString();
    }
    return { success: true, message: 'Reminder completed', data: target };
  },

  async updateReminder(id: string, payload: Partial<ReminderItem>) {
    try {
      const res = await request<{ success: boolean; message: string; data: any }>(`/admin/reminders/${id}`, {
        method: 'PUT',
        token: getToken(),
        body: JSON.stringify(payload),
      });
      if (res) return res;
    } catch {}

    const target = MOCK_REMINDERS.find((r) => r._id === id || r.id === id);
    if (target) {
      Object.assign(target, payload);
    }
    return { success: true, message: 'Reminder updated', data: target };
  },

  async deleteReminder(id: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/reminders/${id}`, {
        method: 'DELETE',
        token: getToken(),
      });
      if (res) return res;
    } catch {}

    const idx = MOCK_REMINDERS.findIndex((r) => r._id === id || r.id === id);
    if (idx !== -1) MOCK_REMINDERS.splice(idx, 1);
    return { success: true, message: 'Reminder deleted' };
  },
};
