import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import { Inquiry } from '../src/models/Inquiry.js';
import { AdminUser } from '../src/models/AdminUser.js';
import { seedInitialData } from '../src/services/seedService.js';

let mongoServer;
let authToken = '';
let seededSuperAdmin = null;
let testInquiryRef = '';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await seedInitialData();

  // Log in as Super Admin
  const loginRes = await request(app)
    .post('/api/v1/admin/auth/login')
    .send({
      email: 'admin@peacehaven.tech',
      password: 'PeaceHavenAdmin2026!',
    });

  expect(loginRes.status).toBe(200);
  authToken = loginRes.body.data?.token || loginRes.body.token;
  seededSuperAdmin = loginRes.body.data?.user || loginRes.body.user;
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('Project Engagement Form & Client Communication Backend APIs', () => {
  describe('1. Five-Step Form Intake Integration', () => {
    it('accepts comprehensive 5-step intake payload and generates unique reference', async () => {
      const payload = {
        clientName: 'Dr. Jennifer Martinez',
        email: 'jmartinez@quantumhealth.org',
        companyName: 'Quantum Health Interop',
        jobTitle: 'Chief Medical Information Officer',
        country: 'United States',
        phoneNumber: '+1-555-829-4412',
        selectedServices: ['Healthcare Solutions', 'Web Development'],
        projectTitle: 'SMART on FHIR Patient Interoperability Gateway',
        projectOverview: 'Building an enterprise FHIR API gateway connecting clinic EHRs with telemetry diagnostics.',
        detailedRequirements: 'Bi-directional HL7 v2 and FHIR R4 translation, OAuth 2.0 PKCE authentication, and real-time dashboard.',
        projectObjectives: 'Enable seamless cross-institutional medical record sharing with zero PHI leaks.',
        requiredFeatures: 'Audit trail logging, HIPAA encryption at rest, and webhook delivery to clinic portals.',
        deliverables: 'FHIR translation engine, React dashboard, microservices, and compliance audit bundle.',
        technicalRequirements: 'Node.js, TypeScript, PostgreSQL, SMART on FHIR, Docker.',
        industry: 'Healthcare & Medical Technology',
        projectType: 'New Platform / MVP Build',
        budgetRange: '$100,000 - $250,000 (Enterprise Infrastructure)',
        budgetCurrency: 'USD',
        customBudget: '$150,000 Target Sprints',
        timeline: '3 - 6 months',
        startPreference: 'Within 2 weeks',
        urgency: 'High',
        preferredContactMethod: 'Video Meeting',
        additionalRequirements: 'Requires mutual BAA and SOC 2 Type II compliance verification.',
        attachments: [
          { fileName: 'clinical_spec_v2.pdf', fileSize: 409600, fileType: 'application/pdf' },
        ],
      };

      const res = await request(app)
        .post('/api/v1/inquiries')
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceNumber).toMatch(/^PH-[A-Z0-9]+-\d{4}$/);
      expect(res.body.data.clientName).toBe('Dr. Jennifer Martinez');
      expect(res.body.data.urgency).toBe('High');
      expect(res.body.data.preferredContactMethod).toBe('Video Meeting');
      expect(res.body.data.status).toBe('NEW');
      expect(res.body.data.communicationHistory).toHaveLength(1);
      expect(res.body.data.communicationHistory[0].type).toBe('email_sent');
      expect(res.body.data.communicationHistory[0].templateSlug).toBe('client_inquiry_confirmation');

      testInquiryRef = res.body.data.referenceNumber;
    });

    it('rejects submissions missing required company or contact info', async () => {
      const res = await request(app)
        .post('/api/v1/inquiries')
        .send({
          clientName: 'Incomplete User',
          email: 'invalid-format',
          // missing companyName, budgetRange, timeline
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('2. Admin Inquiry Dashboard & Metrics Integration', () => {
    it('returns inquiries list with comprehensive status metrics', async () => {
      const res = await request(app)
        .get('/api/v1/admin/inquiries')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.metrics).toHaveProperty('total');
      expect(res.body.metrics).toHaveProperty('new');
      expect(res.body.metrics).toHaveProperty('underReview');
      expect(res.body.metrics).toHaveProperty('inDiscussion');
      expect(res.body.metrics.total).toBeGreaterThanOrEqual(1);
    });

    it('retrieves complete inquiry details by reference number', async () => {
      const res = await request(app)
        .get(`/api/v1/admin/inquiries/${testInquiryRef}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceNumber).toBe(testInquiryRef);
      expect(res.body.data.clientName).toBe('Dr. Jennifer Martinez');
      expect(res.body.data.companyName).toBe('Quantum Health Interop');
      expect(res.body.data.projectTitle).toBe('SMART on FHIR Patient Interoperability Gateway');
      expect(res.body.data.budgetCurrency).toBe('USD');
    });

    it('updates priority tier and records audit trail', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/inquiries/${testInquiryRef}/priority`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ priority: 'urgent' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.priority).toBe('urgent');
    });

    it('updates status and records previous/new status in audit history', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/inquiries/${testInquiryRef}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'UNDER_REVIEW',
          notes: 'Architect assigned to evaluate FHIR interoperability schema.',
          assignedTo: {
            name: 'Sarah Vance',
            email: 'svance@peacehaven.tech',
            role: 'Healthcare Systems Architect',
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('UNDER_REVIEW');
      expect(res.body.data.assignedTo.name).toBe('Sarah Vance');
    });
  });

  describe('3. Client Email Communication & Response Workflow', () => {
    it('returns the 11 client communication email templates', async () => {
      const res = await request(app)
        .get('/api/v1/admin/inquiries/communication/templates')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(11);
      const slugs = res.body.data.map((t) => t.slug);
      expect(slugs).toContain('inquiry_acknowledgment');
      expect(slugs).toContain('thank_you_requirements');
      expect(slugs).toContain('request_additional_info');
      expect(slugs).toContain('schedule_discussion');
      expect(slugs).toContain('project_proposal');
      expect(slugs).toContain('inquiry_accepted');
      expect(slugs).toContain('inquiry_closed');
    });

    it('dispatches client response email and maintains communication history', async () => {
      const responsePayload = {
        recipientEmail: 'jmartinez@quantumhealth.org',
        subject: `Re: Project Engagement – ${testInquiryRef}: Discovery Session Invitation`,
        message: 'Dear Dr. Martinez,\n\nOur healthcare systems architects have completed the initial assessment of your SMART on FHIR requirements. We would like to schedule a 30-minute discovery call this Thursday to discuss the FHIR translation engine architecture.\n\nBest regards,\nSarah Vance\nPeace Haven Technologies',
        templateSlug: 'schedule_discussion',
        attachments: [
          { fileName: 'peace_haven_fhir_overview.pdf', fileSize: 102400 },
        ],
      };

      const res = await request(app)
        .post(`/api/v1/admin/inquiries/${testInquiryRef}/communication/email`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(responsePayload);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.subject).toBe(responsePayload.subject);
      expect(res.body.data.recipient).toBe('jmartinez@quantumhealth.org');
      expect(res.body.data.deliveryStatus).toBe('sent');
      expect(res.body.inquiry.communicationHistory.length).toBeGreaterThanOrEqual(2);
      expect(res.body.inquiry.lastCommunicatedAt).toBeTruthy();
    });

    it('retrieves chronological communication history for the inquiry', async () => {
      const res = await request(app)
        .get(`/api/v1/admin/inquiries/${testInquiryRef}/communication`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceNumber).toBe(testInquiryRef);
      expect(res.body.data.history.length).toBeGreaterThanOrEqual(2);
      const latestMessage = res.body.data.history[res.body.data.history.length - 1];
      expect(latestMessage.subject).toContain('Discovery Session Invitation');
      expect(latestMessage.direction).toBe('outbound');
    });

    it('rejects sending client email with invalid recipient or empty body', async () => {
      const res = await request(app)
        .post(`/api/v1/admin/inquiries/${testInquiryRef}/communication/email`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recipientEmail: 'not-an-email',
          subject: 'Hi',
          message: 'too short',
        });

      expect(res.status).toBe(400);
    });
  });
});
