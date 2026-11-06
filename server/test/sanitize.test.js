import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../src/middleware/sanitize.js';

describe('Sanitize Middleware - NoSQL Injection Protection', () => {
  it('strips keys starting with $ from req.body', () => {
    const req = {
      body: {
        username: 'admin',
        password: { $ne: null },
        filter: { $gt: 10, validKey: 'value' },
      },
    };
    const res = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    sanitizeInput(req, res, next);

    expect(nextCalled).toBe(true);
    expect(req.body.username).toBe('admin');
    expect(req.body.password).toEqual({});
    expect(req.body.filter).toEqual({ validKey: 'value' });
    expect(req.body.filter.$gt).toBeUndefined();
  });

  it('strips keys containing dot notation from req.query and req.params', () => {
    const req = {
      query: {
        'user.role': 'superadmin',
        search: 'fintech',
      },
      params: {
        'id.sub': '123',
        id: 'valid-id',
      },
    };
    const res = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    sanitizeInput(req, res, next);

    expect(nextCalled).toBe(true);
    expect(req.query.search).toBe('fintech');
    expect(req.query['user.role']).toBeUndefined();
    expect(req.params.id).toBe('valid-id');
    expect(req.params['id.sub']).toBeUndefined();
  });

  it('safely handles null, undefined, arrays, and primitive fields without error', () => {
    const req = {
      body: {
        tags: ['web', 'fintech', { $dangerous: 'drop' }],
        count: 42,
        isActive: true,
        notes: null,
      },
    };
    const res = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    sanitizeInput(req, res, next);

    expect(nextCalled).toBe(true);
    expect(req.body.tags[0]).toBe('web');
    expect(req.body.tags[1]).toBe('fintech');
    expect(req.body.tags[2]).toEqual({});
    expect(req.body.count).toBe(42);
    expect(req.body.isActive).toBe(true);
    expect(req.body.notes).toBeNull();
  });
});
