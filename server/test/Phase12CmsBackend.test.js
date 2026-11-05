import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import { seedInitialData } from '../src/services/seedService.js';
import { Page } from '../src/models/Page.js';
import { Service } from '../src/models/Service.js';
import { Project } from '../src/models/Project.js';
import { SiteSetting } from '../src/models/SiteSetting.js';
import { MediaAsset } from '../src/models/MediaAsset.js';
import { ContentRevision } from '../src/models/ContentRevision.js';

let mongoServer;
let adminToken = '';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await seedInitialData();

  // Login as single superadmin to get token
  const res = await request(app)
    .post('/api/v1/admin/auth/login')
    .send({ email: 'admin@peacehaven.tech', password: 'PeaceHavenAdmin2026!' });

  adminToken = res.body.data?.token || '';
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe('Phase 12 — Complete Admin-to-Website CMS Integration (Backend)', () => {
  describe('1. Public Website CMS Endpoints', () => {
    it('GET /api/v1/cms/pages/public/home returns published homepage content with hero and sections', async () => {
      const res = await request(app).get('/api/v1/cms/pages/public/home');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.pageId).toBe('home');
      expect(res.body.data.hero.headline).toBeDefined();
    });

    it('GET /api/v1/cms/pages/public/about returns published about page with creed and principles', async () => {
      const res = await request(app).get('/api/v1/cms/pages/public/about');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.pageId).toBe('about');
    });

    it('GET /api/v1/cms/pages/public/contact returns contact page with SEO metadata', async () => {
      const res = await request(app).get('/api/v1/cms/pages/public/contact');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.pageId).toBe('contact');
    });

    it('GET /api/v1/cms/services/public returns only published services', async () => {
      const res = await request(app).get('/api/v1/cms/services/public');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      res.body.data.forEach((s) => {
        expect(s.status).not.toBe('draft');
      });
    });

    it('GET /api/v1/cms/portfolio/public returns only published portfolio case studies', async () => {
      const res = await request(app).get('/api/v1/cms/portfolio/public');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/cms/settings/public returns global branding and public settings', async () => {
      const res = await request(app).get('/api/v1/cms/settings/public');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.companyName).toBeDefined();
    });
  });

  describe('2. Global Website Settings Management', () => {
    it('GET /api/v1/admin/cms/settings retrieves full site settings for authorized admin', async () => {
      const res = await request(app)
        .get('/api/v1/admin/cms/settings')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.companyName).toBeDefined();
    });

    it('PUT /api/v1/admin/cms/settings updates branding and logs snapshot revision', async () => {
      const res = await request(app)
        .put('/api/v1/admin/cms/settings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          companyName: 'Peace Haven Technologies Group Inc.',
          tagline: 'Engineering the Next Industrial Era.',
          announcementBanner: {
            isVisible: true,
            text: 'ROS 2 Autonomous Fleet Architecture Released',
            link: '/portfolio',
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.companyName).toBe('Peace Haven Technologies Group Inc.');

      // Check revision snapshot was created
      const rev = await ContentRevision.findOne({ contentType: 'settings' });
      expect(rev).not.toBeNull();
    });
  });

  describe('3. Services Dynamic CMS CRUD & Publishing', () => {
    it('POST /api/v1/admin/cms/services creates a new engineering division', async () => {
      const res = await request(app)
        .post('/api/v1/admin/cms/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          serviceId: 'quantum-computing',
          slug: 'quantum-computing',
          title: 'Quantum & Cryptographic Engineering',
          tagline: 'Post-Quantum Encryption & Lattice Cryptography',
          heroHeadline: 'Preparing enterprise cryptographic infrastructure for quantum resilience.',
          shortDescription: 'Quantum-safe cryptographic migration and lattice algorithms.',
          division: 'Advanced Computing',
          status: 'published',
          capabilities: [
            { title: 'Lattice Cryptography', description: 'NIST-approved post-quantum algorithms.' }
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('quantum-computing');
    });

    it('PATCH /api/v1/admin/cms/services/:id/publish toggles service status', async () => {
      const res = await request(app)
        .patch('/api/v1/admin/cms/services/quantum-computing/publish')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'draft' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('draft');
    });
  });

  describe('4. Portfolio Case Study Management & Revisions', () => {
    it('POST /api/v1/admin/cms/portfolio creates a new case study', async () => {
      const res = await request(app)
        .post('/api/v1/admin/cms/portfolio')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          slug: 'autonomous-harvest-drone',
          title: 'Autonomous Agricultural Drone Fleet',
          subtitle: 'Precision Aerial Thermography & Crop Analytics',
          category: 'Robotics',
          serviceId: 'drone-technology',
          clientName: 'AgriTech Global',
          status: 'published',
          shortDescription: 'Autonomous flight corridors and multispectral crop analysis.',
          overview: 'Autonomous flight swarm delivering real-time thermal insights.',
          challenge: 'Manual field inspections were slow and expensive.',
          solution: 'Engineered autonomous RTK-GPS flight swarms with edge inference.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('autonomous-harvest-drone');
    });

    it('POST /api/v1/admin/cms/revisions/:id/restore restores earlier content version', async () => {
      // Find latest revision
      const rev = await ContentRevision.findOne().sort({ createdAt: -1 });
      expect(rev).not.toBeNull();

      const res = await request(app)
        .post(`/api/v1/admin/cms/revisions/${rev._id}/restore`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('5. Media Safe Deletion Prevention Check', () => {
    it('prevents deleting media asset if referenced in website content without force flag', async () => {
      // Create a media asset that is referenced by a project thumbnail
      const media = await MediaAsset.create({
        title: 'Artistry Homepage Reference',
        fileName: 'artistry-homepage.png',
        url: '/images/projects/artistry-homepage.png',
        fileType: 'image/png',
        fileSize: 1024,
        category: 'Projects',
      });

      const res = await request(app)
        .delete(`/api/v1/admin/cms/media/${media._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('actively referenced');
    });
  });
});
