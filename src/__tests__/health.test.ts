import request from 'supertest';
import { app } from '../core/app.js';

describe('Health', () => {
  it('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.up).toBe(true);
  });
});
