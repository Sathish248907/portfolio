import { Contact } from '../models/Contact.js';
import { contactSchema } from '../validators/contactValidator.js';

export const contactController = {
  /**
   * Public: Submit general contact message
   */
  async submit(req, res, next) {
    try {
      const validated = contactSchema.parse(req.body);
      const newContact = new Contact(validated);
      await newContact.save();

      console.log(`[Contact Received] From: ${validated.name} (${validated.email}) | Subject: ${validated.subject}`);

      res.status(201).json({
        success: true,
        message: 'Your message has been received. Our team will contact you shortly.',
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: List contact messages
   */
  async list(req, res, next) {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json({ success: true, data: contacts });
    } catch (err) {
      next(err);
    }
  },
};
