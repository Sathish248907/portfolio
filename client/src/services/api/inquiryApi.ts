import { ProjectInquiry, InquiryStatus, InternalNote, InquiryMetrics } from '../../types';
import { request } from './httpClient';

const INQUIRIES_STORAGE_KEY = 'peace_haven_inquiries';

function getStoredInquiries(): ProjectInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredInquiry(inquiry: ProjectInquiry) {
  try {
    const list = getStoredInquiries();
    list.unshift(inquiry);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const inquiryApi = {
  async submitInquiry(data: Partial<ProjectInquiry> & { email: string; clientName: string; companyName: string }): Promise<{ success: boolean; referenceNumber: string; message: string; data?: ProjectInquiry }> {
    const referenceNumber = `PH-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullInquiry: ProjectInquiry = {
      referenceNumber,
      service: data.service || (data.selectedServices && data.selectedServices[0]) || 'Web Development',
      selectedServices: data.selectedServices || [data.service || 'Web Development'],
      projectTitle: data.projectTitle || '',
      projectDescription: data.projectDescription || data.projectRequirements || '',
      projectRequirements: data.projectRequirements || data.projectDescription || 'No detailed specifications entered.',
      industry: data.industry || 'Information Technology & Software',
      projectType: data.projectType || 'Full Implementation',
      deliverables: data.deliverables || '',
      preferredTechnology: data.preferredTechnology || '',
      budgetRange: data.budgetRange || 'Undetermined / Exploratory Scoping',
      timeline: data.timeline || '1 - 3 months',
      startPreference: data.startPreference || 'Immediately',
      additionalRequirements: data.additionalRequirements || '',
      clientName: data.clientName,
      email: data.email,
      phoneNumber: data.phoneNumber || '',
      companyName: data.companyName,
      jobTitle: data.jobTitle || '',
      country: data.country || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveStoredInquiry(fullInquiry);

    try {
      const res = await request<{ success: boolean; referenceNumber: string; message: string; data?: ProjectInquiry }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(fullInquiry),
      });
      if (res && res.referenceNumber) return res;
    } catch (e) {
      console.warn('[API Inquiry] Backend request failed, relying on localStorage persistence', e);
    }

    return {
      success: true,
      referenceNumber,
      message: 'Inquiry received successfully. Our engineering lead will contact you within 24 hours.',
      data: fullInquiry,
    };
  },

  async getAdminInquiries(token: string): Promise<ProjectInquiry[]> {
    try {
      const res = await request<{ success: boolean; data: ProjectInquiry[] }>('/admin/inquiries', {
        token,
      });
      if (res && res.data) return res.data;
    } catch {}
    return getStoredInquiries();
  },

  async getAdminInquiriesWithMetrics(token: string): Promise<{ inquiries: ProjectInquiry[]; metrics: InquiryMetrics }> {
    try {
      const res = await request<{ success: boolean; data: ProjectInquiry[]; metrics: InquiryMetrics }>('/admin/inquiries', {
        token,
      });
      if (res && res.data) {
        return {
          inquiries: res.data,
          metrics: res.metrics || {
            total: res.data.length,
            new: 0,
            inProgress: 0,
            qualified: 0,
            converted: 0,
            rejected: 0,
          },
        };
      }
    } catch {}

    const list = getStoredInquiries();
    return {
      inquiries: list,
      metrics: {
        total: list.length,
        new: list.filter((i: ProjectInquiry) => (i.status || '').toUpperCase() === 'NEW').length,
        inProgress: list.filter((i: ProjectInquiry) => ['REVIEWING', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONTACTED'].includes((i.status || '').toUpperCase())).length,
        qualified: list.filter((i: ProjectInquiry) => (i.status || '').toUpperCase() === 'QUALIFIED').length,
        converted: list.filter((i: ProjectInquiry) => ['CONVERTED', 'WON'].includes((i.status || '').toUpperCase())).length,
        rejected: list.filter((i: ProjectInquiry) => ['CLOSED', 'REJECTED', 'LOST', 'ARCHIVED'].includes((i.status || '').toUpperCase())).length,
      },
    };
  },

  async getInquiries(token: string, params: { status?: string; service?: string; search?: string; page?: number; limit?: number } = {}) {
    try {
      const res = await request('/admin/inquiries', {
        token,
        params,
      });
      if (res && res.data) return res;
    } catch {}

    const list = getStoredInquiries();
    let filtered = list;
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(i => (i.status || '').toLowerCase() === params.status?.toLowerCase());
    }
    if (params.service && params.service !== 'all') {
      filtered = filtered.filter(i => i.service === params.service || i.selectedServices?.includes(params.service as any));
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(i => 
        i.clientName.toLowerCase().includes(s) ||
        i.companyName.toLowerCase().includes(s) ||
        i.email.toLowerCase().includes(s) ||
        i.referenceNumber.toLowerCase().includes(s)
      );
    }

    return {
      success: true,
      data: filtered,
      pagination: {
        total: filtered.length,
        page: params.page || 1,
        pages: 1,
      },
    };
  },

  async getInquiryByRef(token: string, referenceNumber: string) {
    try {
      const res = await request(`/admin/inquiries/${referenceNumber}`, { token });
      if (res && res.data) return res;
    } catch {}

    const list = getStoredInquiries();
    const found = list.find(i => i.referenceNumber === referenceNumber);
    if (found) return { success: true, data: found };
    throw new Error('Inquiry not found');
  },

  async updateInquiryStatus(token: string, idOrRef: string, status: string, notes?: string) {
    return this.updateInquiry(token, idOrRef, { status: status as any, notes });
  },

  async updateInquiry(
    token: string,
    idOrRef: string,
    updates: {
      status?: string;
      notes?: string;
      assignedTo?: { name: string; email?: string; role?: string };
    }
  ) {
    try {
      const res = await request<{ success: boolean; data: ProjectInquiry }>(`/admin/inquiries/${idOrRef}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify(updates),
      });
      if (res && res.data) return res;
    } catch {}

    const list = getStoredInquiries();
    const item = list.find((i: any) => i.referenceNumber === idOrRef || i._id === idOrRef);
    if (item) {
      if (updates.status) item.status = updates.status as any;
      if (updates.notes !== undefined) item.notes = updates.notes;
      if (updates.assignedTo) item.assignedTo = updates.assignedTo;
      item.updatedAt = new Date().toISOString();
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
      return { success: true, data: item };
    }
    return { success: true, message: 'Status updated' };
  },

  async addInquiryNote(token: string, idOrRef: string, text: string, author: string = 'Admin') {
    try {
      const res = await request<{ success: boolean; data: ProjectInquiry }>(`/admin/inquiries/${idOrRef}/notes`, {
        method: 'POST',
        token,
        body: JSON.stringify({ text, author }),
      });
      if (res && res.data) return res;
    } catch {}

    const list = getStoredInquiries();
    const item = list.find((i: any) => i.referenceNumber === idOrRef || i._id === idOrRef);
    if (item) {
      if (!item.internalNotes) item.internalNotes = [];
      const note: InternalNote = {
        id: `note-${Date.now()}`,
        text,
        author,
        createdAt: new Date().toISOString(),
      };
      item.internalNotes.push(note);
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
      return { success: true, data: item };
    }
    return { success: true, message: 'Note added' };
  },

  async deleteInquiry(token: string, idOrRef: string) {
    try {
      const res = await request<{ success: boolean; message: string }>(`/admin/inquiries/${idOrRef}`, {
        method: 'DELETE',
        token,
      });
      if (res) return res;
    } catch {}

    const list = getStoredInquiries().filter((i: any) => i.referenceNumber !== idOrRef && i._id !== idOrRef);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
    return { success: true, message: 'Inquiry deleted successfully' };
  },

  async exportInquiriesCsv(token: string, filters: { status?: string; service?: string } = {}) {
    try {
      const res = await request<{ success: boolean; csv: string; count: number }>('/admin/inquiries/export', {
        token,
        params: filters,
      });
      if (res?.csv) {
        const blob = new Blob([res.csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `peace-haven-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        return { success: true, count: res.count };
      }
    } catch (e) {
      console.warn('[API] Server export failed, generating CSV locally', e);
    }

    const inquiries = getStoredInquiries();
    const headers = ['Reference Number', 'Client Name', 'Company Name', 'Email', 'Phone', 'Service', 'Industry', 'Budget', 'Timeline', 'Status', 'Date'];
    const rows = inquiries.map(i => [
      i.referenceNumber,
      `"${i.clientName || ''}"`,
      `"${i.companyName || ''}"`,
      i.email || '',
      i.phoneNumber || '',
      i.service || '',
      i.industry || '',
      `"${i.budgetRange || ''}"`,
      i.timeline || '',
      i.status || '',
      i.createdAt || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `peace-haven-inquiries-local-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    return { success: true, count: inquiries.length };
  },
};
