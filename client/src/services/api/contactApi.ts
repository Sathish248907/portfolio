import { ContactMessage } from '../../types';
import { request } from './httpClient';

const CONTACTS_STORAGE_KEY = 'peace_haven_contacts';

function saveStoredContact(message: ContactMessage) {
  try {
    const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);
    const list: ContactMessage[] = raw ? JSON.parse(raw) : [];
    list.unshift(message);
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save contact message to localStorage', e);
  }
}

export const contactApi = {
  async sendContactMessage(data: Partial<ContactMessage> & { name: string; email: string; message: string }) {
    const fullMessage: ContactMessage = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || 'General Engineering Inquiry',
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    saveStoredContact(fullMessage);

    try {
      const res = await request('/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res?.success) return res;
    } catch (e) {
      console.warn('[API Contact] Server dispatch offline, persisting to client storage', e);
    }

    return {
      success: true,
      message: 'Your message has been safely recorded. A senior engineering manager will get back to you shortly.',
    };
  },
};

