import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

describe('GET /api/images', () => {
  it('should return 200 with valid params', async () => {
    const rest = await request.get(
      '/api/images?filename=boy.jpg&width=100&height=100',
    );
    expect(rest.status).toBe(200);
  });

  it('should return 400 for missing params', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(400);
  });
});
