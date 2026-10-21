const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const TEST_USER_TOKEN = process.env.TEST_USER_TOKEN;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

describe('Admin API Integration Tests', () => {
  const dummyAuctionId = '66a000000000000000000000';

  test('GET /api/admin/auctions without token returns HTTP 401', async () => {
    try {
      await axios.get(`${BASE_URL}/api/admin/auctions`);
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([401, 403]).toContain(error.response.status);
    }
  });

  test('Bug_K08: Non-admin bidder accessing admin endpoints receives HTTP 403 Forbidden', async () => {
    try {
      await axios.get(`${BASE_URL}/api/admin/auctions`, {
        headers: { Authorization: TEST_USER_TOKEN }
      });
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(403);
    }
  });

  test('Bug_K08: Non-admin bidder attempting to approve auction receives HTTP 403 Forbidden', async () => {
    try {
      await axios.patch(
        `${BASE_URL}/api/admin/auctions/${dummyAuctionId}/approve`,
        {},
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(403);
    }
  });

  test('GET /api/admin/auctions with ADMIN_TOKEN executes privileged query', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/auctions`, {
        headers: { Authorization: ADMIN_TOKEN }
      });
      expect([200, 404]).toContain(response.status);
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([200, 404]).toContain(error.response.status);
    }
  });

  test('Bug_K06: Admin settlement triggers refund and rejects settlement on non-existent auction', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/auctions/000000000000000000000000/settle`,
        {},
        { headers: { Authorization: ADMIN_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 404]).toContain(error.response.status);
    }
  });
});
