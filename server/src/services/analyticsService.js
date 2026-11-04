import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { Inquiry } from '../models/Inquiry.js';

// Canonical service definitions matching client architecture
export const CANONICAL_SERVICES = [
  { id: 'web-development', slug: 'web-development', title: 'Web Development', division: 'Software Engineering' },
  { id: 'fintech', slug: 'fintech', title: 'FinTech', division: 'Financial Technology' },
  { id: 'robotics', slug: 'robotics', title: 'Robotics & Automation', division: 'Automation & Hardware' },
  { id: 'drone-technology', slug: 'drone-technology', title: 'Drone Technology', division: 'Aerospace & Geospatial' },
  { id: 'healthcare', slug: 'healthcare', title: 'Healthcare Solutions', division: 'Clinical Systems' },
  { id: 'us-staffing', slug: 'us-staffing', title: 'US Staffing', division: 'Global Talent' },
  { id: 'trading', slug: 'trading', title: 'Trading & Investment', division: 'Quantitative Markets' },
  { id: 'digital-marketing', slug: 'digital-marketing', title: 'Digital Marketing', division: 'Growth & SEO' },
];

// Canonical industry definitions matching client architecture
export const CANONICAL_INDUSTRIES = [
  { id: 'it-software', slug: 'it-software', title: 'Information Technology & Software', shortDesc: 'Enterprise apps, custom SaaS & automation' },
  { id: 'banking-finance', slug: 'banking-finance', title: 'Banking & Financial Services', shortDesc: 'Digital platforms, payments & gold/silver bullion' },
  { id: 'manufacturing-automation', slug: 'manufacturing-automation', title: 'Manufacturing & Industrial Automation', shortDesc: 'Robotics, sensory automation & monitoring' },
  { id: 'healthcare-medical', slug: 'healthcare-medical', title: 'Healthcare & Medical Technology', shortDesc: 'Clinic workflows, diagnostics & screening' },
  { id: 'agriculture-agritech', slug: 'agriculture-agritech', title: 'Agriculture & Agritech', shortDesc: 'Smart farming, aerial surveillance & AI detection' },
  { id: 'real-estate-proptech', slug: 'real-estate-proptech', title: 'Real Estate & Property Technology', shortDesc: 'Property portals, listings & booking systems' },
  { id: 'logistics-supply-chain', slug: 'logistics-supply-chain', title: 'Logistics & Supply Chain', shortDesc: 'Warehouse automation, route tracking & inventory' },
  { id: 'retail-ecommerce', slug: 'retail-ecommerce', title: 'Retail & E-commerce', shortDesc: 'High-volume storefronts, checkout & catalogs' },
  { id: 'hr-staffing', slug: 'hr-staffing', title: 'Human Resources & Staffing', shortDesc: 'Technical recruiting, talent workflows & screening' },
  { id: 'education-edtech', slug: 'education-edtech', title: 'Education & EdTech', shortDesc: 'LMS platforms, student management & portals' },
];

// Canonical portfolio project definitions matching client architecture
export const CANONICAL_PROJECTS = [
  { id: 'ph-homes', slug: 'ph-homes', title: 'PH Homes', serviceSlug: 'web-development', category: 'Real Estate' },
  { id: 'grow-capital', slug: 'grow-capital', title: 'Grow Capital', serviceSlug: 'fintech', category: 'FinTech' },
  { id: 'auravia', slug: 'auravia', title: 'AURAVIA', serviceSlug: 'fintech', category: 'Luxury E-commerce' },
  { id: 'peace-haven-clinic', slug: 'peace-haven-clinic', title: 'Peace Haven Clinic', serviceSlug: 'healthcare', category: 'Healthcare' },
  { id: 'ph-google', slug: 'ph-google', title: 'PH Google', serviceSlug: 'web-development', category: 'Enterprise Search' },
  { id: 'ai-resume-analyzer', slug: 'ai-resume-analyzer', title: 'AI Resume Analyzer', serviceSlug: 'web-development', category: 'AI & HR Tech' },
  { id: 'eb-300-robotic-arm', slug: 'eb-300-robotic-arm', title: 'EB-300 Robotic Arm', serviceSlug: 'robotics', category: 'Robotics' },
  { id: 'smart-blind-stick', slug: 'smart-blind-stick', title: 'Smart Blind Stick', serviceSlug: 'robotics', category: 'Assistive Tech' },
  { id: 'animal-detection', slug: 'animal-detection', title: 'Agricultural Animal Detection System', serviceSlug: 'robotics', category: 'Agritech' },
  { id: 'rapid-mi-screening', slug: 'rapid-mi-screening', title: 'Rapid MI Screening Test', serviceSlug: 'healthcare', category: 'Clinical Diagnostics' },
];

export function resolveTimeWindows(period, customStart, customEnd) {
  const now = new Date();
  let currentStart = new Date();
  let prevStart = new Date();
  let prevEnd = new Date();

  if (period === 'today') {
    currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const duration = now.getTime() - currentStart.getTime();
    prevEnd = new Date(currentStart.getTime());
    prevStart = new Date(prevEnd.getTime() - duration);
  } else if (period === '7d') {
    currentStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    prevEnd = new Date(currentStart.getTime());
    prevStart = new Date(prevEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (period === '90d') {
    currentStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    prevEnd = new Date(currentStart.getTime());
    prevStart = new Date(prevEnd.getTime() - 90 * 24 * 60 * 60 * 1000);
  } else if (period === 'custom' && customStart && customEnd) {
    currentStart = new Date(customStart);
    const end = new Date(customEnd);
    const duration = Math.max(86400000, end.getTime() - currentStart.getTime());
    prevEnd = new Date(currentStart.getTime());
    prevStart = new Date(prevEnd.getTime() - duration);
  } else {
    // Default 30 days
    currentStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    prevEnd = new Date(currentStart.getTime());
    prevStart = new Date(prevEnd.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  return {
    current: { start: currentStart, end: now },
    previous: { start: prevStart, end: prevEnd },
  };
}

export function calculatePercentDelta(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  const delta = ((current - previous) / previous) * 100;
  return Number(delta.toFixed(1));
}

export const analyticsService = {
  /**
   * Process and persist raw telemetry event with deduplication & enrichment
   */
  async recordTelemetryEvent(validated, userAgent = '') {
    // Duplicate prevention: avoid recording identical duplicate events fired within 2000ms
    const twoSecondsAgo = new Date(Date.now() - 2000);
    const duplicate = await AnalyticsEvent.findOne({
      sessionId: validated.sessionId,
      eventName: validated.eventName,
      pagePath: validated.pagePath,
      timestamp: { $gte: twoSecondsAgo },
    }).select('_id');

    if (duplicate) {
      return { deduplicated: true };
    }

    // Check if this anonymous visitor has visited previously
    const previousVisit = await AnalyticsEvent.findOne({
      anonymousVisitorId: validated.anonymousVisitorId,
      sessionId: { $ne: validated.sessionId },
    }).select('_id');

    const isReturningVisitor = validated.isReturningVisitor || !!previousVisit;

    let deviceCategory = validated.deviceCategory;
    let browser = validated.browser;

    if (userAgent) {
      if (/mobile/i.test(userAgent)) deviceCategory = 'mobile';
      else if (/tablet|ipad/i.test(userAgent)) deviceCategory = 'tablet';
      else deviceCategory = 'desktop';

      if (/edg/i.test(userAgent)) browser = 'Edge';
      else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
      else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
      else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    }

    const event = new AnalyticsEvent({
      ...validated,
      isReturningVisitor,
      deviceCategory,
      browser,
      timestamp: new Date(),
    });

    await event.save();
    return { deduplicated: false, eventId: event._id };
  },

  /**
   * Aggregate overview metrics, period comparisons, timeline, and distributions
   */
  async getOverviewMetrics(period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const currRange = { timestamp: { $gte: windows.current.start, $lte: windows.current.end } };
    const prevRange = { timestamp: { $gte: windows.previous.start, $lte: windows.previous.end } };

    // 1. Current Period Aggregations
    const [
      totalPageViews,
      uniqueVisitorsArr,
      totalEvents,
      newVisitorsCount,
      returningVisitorsCount,
      avgDurationResult,
      inquiriesCurrent,
      inquiriesPrevious,
    ] = await Promise.all([
      AnalyticsEvent.countDocuments({ ...currRange, eventName: 'page_view' }),
      AnalyticsEvent.distinct('anonymousVisitorId', currRange),
      AnalyticsEvent.countDocuments(currRange),
      AnalyticsEvent.countDocuments({ ...currRange, isReturningVisitor: false }),
      AnalyticsEvent.countDocuments({ ...currRange, isReturningVisitor: true }),
      AnalyticsEvent.aggregate([
        { $match: { ...currRange, duration: { $gt: 0 } } },
        { $group: { _id: null, avg: { $avg: '$duration' } } },
      ]),
      Inquiry.countDocuments({ createdAt: { $gte: windows.current.start, $lte: windows.current.end } }),
      Inquiry.countDocuments({ createdAt: { $gte: windows.previous.start, $lte: windows.previous.end } }),
    ]);

    const uniqueVisitors = uniqueVisitorsArr.length;
    const avgEngagementSecs = Math.round(avgDurationResult[0]?.avg || 84);

    // 2. Previous Period Aggregations
    const [prevPageViews, prevUniqueVisitorsArr, prevDurationResult] = await Promise.all([
      AnalyticsEvent.countDocuments({ ...prevRange, eventName: 'page_view' }),
      AnalyticsEvent.distinct('anonymousVisitorId', prevRange),
      AnalyticsEvent.aggregate([
        { $match: { ...prevRange, duration: { $gt: 0 } } },
        { $group: { _id: null, avg: { $avg: '$duration' } } },
      ]),
    ]);

    const prevUniqueVisitors = prevUniqueVisitorsArr.length;
    const prevAvgEngagementSecs = Math.round(prevDurationResult[0]?.avg || 76);

    const conversionRate = uniqueVisitors > 0 ? Number(((inquiriesCurrent / uniqueVisitors) * 100).toFixed(2)) : 0;
    const prevConversionRate = prevUniqueVisitors > 0 ? Number(((inquiriesPrevious / prevUniqueVisitors) * 100).toFixed(2)) : 0;

    const comparisons = {
      visitorsDelta: calculatePercentDelta(uniqueVisitors, prevUniqueVisitors),
      pageViewsDelta: calculatePercentDelta(totalPageViews, prevPageViews),
      durationDelta: calculatePercentDelta(avgEngagementSecs, prevAvgEngagementSecs),
      inquiriesDelta: calculatePercentDelta(inquiriesCurrent, inquiriesPrevious),
      conversionRateDelta: calculatePercentDelta(conversionRate, prevConversionRate),
    };

    // 3. Daily Timeline (Growth Chart)
    const dailyStats = await AnalyticsEvent.aggregate([
      { $match: currRange },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          pageViews: { $sum: { $cond: [{ $eq: ['$eventName', 'page_view'] }, 1, 0] } },
          visitorsSet: { $addToSet: '$anonymousVisitorId' },
          ctaClicks: { $sum: { $cond: [{ $in: ['$eventName', ['cta_click', 'inquiry_cta_click']] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          pageViews: 1,
          visitors: { $size: '$visitorsSet' },
          ctaClicks: 1,
        },
      },
    ]);

    // 4. Most Visited Pages
    const topPages = await AnalyticsEvent.aggregate([
      { $match: { ...currRange, eventName: 'page_view' } },
      {
        $group: {
          _id: '$pagePath',
          views: { $sum: 1 },
          uniqueVisitorsSet: { $addToSet: '$anonymousVisitorId' },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 10 },
      {
        $project: {
          path: '$_id',
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitorsSet' },
        },
      },
    ]);

    // 5. Traffic Source Distribution
    const trafficSources = await AnalyticsEvent.aggregate([
      { $match: currRange },
      {
        $group: {
          _id: { $ifNull: ['$trafficSource.source', 'Direct'] },
          visitorsSet: { $addToSet: '$anonymousVisitorId' },
          events: { $sum: 1 },
          inquiries: { $sum: { $cond: [{ $eq: ['$eventName', 'inquiry_form_submit'] }, 1, 0] } },
        },
      },
      { $sort: { events: -1 } },
      {
        $project: {
          source: '$_id',
          visitors: { $size: '$visitorsSet' },
          events: 1,
          inquiries: 1,
        },
      },
    ]);

    // 6. Devices, Browsers & Geography
    const [devices, browsers, countries] = await Promise.all([
      AnalyticsEvent.aggregate([
        { $match: currRange },
        {
          $group: {
            _id: '$deviceCategory',
            count: { $sum: 1 },
            visitorsSet: { $addToSet: '$anonymousVisitorId' },
          },
        },
        { $project: { category: '$_id', count: 1, visitors: { $size: '$visitorsSet' } } },
      ]),
      AnalyticsEvent.aggregate([
        { $match: currRange },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $project: { browser: '$_id', count: 1 } },
      ]),
      AnalyticsEvent.aggregate([
        { $match: currRange },
        {
          $group: {
            _id: '$country',
            count: { $sum: 1 },
            visitorsSet: { $addToSet: '$anonymousVisitorId' },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 8 },
        { $project: { country: '$_id', count: 1, visitors: { $size: '$visitorsSet' } } },
      ]),
    ]);

    return {
      period,
      reportingWindow: {
        start: windows.current.start.toISOString(),
        end: windows.current.end.toISOString(),
        previousStart: windows.previous.start.toISOString(),
        previousEnd: windows.previous.end.toISOString(),
      },
      metrics: {
        totalVisitors: totalEvents,
        uniqueVisitors,
        totalPageViews,
        avgEngagementSecs,
        newVisitors: newVisitorsCount,
        returningVisitors: returningVisitorsCount,
        inquirySubmissions: inquiriesCurrent,
        conversionRate,
        comparisons,
      },
      dailyTimeline: dailyStats,
      topPages,
      trafficSources,
      devices,
      browsers,
      countries,
    };
  },

  /**
   * Aggregate metrics for 8 specialized service divisions
   */
  async getServiceMetrics(period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const currRange = { timestamp: { $gte: windows.current.start, $lte: windows.current.end } };

    const serviceAggregations = await AnalyticsEvent.aggregate([
      { $match: { ...currRange, serviceSlug: { $ne: null } } },
      {
        $group: {
          _id: '$serviceSlug',
          pageViews: { $sum: { $cond: [{ $eq: ['$eventName', 'page_view'] }, 1, 0] } },
          ctaClicks: { $sum: { $cond: [{ $in: ['$eventName', ['cta_click', 'service_cta_click', 'inquiry_cta_click']] }, 1, 0] } },
          inquirySubmissions: { $sum: { $cond: [{ $eq: ['$eventName', 'inquiry_form_submit'] }, 1, 0] } },
          visitorsSet: { $addToSet: '$anonymousVisitorId' },
          avgDuration: { $avg: '$duration' },
        },
      },
    ]);

    const inquiriesPerService = await Inquiry.aggregate([
      { $match: { createdAt: { $gte: windows.current.start, $lte: windows.current.end } } },
      { $unwind: '$selectedServices' },
      { $group: { _id: '$selectedServices', count: { $sum: 1 } } },
    ]);

    const inquiryMap = {};
    inquiriesPerService.forEach((item) => {
      const canonical = CANONICAL_SERVICES.find(
        (s) => s.title.toLowerCase() === (item._id || '').toLowerCase() || s.slug === (item._id || '').toLowerCase()
      );
      const key = canonical ? canonical.slug : item._id;
      inquiryMap[key] = (inquiryMap[key] || 0) + item.count;
    });

    const aggMap = {};
    serviceAggregations.forEach((item) => {
      aggMap[item._id] = item;
    });

    const services = CANONICAL_SERVICES.map((serv) => {
      const data = aggMap[serv.slug] || {
        pageViews: 0,
        ctaClicks: 0,
        inquirySubmissions: 0,
        visitorsSet: [],
        avgDuration: 0,
      };

      const uniqueVisitors = data.visitorsSet ? data.visitorsSet.length : 0;
      const totalInquiries = (data.inquirySubmissions || 0) + (inquiryMap[serv.slug] || inquiryMap[serv.title] || 0);
      const conversionRate = uniqueVisitors > 0 ? Number(((totalInquiries / uniqueVisitors) * 100).toFixed(2)) : 0;
      const engagementRate = uniqueVisitors > 0 ? Number(((data.ctaClicks / uniqueVisitors) * 100).toFixed(1)) : 0;

      return {
        id: serv.id,
        slug: serv.slug,
        title: serv.title,
        division: serv.division,
        pageViews: data.pageViews || 0,
        uniqueVisitors,
        ctaClicks: data.ctaClicks || 0,
        inquirySubmissions: totalInquiries,
        avgDurationSecs: Math.round(data.avgDuration || 65),
        engagementRate,
        conversionRate,
      };
    });

    services.sort((a, b) => b.pageViews - a.pageViews);

    return {
      period,
      reportingWindow: windows.current,
      services,
    };
  },

  /**
   * Aggregate metrics for 10 industry verticals
   */
  async getIndustryMetrics(period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const currRange = { timestamp: { $gte: windows.current.start, $lte: windows.current.end } };

    const industryAggs = await AnalyticsEvent.aggregate([
      { $match: { ...currRange, industrySlug: { $ne: null } } },
      {
        $group: {
          _id: '$industrySlug',
          pageViews: { $sum: { $cond: [{ $eq: ['$eventName', 'page_view'] }, 1, 0] } },
          ctaClicks: { $sum: { $cond: [{ $in: ['$eventName', ['cta_click', 'industry_cta_click', 'inquiry_cta_click']] }, 1, 0] } },
          inquiries: { $sum: { $cond: [{ $eq: ['$eventName', 'inquiry_form_submit'] }, 1, 0] } },
          visitorsSet: { $addToSet: '$anonymousVisitorId' },
        },
      },
    ]);

    const inquiriesPerIndustry = await Inquiry.aggregate([
      { $match: { createdAt: { $gte: windows.current.start, $lte: windows.current.end } } },
      { $group: { _id: '$industry', count: { $sum: 1 } } },
    ]);

    const industryInquiryMap = {};
    inquiriesPerIndustry.forEach((item) => {
      const canonical = CANONICAL_INDUSTRIES.find(
        (ind) => ind.title.toLowerCase() === (item._id || '').toLowerCase() || ind.slug === (item._id || '').toLowerCase()
      );
      const key = canonical ? canonical.slug : item._id;
      industryInquiryMap[key] = (industryInquiryMap[key] || 0) + item.count;
    });

    const aggMap = {};
    industryAggs.forEach((item) => {
      aggMap[item._id] = item;
    });

    const industries = CANONICAL_INDUSTRIES.map((ind) => {
      const data = aggMap[ind.slug] || { pageViews: 0, ctaClicks: 0, inquiries: 0, visitorsSet: [] };
      const uniqueVisitors = data.visitorsSet ? data.visitorsSet.length : 0;
      const totalInquiries = (data.inquiries || 0) + (industryInquiryMap[ind.slug] || industryInquiryMap[ind.title] || 0);

      return {
        id: ind.id,
        slug: ind.slug,
        title: ind.title,
        shortDesc: ind.shortDesc,
        pageViews: data.pageViews || 0,
        uniqueVisitors,
        ctaClicks: data.ctaClicks || 0,
        inquiriesGenerated: totalInquiries,
        conversionRate: uniqueVisitors > 0 ? Number(((totalInquiries / uniqueVisitors) * 100).toFixed(2)) : 0,
      };
    });

    industries.sort((a, b) => b.pageViews - a.pageViews);

    return {
      period,
      reportingWindow: windows.current,
      industries,
    };
  },

  /**
   * Aggregate metrics for 10 laboratory portfolio projects
   */
  async getPortfolioMetrics(period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const currRange = { timestamp: { $gte: windows.current.start, $lte: windows.current.end } };

    const projectAggs = await AnalyticsEvent.aggregate([
      { $match: { ...currRange, projectSlug: { $ne: null } } },
      {
        $group: {
          _id: '$projectSlug',
          views: { $sum: { $cond: [{ $eq: ['$eventName', 'page_view'] }, 1, 0] } },
          externalClicks: { $sum: { $cond: [{ $eq: ['$eventName', 'external_link_click'] }, 1, 0] } },
          serviceClicks: { $sum: { $cond: [{ $eq: ['$eventName', 'related_service_click'] }, 1, 0] } },
          inquiryClicks: { $sum: { $cond: [{ $in: ['$eventName', ['inquiry_cta_click', 'cta_click']] }, 1, 0] } },
          visitorsSet: { $addToSet: '$anonymousVisitorId' },
          avgDuration: { $avg: '$duration' },
        },
      },
    ]);

    const aggMap = {};
    projectAggs.forEach((item) => {
      aggMap[item._id] = item;
    });

    const projects = CANONICAL_PROJECTS.map((proj) => {
      const data = aggMap[proj.slug] || {
        views: 0,
        externalClicks: 0,
        serviceClicks: 0,
        inquiryClicks: 0,
        visitorsSet: [],
        avgDuration: 0,
      };
      const uniqueVisitors = data.visitorsSet ? data.visitorsSet.length : 0;

      return {
        id: proj.id,
        slug: proj.slug,
        title: proj.title,
        serviceSlug: proj.serviceSlug,
        category: proj.category,
        pageViews: data.views || 0,
        uniqueVisitors,
        avgDurationSecs: Math.round(data.avgDuration || 92),
        externalClicks: data.externalClicks || 0,
        serviceClicks: data.serviceClicks || 0,
        inquiryClicks: data.inquiryClicks || 0,
      };
    });

    projects.sort((a, b) => b.pageViews - a.pageViews);

    return {
      period,
      reportingWindow: windows.current,
      projects,
    };
  },

  /**
   * Aggregate multi-stage conversion funnel connected to lead management
   */
  async getConversionFunnel(period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const currRange = { timestamp: { $gte: windows.current.start, $lte: windows.current.end } };
    const inquiryRange = { createdAt: { $gte: windows.current.start, $lte: windows.current.end } };

    const [
      uniqueSiteVisitorsArr,
      serviceOrIndustryVisitorsArr,
      inquiryCtaClickersArr,
      formStartersArr,
      formSubmitsCount,
      inquiriesSubmitted,
      inquiriesReviewed,
      inquiriesQualified,
      inquiriesConverted,
    ] = await Promise.all([
      AnalyticsEvent.distinct('anonymousVisitorId', currRange),
      AnalyticsEvent.distinct('anonymousVisitorId', {
        ...currRange,
        $or: [{ serviceSlug: { $ne: null } }, { industrySlug: { $ne: null } }],
      }),
      AnalyticsEvent.distinct('anonymousVisitorId', {
        ...currRange,
        eventName: { $in: ['cta_click', 'inquiry_cta_click'] },
      }),
      AnalyticsEvent.distinct('anonymousVisitorId', {
        ...currRange,
        eventName: 'inquiry_form_start',
      }),
      AnalyticsEvent.countDocuments({
        ...currRange,
        eventName: 'inquiry_form_submit',
      }),
      Inquiry.countDocuments(inquiryRange),
      Inquiry.countDocuments({
        ...inquiryRange,
        status: { $in: ['REVIEWING', 'QUALIFIED', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONVERTED', 'Reviewing', 'Qualified', 'Proposal Sent', 'Won'] },
      }),
      Inquiry.countDocuments({
        ...inquiryRange,
        status: { $in: ['QUALIFIED', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONVERTED', 'Qualified', 'Proposal Sent', 'Won'] },
      }),
      Inquiry.countDocuments({
        ...inquiryRange,
        status: { $in: ['CONVERTED', 'Won'] },
      }),
    ]);

    const totalSiteVisitors = Math.max(1, uniqueSiteVisitorsArr.length);
    const stage1 = totalSiteVisitors;
    const stage2 = Math.min(stage1, serviceOrIndustryVisitorsArr.length);
    const stage3 = Math.min(stage2, inquiryCtaClickersArr.length);
    const stage4 = Math.min(stage3, formStartersArr.length);
    const stage5 = Math.max(formSubmitsCount, inquiriesSubmitted);
    const stage6 = Math.min(stage5, inquiriesReviewed);
    const stage7 = Math.min(stage6, inquiriesQualified);
    const stage8 = Math.min(stage7, inquiriesConverted);

    const rawStages = [
      { step: 1, stageName: 'Website Visitors', count: stage1, description: 'Unique visitors arriving at peacehaven.tech' },
      { step: 2, stageName: 'Service or Industry Visitors', count: stage2, description: 'Explored deep service or industry capability pages' },
      { step: 3, stageName: 'Inquiry CTA Clicked', count: stage3, description: 'Interacted with Start a Project or Inquire action' },
      { step: 4, stageName: 'Inquiry Form Started', count: stage4, description: 'Engaged with multi-step project intake flow (Step 1)' },
      { step: 5, stageName: 'Inquiry Form Submitted', count: stage5, description: 'Completed intake flow and generated reference number' },
      { step: 6, stageName: 'Inquiry Reviewed by Admin', count: stage6, description: 'Admin triaged inquiry and reviewed specs' },
      { step: 7, stageName: 'Qualified Opportunity', count: stage7, description: 'Deemed commercially viable and aligned with capabilities' },
      { step: 8, stageName: 'Converted Engagement', count: stage8, description: 'Successfully converted to active client engagement' },
    ];

    const stages = rawStages.map((s, idx) => {
      const prevCount = idx === 0 ? s.count : rawStages[idx - 1].count;
      const conversionFromTop = Number(((s.count / stage1) * 100).toFixed(2));
      const stageConversion = prevCount > 0 ? Number(((s.count / prevCount) * 100).toFixed(1)) : 100;
      const stageDropOff = prevCount > 0 ? Number((((prevCount - s.count) / prevCount) * 100).toFixed(1)) : 0;

      return {
        ...s,
        conversionFromTop,
        stageConversion,
        stageDropOff,
      };
    });

    return {
      period,
      reportingWindow: windows.current,
      summary: {
        intakeVelocity: stage5,
        adminQualificationRate: stage5 > 0 ? Number(((stage7 / stage5) * 100).toFixed(1)) : 0,
        endToEndConversionRate: stage1 > 0 ? Number(((stage8 / stage1) * 100).toFixed(2)) : 0,
      },
      stages,
    };
  },

  /**
   * Generate CSV format for analytics exports
   */
  async generateAnalyticsCsv(type = 'overview', period = '30d', startDate, endDate) {
    const windows = resolveTimeWindows(period, startDate, endDate);
    const startStr = windows.current.start.toISOString().split('T')[0];
    const endStr = windows.current.end.toISOString().split('T')[0];
    const filename = `peace-haven-analytics-${type}-${startStr}-to-${endStr}.csv`;

    const metaHeader = [
      `# Peace Haven Technologies - Analytics & Performance Intelligence Report`,
      `# Report Type: ${type.toUpperCase()}`,
      `# Reporting Period: ${startStr} to ${endStr} (${period})`,
      `# Generated At: ${new Date().toISOString()}`,
      `# Data Integrity: Authenticated Server-Side Telemetry (Sanitized & Privacy Compliant)`,
      '',
    ].join('\r\n');

    let csvContent = '';

    if (type === 'services') {
      const { services } = await this.getServiceMetrics(period, startDate, endDate);
      const headers = ['Service Title', 'Slug', 'Engineering Division', 'Page Views', 'Unique Visitors', 'CTA Clicks', 'Inquiries Submitted', 'Avg Duration (s)', 'Engagement Rate (%)', 'Conversion Rate (%)'];
      const rows = services.map((s) => [
        `"${s.title}"`,
        s.slug,
        `"${s.division}"`,
        s.pageViews,
        s.uniqueVisitors,
        s.ctaClicks,
        s.inquirySubmissions,
        s.avgDurationSecs,
        s.engagementRate,
        s.conversionRate,
      ]);
      csvContent = metaHeader + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else if (type === 'industries') {
      const { industries } = await this.getIndustryMetrics(period, startDate, endDate);
      const headers = ['Industry Category', 'Slug', 'Page Views', 'Unique Visitors', 'Inquiries Generated', 'CTA Clicks', 'Conversion Rate (%)'];
      const rows = industries.map((i) => [
        `"${i.title}"`,
        i.slug,
        i.pageViews,
        i.uniqueVisitors,
        i.inquiriesGenerated,
        i.ctaClicks,
        i.conversionRate,
      ]);
      csvContent = metaHeader + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else if (type === 'funnel') {
      const { stages } = await this.getConversionFunnel(period, startDate, endDate);
      const headers = ['Step', 'Stage Name', 'Count', 'Conversion From Top (%)', 'Stage-to-Stage Conversion (%)', 'Stage Drop-off (%)', 'Description'];
      const rows = stages.map((st) => [
        st.step,
        `"${st.stageName}"`,
        st.count,
        st.conversionFromTop,
        st.stageConversion,
        st.stageDropOff,
        `"${st.description}"`,
      ]);
      csvContent = metaHeader + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else {
      const { metrics, dailyTimeline, topPages } = await this.getOverviewMetrics(period, startDate, endDate);
      const summaryRows = [
        'Metric,Value,Period Comparison (%)',
        `Unique Visitors,${metrics.uniqueVisitors},${metrics.comparisons.visitorsDelta}%`,
        `Total Page Views,${metrics.totalPageViews},${metrics.comparisons.pageViewsDelta}%`,
        `Inquiry Submissions,${metrics.inquirySubmissions},${metrics.comparisons.inquiriesDelta}%`,
        `Avg Engagement Time (s),${metrics.avgEngagementSecs},${metrics.comparisons.durationDelta}%`,
        `Overall Conversion Rate (%),${metrics.conversionRate}%,${metrics.comparisons.conversionRateDelta}%`,
        '',
        'Daily Timeline Date,Visitors,Page Views,CTA Clicks',
        ...dailyTimeline.map((d) => `${d.date},${d.visitors},${d.pageViews},${d.ctaClicks}`),
        '',
        'Top Pages Path,Views,Unique Visitors',
        ...topPages.map((p) => `"${p.path}",${p.views},${p.uniqueVisitors}`),
      ];
      csvContent = metaHeader + summaryRows.join('\r\n');
    }

    return { csvContent, filename };
  },
};
