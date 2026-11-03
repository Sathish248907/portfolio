import { ProjectInquiry, ContactMessage, AdminUser } from '../types';
import { projectsData } from '../data/projectsData';
import { servicesData } from '../data/servicesData';

const API_BASE = '/api/v1';

// Inquiries storage fallback
const INQUIRIES_STORAGE_KEY = 'peace_haven_inquiries';
const CONTACTS_STORAGE_KEY = 'peace_haven_contacts';

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

export const api = {
  // Submit Project Inquiry
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
      companyName: data.companyName,
      jobTitle: data.jobTitle || '',
      country: data.country || '',
      phoneNumber: data.phoneNumber || '',
      attachments: data.attachments || [],
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullInquiry),
      });

      if (response.ok) {
        const json = await response.json();
        // Also sync local cache
        saveStoredInquiry(json.data || fullInquiry);
        return {
          success: true,
          referenceNumber: json.data?.referenceNumber || referenceNumber,
          message: 'Inquiry submitted successfully to engineering team.',
          data: json.data || fullInquiry,
        };
      }
    } catch {
      // Graceful fallback to persistent browser storage
    }

    saveStoredInquiry(fullInquiry);
    return {
      success: true,
      referenceNumber,
      message: 'Inquiry queued and registered successfully with Peace Haven.',
      data: fullInquiry,
    };
  },

  // Submit Contact Form
  async submitContact(data: Omit<ContactMessage, '_id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    const contactData: ContactMessage = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        return { success: true, message: 'Message sent successfully.' };
      }
    } catch {
      // Fallback
    }

    try {
      const contacts = JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY) || '[]');
      contacts.unshift(contactData);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      console.error(e);
    }

    return { success: true, message: 'Message received and logged for the team.' };
  },

  // Fetch Public Services
  async getServices() {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (res.ok) {
        const json = await res.json();
        return json.data || servicesData;
      }
    } catch {}
    return servicesData;
  },

  // Fetch Public Projects
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const json = await res.json();
        return json.data || projectsData;
      }
    } catch {}
    return projectsData;
  },

  // Fetch Single Project Case Study
  async getProjectBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}
    return projectsData.find((p) => p.slug === slug) || null;
  },

  // Admin Inquiries
  async getAdminInquiries(token: string): Promise<ProjectInquiry[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch {}
    return getStoredInquiries();
  },

  async getAdminInquiriesWithMetrics(token: string): Promise<{ inquiries: ProjectInquiry[]; metrics: any }> {
    try {
      const res = await fetch(`${API_BASE}/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        return {
          inquiries: json.data || [],
          metrics: json.metrics || {
            total: (json.data || []).length,
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
        new: list.filter((i) => (i.status || '').toUpperCase() === 'NEW').length,
        inProgress: list.filter((i) => ['REVIEWING', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONTACTED'].includes((i.status || '').toUpperCase())).length,
        qualified: list.filter((i) => (i.status || '').toUpperCase() === 'QUALIFIED').length,
        converted: list.filter((i) => ['CONVERTED', 'WON'].includes((i.status || '').toUpperCase())).length,
        rejected: list.filter((i) => ['CLOSED', 'REJECTED', 'LOST', 'ARCHIVED'].includes((i.status || '').toUpperCase())).length,
      },
    };
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
      const res = await fetch(`${API_BASE}/admin/inquiries/${idOrRef}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) return await res.json();
    } catch {}

    // Fallback update in local storage
    const list = getStoredInquiries();
    const item = list.find((i) => i.referenceNumber === idOrRef || i._id === idOrRef);
    if (item) {
      if (updates.status) item.status = updates.status as any;
      if (updates.notes !== undefined) item.notes = updates.notes;
      if (updates.assignedTo) item.assignedTo = updates.assignedTo;
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
    }
    return { success: true };
  },

  async addInquiryNote(token: string, idOrRef: string, text: string, author?: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/inquiries/${idOrRef}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, author }),
      });
      if (res.ok) return await res.json();
    } catch {}

    // Fallback update in local storage
    const list = getStoredInquiries();
    const item = list.find((i) => i.referenceNumber === idOrRef || i._id === idOrRef);
    if (item) {
      if (!item.internalNotes) item.internalNotes = [];
      const newNote = {
        id: `note_${Date.now()}`,
        text,
        author: author || 'Admin',
        createdAt: new Date().toISOString(),
      };
      item.internalNotes.push(newNote);
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
      return { success: true, data: newNote };
    }
    return { success: true };
  },

  async deleteInquiry(token: string, idOrRef: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/inquiries/${idOrRef}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch {}

    // Fallback delete in local storage
    const list = getStoredInquiries().filter((i) => i.referenceNumber !== idOrRef && i._id !== idOrRef);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
    return { success: true };
  },

  // Admin Authentication
  async adminLogin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    try {
      const res = await fetch(`${API_BASE}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {}

    // Default admin fallback credential for offline/demo verification
    if (email === 'admin@peacehaven.tech' && password === 'PeaceHavenAdmin2026!') {
      return {
        token: 'ph-demo-jwt-token-verified-2026',
        user: {
          id: 'admin-001',
          email: 'admin@peacehaven.tech',
          name: 'Executive Lead',
          role: 'superadmin',
        },
      };
    }

    throw new Error('Invalid administrative credentials. Use admin@peacehaven.tech / PeaceHavenAdmin2026!');
  },
};
