import { recordEventSchema } from '../validators/analyticsValidator.js';
import { analyticsService } from '../services/analyticsService.js';

export const analyticsController = {
  /**
   * Public: Ingest analytics interaction or page tracking event
   */
  async recordEvent(req, res, next) {
    try {
      const validated = recordEventSchema.parse(req.body);
      const userAgent = req.headers['user-agent'] || '';

      const result = await analyticsService.recordTelemetryEvent(validated, userAgent);

      if (result.deduplicated) {
        return res.status(200).json({
          success: true,
          status: 'deduplicated',
          message: 'Duplicate event suppressed to maintain analytics accuracy',
        });
      }

      return res.status(201).json({
        success: true,
        eventId: result.eventId,
      });
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          issues: err.errors,
        });
      }
      next(err);
    }
  },

  /**
   * Admin Protected: Overview metrics, period comparisons, growth charts, traffic sources
   */
  async getOverview(req, res, next) {
    try {
      const { period = '30d', startDate, endDate } = req.query;
      const data = await analyticsService.getOverviewMetrics(period, startDate, endDate);

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin Protected: 8 Specialized Service Divisions performance metrics
   */
  async getServicePerformance(req, res, next) {
    try {
      const { period = '30d', startDate, endDate } = req.query;
      const data = await analyticsService.getServiceMetrics(period, startDate, endDate);

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin Protected: 10 Industry Categories engagement metrics
   */
  async getIndustryPerformance(req, res, next) {
    try {
      const { period = '30d', startDate, endDate } = req.query;
      const data = await analyticsService.getIndustryMetrics(period, startDate, endDate);

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin Protected: 10 Portfolio Case Studies popularity metrics
   */
  async getPortfolioPerformance(req, res, next) {
    try {
      const { period = '30d', startDate, endDate } = req.query;
      const data = await analyticsService.getPortfolioMetrics(period, startDate, endDate);

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin Protected: 8-Stage Inquiry Conversion Funnel
   * Connects front-end interactions with Phase 6 Lead Management
   */
  async getFunnel(req, res, next) {
    try {
      const { period = '30d', startDate, endDate } = req.query;
      const data = await analyticsService.getConversionFunnel(period, startDate, endDate);

      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin Protected: Export formatted analytics reports as CSV
   */
  async exportCsv(req, res, next) {
    try {
      const { type = 'overview', period = '30d', startDate, endDate } = req.query;
      const { csvContent, filename } = await analyticsService.generateAnalyticsCsv(
        type,
        period,
        startDate,
        endDate
      );

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csvContent);
    } catch (err) {
      next(err);
    }
  },
};
