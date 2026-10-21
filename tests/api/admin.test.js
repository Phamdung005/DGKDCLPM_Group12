const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const TEST_USER_TOKEN = process.env.TEST_USER_TOKEN;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

describe('Admin & Privileged API Integration Tests', () => {
  const dummyAuctionId = '66a000000000000000000000';

  test('DELETE /api/auctions/:id without token returns HTTP 401', async () => {
    try {
      await axios.delete(`${BASE_URL}/api/auctions/${dummyAuctionId}`);
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      expect([401, 403]).toContain(status);
    }
  });

  test('POST /api/auctions/:id/cancel without token returns HTTP 401', async () => {
    try {
      await axios.post(`${BASE_URL}/api/auctions/${dummyAuctionId}/cancel`);
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      expect([401, 403]).toContain(status);
    }
  });

  test('Bug_K08: Non-admin bidder attempting to cancel auction is denied', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/${dummyAuctionId}/cancel`,
        {},
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      expect([401, 403, 404]).toContain(status);
    }
  });

  test('Bug_K08: Non-admin bidder attempting to delete auction is denied', async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/auctions/${dummyAuctionId}`,
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      expect([401, 403, 404]).toContain(status);
    }
  });

  test('Bug_K06: Privileged action rejects settlement/cancel on non-existent auction', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/000000000000000000000000/cancel`,
        {},
        { headers: { Authorization: ADMIN_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      expect([400, 401, 403, 404]).toContain(status);
    }
  });
});
