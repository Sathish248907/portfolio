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

  it('GET /api/v1/projects returns published laboratory prototypes', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((p) => {
      expect(p.isDemonstrationOrPrototype).toBe(true);
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
});
