import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import { seedInitialData } from '../src/services/seedService.js';
import { AdminUser } from '../src/models/AdminUser.js';
import { Role } from '../src/models/Role.js';
import { AuditLog } from '../src/models/AuditLog.js';

let mongoServer;
let superadminToken = '';
let salesToken = '';
let editorToken = '';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await seedInitialData();

  // Login as superadmin
  const superRes = await request(app)
    .post('/api/v1/admin/auth/login')
    .send({ email: 'admin@peacehaven.tech', password: 'PeaceHavenAdmin2026!' });
  superadminToken = superRes.body.data.token;

  // Login as sales manager
  const salesRes = await request(app)
    .post('/api/v1/admin/auth/login')
    .send({ email: 'david.okafor@peacehaven.tech', password: 'Password123!' });
  salesToken = salesRes.body.data.token;

  // Login as editor
  const editorRes = await request(app)
    .post('/api/v1/admin/auth/login')
    .send({ email: 'marcus.chen@peacehaven.tech', password: 'Password123!' });
  editorToken = editorRes.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Phase 10 — RBAC, User Management, Audit Logs & Session Security', () => {
  describe('1. RBAC Hierarchy & Permissions Guard', () => {
    it('Super Admin can access dashboard stats, users, roles, invitations, and audit logs', async () => {
      const statsRes = await request(app)
        .get('/api/v1/admin/dashboard-stats')
        .set('Authorization', `Bearer ${superadminToken}`);
      expect(statsRes.status).toBe(200);
      expect(statsRes.body.success).toBe(true);
      expect(statsRes.body.data.metrics.totalUsers).toBeGreaterThanOrEqual(5);

      const usersRes = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${superadminToken}`);
      expect(usersRes.status).toBe(200);
      expect(usersRes.body.data.length).toBeGreaterThanOrEqual(5);

      const rolesRes = await request(app)
        .get('/api/v1/admin/roles')
        .set('Authorization', `Bearer ${superadminToken}`);
      expect(rolesRes.status).toBe(200);
      expect(rolesRes.body.data.roles.length).toBe(7);
    });

    it('Sales Manager has access to inquiries but is forbidden from user management', async () => {
      // Inquiries view allowed
      const inqRes = await request(app)
        .get('/api/v1/admin/inquiries')
        .set('Authorization', `Bearer ${salesToken}`);
      expect(inqRes.status).toBe(200);

      // User management forbidden
      const usersRes = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${salesToken}`);
      expect(usersRes.status).toBe(403);
      expect(usersRes.body.error).toMatch(/Forbidden/i);
    });

    it('Editor cannot access roles management or audit logs', async () => {
      const rolesRes = await request(app)
        .get('/api/v1/admin/roles')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(rolesRes.status).toBe(403);

      const logsRes = await request(app)
        .get('/api/v1/admin/audit-logs')
        .set('Authorization', `Bearer ${editorToken}`);
      expect(logsRes.status).toBe(403);
    });
  });

  describe('2. User Management & Protection of Last Super Admin', () => {
    let createdUserId = '';

    it('Super Admin can create a new admin user', async () => {
      const res = await request(app)
        .post('/api/v1/admin/users')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          name: 'Lucas Wright',
          email: 'lucas.wright@peacehaven.tech',
          password: 'Password123!',
          role: 'editor',
          status: 'active',
        });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('lucas.wright@peacehaven.tech');
      createdUserId = res.body.data.id;
    });

    it('Super Admin can update user role and status', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/users/${createdUserId}`)
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          role: 'marketing_manager',
          status: 'active',
        });
      expect(res.status).toBe(200);
      expect(res.body.data.role).toBe('marketing_manager');
    });

    it('prevents deactivating or removing the last active Super Admin', async () => {
      const superAdminUser = await AdminUser.findOne({ email: 'admin@peacehaven.tech' });
      expect(superAdminUser).toBeDefined();

      const res = await request(app)
        .patch(`/api/v1/admin/users/${superAdminUser._id}/status`)
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({ status: 'suspended' });

      // Either rejected because self-modification or because last superadmin
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.error).toMatch(/cannot/i);
    });
  });

  describe('3. Invitation Workflow', () => {
    let inviteToken = '';
    let inviteId = '';

    it('creates an admin invitation and generates secure expiration token', async () => {
      const res = await request(app)
        .post('/api/v1/admin/invitations')
        .set('Authorization', `Bearer ${superadminToken}`)
        .send({
          email: 'dev.lead@peacehaven.tech',
          name: 'Dev Lead',
          role: 'content_manager',
        });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('dev.lead@peacehaven.tech');
      inviteId = res.body.data.id;

      const invitation = await mongoose.model('AdminInvitation').findById(inviteId);
      inviteToken = invitation.token;
      expect(inviteToken).toBeTruthy();
    });

    it('allows public verification of valid invitation token', async () => {
      const res = await request(app).get(`/api/v1/admin/invitations/verify/${inviteToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('dev.lead@peacehaven.tech');
      expect(res.body.data.role).toBe('content_manager');
    });

    it('accepts invitation, creates/activates user, and rejects token reuse', async () => {
      const acceptRes = await request(app)
        .post('/api/v1/admin/invitations/accept')
        .send({
          token: inviteToken,
          password: 'NewSecurePassword2026!',
          name: 'Dev Lead Person',
        });
      expect(acceptRes.status).toBe(200);
      expect(acceptRes.body.success).toBe(true);

      // Verify user can now log in
      const loginRes = await request(app)
        .post('/api/v1/admin/auth/login')
        .send({
          email: 'dev.lead@peacehaven.tech',
          password: 'NewSecurePassword2026!',
        });
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.data.user.role).toBe('content_manager');

      // Reusing token must fail
      const reuseRes = await request(app)
        .post('/api/v1/admin/invitations/accept')
        .send({
          token: inviteToken,
          password: 'AnotherPassword123!',
        });
      expect(reuseRes.status).toBe(400);
    });
  });

  describe('4. Account Lockout & Security Events', () => {
    it('locks account after 5 consecutive failed login attempts', async () => {
      const testEmail = 'david.okafor@peacehaven.tech';

      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/v1/admin/auth/login')
          .send({ email: testEmail, password: 'WrongPasswordAttempt!' });
      }

      // 6th attempt should be blocked due to account lock
      const blockedRes = await request(app)
        .post('/api/v1/admin/auth/login')
        .send({ email: testEmail, password: 'WrongPasswordAttempt!' });
      expect(blockedRes.status).toBe(403);
      expect(blockedRes.body.error).toMatch(/temporarily locked/i);
    });
  });

  describe('5. Audit Logs & CSV Export', () => {
    it('records administrative actions into append-only AuditLog collection', async () => {
      const logs = await AuditLog.find().sort({ timestamp: -1 });
      expect(logs.length).toBeGreaterThan(0);

      const res = await request(app)
        .get('/api/v1/admin/audit-logs')
        .set('Authorization', `Bearer ${superadminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('exports audit logs as CSV', async () => {
      const res = await request(app)
        .get('/api/v1/admin/audit-logs/export')
        .set('Authorization', `Bearer ${superadminToken}`);
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/text\/csv/);
      expect(res.text).toContain('Timestamp,Actor Name,Actor Email,Action,Module,Result,IP Address,Summary');
    });
  });
});
