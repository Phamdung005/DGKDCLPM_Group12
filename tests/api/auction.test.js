const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

describe('Auction API Integration Tests', () => {
  let existingAuctionId = '';

  test('GET /api/auctions returns HTTP 200 and list of auctions', async () => {
    const response = await axios.get(`${BASE_URL}/api/auctions`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();

    const auctions = Array.isArray(response.data) ? response.data : (response.data.data || response.data.auctions || []);
    if (auctions.length > 0) {
      existingAuctionId = auctions[0]._id || auctions[0].id;
    }
  });

  test('Bug_K09: GET /api/auctions/:id with malformed identifier returns HTTP 400 instead of 500 crash', async () => {
    try {
      await axios.get(`${BASE_URL}/api/auctions/invalid_mongo_object_id_9999`);
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 404]).toContain(error.response.status);
      expect(error.response.status).not.toBe(500);
    }
  });

  test('GET /api/auctions/:id with existing identifier returns HTTP 200', async () => {
    if (!existingAuctionId) {
      return;
    }
    const response = await axios.get(`${BASE_URL}/api/auctions/${existingAuctionId}`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  test('POST /api/auctions without authorization token returns HTTP 401', async () => {
    try {
      await axios.post(`${BASE_URL}/api/auctions`, {
        title: 'MacBook Pro M3 Max',
        startingPrice: 35000000,
        stepPrice: 500000
      });
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(401);
    }
  });
});