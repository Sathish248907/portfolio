import { Service } from '../models/Service.js';

export const serviceController = {
  /**
   * Public: List all 8 services
   */
  async list(req, res, next) {
    try {
      const services = await Service.find().sort({ createdAt: 1 });
      res.json({ success: true, data: services });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Public: Get service by slug
   */
  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const service = await Service.findOne({ slug });

      if (!service) {
        return res.status(404).json({ success: false, error: 'Service not found.' });
      }

      res.json({ success: true, data: service });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update service content
   */
  async update(req, res, next) {
    try {
      const { slug } = req.params;
      const updated = await Service.findOneAndUpdate({ slug }, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Service not found.' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },
};
