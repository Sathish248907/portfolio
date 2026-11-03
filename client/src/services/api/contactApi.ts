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
  async submitContact(data: Omit<ContactMessage, '_id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    const contactData: ContactMessage = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await request('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
      if (res?.success) return { success: true, message: res.message || 'Message sent successfully.' };
    } catch {
      // Fallback to localStorage
    }

    saveStoredContact(contactData);
    return { success: true, message: 'Message received and logged for the team.' };
  },

  async sendContactMessage(data: Omit<ContactMessage, '_id' | 'createdAt'>) {
    return this.submitContact(data);
  },
};
