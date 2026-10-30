import { Project } from '../models/Project.js';

export const projectController = {
  /**
   * Public: List all published case studies / prototypes
   */
  async list(req, res, next) {
    try {
      const { serviceId } = req.query;
      const query = { isPublished: true };
      if (serviceId) {
        query.serviceId = serviceId;
      }

      const projects = await Project.find(query).sort({ publishedAt: -1 });
      res.json({ success: true, data: projects });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Public: Get case study by slug
   */
  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug, isPublished: true });

      if (!project) {
        return res.status(404).json({ success: false, error: 'Project case study not found.' });
      }

      res.json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Create new project case study
   */
  async create(req, res, next) {
    try {
      const newProject = new Project(req.body);
      await newProject.save();
      res.status(201).json({ success: true, data: newProject });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update project case study
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Project record not found.' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Delete project case study
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Project record not found.' });
      }
      res.json({ success: true, message: 'Project removed successfully.' });
    } catch (err) {
      next(err);
    }
  },
};
