import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { seedInitialData } from '../src/services/seedService.js';

describe('Peace Haven Backend API Integration Tests', () => {
  let adminToken = '';
  let createdRef = '';

  beforeAll(async () => {
    await connectDB();
    await seedInitialData();
  }, 60000); // 60s timeout for binary download

  afterAll(async () => {
    await disconnectDB();
  });

  it('GET /api/v1/health returns operational status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('operational');
    expect(res.body.service).toContain('Peace Haven');
  });

  it('GET /api/v1/services returns all core engineering services', async () => {
    const res = await request(app).get('/api/v1/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);
  });

  it('GET /api/v1/projects returns published laboratory prototypes and works', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((p) => {
      expect(typeof p.isDemonstrationOrPrototype).toBe('boolean');
    });
  });

  it('POST /api/v1/inquiries rejects invalid input with 400', async () => {
    const res = await request(app)
      .post('/api/v1/inquiries')
      .send({
        service: 'Web Development',
        projectRequirements: 'Too short',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.details).toBeDefined();
  });

  it('POST /api/v1/inquiries creates an inquiry with valid tracking reference', async () => {
    const res = await request(app)
      .post('/api/v1/inquiries')
      .send({
        service: 'Robotics',
        projectRequirements: 'We need an autonomous fleet dispatch system for 15 AMRs operating under VDA 5050 in a warehouse.',
        budgetRange: '$100,000 - $250,000 (Enterprise Infrastructure)',
        timeline: '1 - 3 months',
        clientName: 'Dr. Michael Vance',
        email: 'mvance@apexrobotics.io',
        companyName: 'Apex Robotics Systems',
        phoneNumber: '+1-555-432-1098',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.referenceNumber).toMatch(/^PH-/);
    createdRef = res.body.data.referenceNumber;
  });

  it('POST /api/v1/contact accepts valid message', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({
        name: 'Sarah Connor',
        email: 'sconnor@cyberdyne.org',
        subject: 'Research collaboration in autonomous vision',
        message: 'We are evaluating edge computer vision models for high-speed manufacturing lines.',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/v1/admin/auth/login rejects wrong credentials', async () => {
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({
        email: 'admin@peacehaven.tech',
        password: 'WrongPassword123!',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/admin/auth/login grants JWT with valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({
        email: 'admin@peacehaven.tech',
        password: 'PeaceHavenAdmin2026!',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    adminToken = res.body.data.token;
  });

  it('GET /api/v1/admin/inquiries rejects unauthenticated access with 401', async () => {
    const res = await request(app).get('/api/v1/admin/inquiries');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/admin/inquiries returns inquiries when authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/admin/inquiries')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some((i) => i.referenceNumber === createdRef)).toBe(true);
  });

  it('PATCH /api/v1/admin/inquiries/:id/status updates status and logs audit', async () => {
    const res = await request(app)
      .patch(`/api/v1/admin/inquiries/${createdRef}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'Reviewing',
        notes: 'Assigned to senior robotics lead for Gazebo simulation review.',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('Reviewing');
    expect(res.body.data.notes).toContain('Gazebo simulation');
    expect(res.body.data.auditHistory.length).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/inquiries supports multi-service array and Phase 6 fields', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        clientName: 'Elena Rostova',
        email: 'elena@vanguardfin.com',
        phoneNumber: '+1-555-901-2345',
        companyName: 'Vanguard Global Financials',
        jobTitle: 'VP of Technology',
        country: 'United States',
        selectedServices: ['Web Development', 'FinTech'],
        projectTitle: 'Enterprise Precious Metals Custody Gateway',
        projectDescription: 'A high-throughput FIX-compliant transaction engine connecting vaulted physical bullion inventory with institutional investors.',
        industry: 'Banking & Financial Services',
        projectType: 'Enterprise Modernization',
        deliverables: 'Architecture blueprint, microservices backend, reactive UI',
        preferredTechnology: 'React, Node.js, MongoDB, Docker',
        timeline: '3 - 6 months',
        budgetRange: '$100,000 - $250,000 (Enterprise Infrastructure)',
        startPreference: 'Within 2 weeks',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.referenceNumber).toMatch(/^PH-/);
    expect(res.body.data.selectedServices).toContain('FinTech');
    expect(res.body.data.industry).toBe('Banking & Financial Services');
  });

  it('GET /api/admin/inquiries returns metrics overview and supports search', async () => {
    const res = await request(app)
      .get('/api/admin/inquiries')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.metrics).toBeDefined();
    expect(res.body.metrics.total).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/admin/inquiries/:id/notes adds an internal note with author', async () => {
    const res = await request(app)
      .post(`/api/admin/inquiries/${createdRef}/notes`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        text: 'Initial technical feasibility call scheduled with Dr. Vance.',
        author: 'Lead Architect',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.text).toContain('feasibility call');
  });

  it('GET /api/admin/inquiries/export returns CSV data stream', async () => {
    const res = await request(app)
      .get('/api/admin/inquiries/export')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text).toContain('Reference ID,Submission Date,Client Name');
    expect(res.text).toContain('Apex Robotics Systems');
  });

  it('GET /robots.txt serves crawler directives with sitemap reference', async () => {
    const res = await request(app).get('/robots.txt');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/plain');
    expect(res.text).toContain('Sitemap: https://peacehaven.tech/sitemap.xml');
    expect(res.text).toContain('Disallow: /admin');
  });

  it('GET /sitemap.xml serves valid XML sitemap with priority elements', async () => {
    const res = await request(app).get('/sitemap.xml');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('xml');
    expect(res.text).toContain('https://peacehaven.tech/');
    expect(res.text).toContain('<urlset');
  });

  // ==========================================
  // PHASE 8: ADVANCED ANALYTICS & VISITOR TRACKING
  // ==========================================

  it('POST /api/v1/analytics/events records a valid telemetry interaction', async () => {
    const res = await request(app)
      .post('/api/v1/analytics/events')
      .send({
        eventName: 'page_view',
        pagePath: '/services/web-development',
        eventCategory: 'Page Tracking',
        eventLabel: 'Web Development Division',
        serviceSlug: 'web-development',
        sessionId: 'test_session_101',
        anonymousVisitorId: 'test_anon_vid_999',
        trafficSource: {
          source: 'Google Search',
          medium: 'organic',
          campaign: 'none',
        },
        deviceCategory: 'desktop',
        browser: 'Chrome',
        country: 'United States',
        duration: 45,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.eventId).toBeDefined();
  });

  it('POST /api/v1/analytics/events suppresses duplicate events fired within 2s', async () => {
    const res = await request(app)
      .post('/api/v1/analytics/events')
      .send({
        eventName: 'page_view',
        pagePath: '/services/web-development',
        eventCategory: 'Page Tracking',
        sessionId: 'test_session_101',
        anonymousVisitorId: 'test_anon_vid_999',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('deduplicated');
  });

  it('GET /api/v1/admin/analytics/overview requires authentication', async () => {
    const res = await request(app).get('/api/v1/admin/analytics/overview');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/admin/analytics/overview returns metrics and period comparisons', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/overview?period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.metrics).toBeDefined();
    expect(typeof res.body.metrics.uniqueVisitors).toBe('number');
    expect(typeof res.body.metrics.totalPageViews).toBe('number');
    expect(res.body.metrics.comparisons).toBeDefined();
    expect(Array.isArray(res.body.dailyTimeline)).toBe(true);
    expect(Array.isArray(res.body.trafficSources)).toBe(true);
    expect(Array.isArray(res.body.devices)).toBe(true);
  });

  it('GET /api/v1/admin/analytics/services returns performance for all 6 service divisions', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/services?period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.services)).toBe(true);
    expect(res.body.services.length).toBe(6);

    const slugs = res.body.services.map((s) => s.slug);
    expect(slugs).toContain('web-development');
    expect(slugs).toContain('fintech');
    expect(slugs).toContain('robotics');
    expect(slugs).toContain('drone-technology');
    expect(slugs).toContain('healthcare');
    expect(slugs).toContain('us-staffing');
  });

  it('GET /api/v1/admin/analytics/industries returns engagement for all 10 industries', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/industries?period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.industries)).toBe(true);
    expect(res.body.industries.length).toBe(10);
  });

  it('GET /api/v1/admin/analytics/portfolio returns tracking for all 10 projects', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/portfolio?period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.projects)).toBe(true);
    expect(res.body.projects.length).toBe(10);

    const slugs = res.body.projects.map((p) => p.slug);
    expect(slugs).toContain('ph-homes');
    expect(slugs).toContain('grow-capital');
    expect(slugs).toContain('auravia');
    expect(slugs).toContain('eb-300-robotic-arm');
  });

  it('GET /api/v1/admin/analytics/funnel returns the 8-stage inquiry conversion funnel', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/funnel?period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.stages)).toBe(true);
    expect(res.body.stages.length).toBe(8);

    expect(res.body.stages[0].stageName).toBe('Website Visitors');
    expect(res.body.stages[1].stageName).toBe('Service or Industry Visitors');
    expect(res.body.stages[2].stageName).toBe('Inquiry CTA Clicked');
    expect(res.body.stages[3].stageName).toBe('Inquiry Form Started');
    expect(res.body.stages[4].stageName).toBe('Inquiry Form Submitted');
    expect(res.body.stages[5].stageName).toBe('Inquiry Reviewed by Admin');
    expect(res.body.stages[6].stageName).toBe('Qualified Opportunity');
    expect(res.body.stages[7].stageName).toBe('Converted Engagement');

    res.body.stages.forEach((st) => {
      expect(typeof st.count).toBe('number');
      expect(typeof st.conversionFromTop).toBe('number');
      expect(typeof st.stageDropOff).toBe('number');
    });
  });

  it('GET /api/v1/admin/analytics/export returns CSV report with reporting period header', async () => {
    const res = await request(app)
      .get('/api/v1/admin/analytics/export?type=services&period=30d')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text).toContain('# Peace Haven Technologies - Analytics & Performance Intelligence Report');
    expect(res.text).toContain('Web Development');
    expect(res.text).toContain('FinTech');
  });

  // ==========================================
  // PHASE 9: CONTENT MANAGEMENT SYSTEM (CMS)
  // ==========================================

  it('GET /api/v1/insights returns published articles with pagination', async () => {
    const res = await request(app).get('/api/v1/insights');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.pagination).toBeDefined();

    res.body.data.forEach((article) => {
      expect(article.status).toBe('published');
      expect(article.slug).toBeDefined();
    });
  });

  it('GET /api/v1/insights/:slug returns single published article', async () => {
    const res = await request(app).get('/api/v1/insights/autonomous-edge-ai-robotics-vda5050');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toContain('Autonomous Edge AI');
    expect(res.body.data.category).toBe('Robotics & Automation');
  });

  it('GET /api/v1/admin/cms/overview requires authentication', async () => {
    const res = await request(app).get('/api/v1/admin/cms/overview');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/admin/cms/overview returns dashboard counts and activity', async () => {
    const res = await request(app)
      .get('/api/v1/admin/cms/overview')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.metrics).toBeDefined();
    expect(res.body.data.metrics.publishedPages).toBeGreaterThanOrEqual(1);
    expect(res.body.data.metrics.publishedBlogs).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(res.body.data.recentActivity)).toBe(true);
    expect(Array.isArray(res.body.data.recentlyUpdated)).toBe(true);
  });

  it('GET /api/v1/admin/cms/pages lists all website pages', async () => {
    const res = await request(app)
      .get('/api/v1/admin/cms/pages')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    const pageIds = res.body.data.map((p) => p.pageId);
    expect(pageIds).toContain('home');
    expect(pageIds).toContain('about');
    expect(pageIds).toContain('services');
  });

  it('PUT /api/v1/admin/cms/pages/:idOrSlug updates page content and creates revision', async () => {
    const res = await request(app)
      .put('/api/v1/admin/cms/pages/about')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'About Peace Haven | Engineering Ideas & Scalable Systems',
        description: 'Updated firm summary through CMS editor test.',
        status: 'published',
        hero: {
          headline: 'Engineering Beyond Boundaries.',
          subheadline: 'Architecting mission-critical platforms with utmost precision.',
          ctaText: 'Meet Our Leadership',
          ctaLink: '#leadership',
        },
        sections: [
          { id: 'sec-mission', type: 'content', title: 'Our Engineering Mission', isVisible: true, order: 1 },
        ],
        changeSummary: 'Updated header text and mission section',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toContain('Scalable Systems');
  });

  it('POST /api/v1/admin/cms/blog creates draft article with slug validation', async () => {
    const res = await request(app)
      .post('/api/v1/admin/cms/blog')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Quantum Key Distribution in FinTech High-Frequency Pipelines',
        slug: 'quantum-key-distribution-fintech',
        subtitle: 'Securing sub-millisecond financial transfers against post-quantum decryption threats.',
        excerpt: 'An architectural exploration of integrating quantum key distribution layers into real-time bullion order books.',
        content: '<p>Quantum computing introduces profound cryptographic shifts...</p>',
        category: 'FinTech',
        tags: ['FinTech', 'Quantum', 'Cryptography'],
        status: 'draft',
        author: {
          name: 'Chief Cryptographer',
          role: 'Security Fellow',
          avatar: '/favicon.svg',
        },
        readTime: '4 min read',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe('quantum-key-distribution-fintech');
    expect(res.body.data.status).toBe('draft');
  });

  it('Draft articles are hidden from public GET /api/v1/insights', async () => {
    const res = await request(app).get('/api/v1/insights');
    const slugs = res.body.data.map((a) => a.slug);
    expect(slugs).not.toContain('quantum-key-distribution-fintech');
  });

  it('POST /api/v1/admin/cms/media registers an asset with file size and type validation', async () => {
    const res = await request(app)
      .post('/api/v1/admin/cms/media')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'EB-300 Robotic Arm CAD Diagram',
        fileName: 'eb300-schematic-blueprint.png',
        url: '/images/projects/eb-300-robotic-arm/eb-300-blueprint.png',
        fileType: 'image/png',
        fileSize: 1048576, // 1MB
        category: 'Projects',
        altText: 'Technical exploded diagram of the 6-DOF robotic manipulator arm.',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.fileName).toBe('eb300-schematic-blueprint.png');
  });

  it('GET /api/v1/admin/cms/activity returns audit history of CMS actions', async () => {
    const res = await request(app)
      .get('/api/v1/admin/cms/activity')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
});
