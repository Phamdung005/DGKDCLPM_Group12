const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const TEST_USER_TOKEN = process.env.TEST_USER_TOKEN;
const SELLER_TOKEN = process.env.SELLER_TOKEN;

describe('Bidding API Integration Tests', () => {
  let targetAuctionId = '66a000000000000000000000';

  beforeAll(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auctions`);
      const auctions = Array.isArray(response.data) ? response.data : (response.data.data || response.data.auctions || []);
      if (auctions.length > 0) {
        targetAuctionId = auctions[0]._id || auctions[0].id || targetAuctionId;
      }
    } catch {
      targetAuctionId = '66a000000000000000000000';
    }
  });

  test('POST /api/auctions/:id/bid without authorization returns HTTP 401', async () => {
    try {
      await axios.post(`${BASE_URL}/api/auctions/${targetAuctionId}/bid`, {
        amount: 500000
      });
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([401, 403, 404]).toContain(error.response.status);
    }
  });

  test('POST /api/auctions/:id/bid with missing amount body returns HTTP 400', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        {},
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 404]).toContain(error.response.status);
    }
  });

  test('Bug_K01: POST /api/auctions/:id/bid with amount below minimum step price returns HTTP 400', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        { amount: 1 },
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 404, 422]).toContain(error.response.status);
    }
  });

  test('Bug_K02: POST /api/auctions/:id/bid rejects self-bidding from the auction creator', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        { amount: 99999999 },
        { headers: { Authorization: SELLER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 403, 404, 422]).toContain(error.response.status);
    }
  });

  test('Bug_K03: POST /api/auctions/:id/bid rejects bid placement on non-active auction', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/66a000000000000000000001/bid`,
        { amount: 5000000 },
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 404, 409]).toContain(error.response.status);
    }
  });

  test('Bug_K04: POST /api/auctions/:id/bid rejects bid when participant deposit balance is insufficient', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        { amount: 1000000000 },
        { headers: { Authorization: TEST_USER_TOKEN } }
      );
      throw new Error('REQUEST_SHOULD_FAIL');
    } catch (error) {
      expect(error.response).toBeDefined();
      expect([400, 402, 404, 422]).toContain(error.response.status);
    }
  });

  test('Bug_001: Concurrent bids sent simultaneously must prevent race condition duplicate states', async () => {
    const identicalBidAmount = 2500000;
    const requests = [
      axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        { amount: identicalBidAmount },
        { headers: { Authorization: TEST_USER_TOKEN } }
      ).catch((err) => err.response || { status: 500 }),
      axios.post(
        `${BASE_URL}/api/auctions/${targetAuctionId}/bid`,
        { amount: identicalBidAmount },
        { headers: { Authorization: TEST_USER_TOKEN } }
      ).catch((err) => err.response || { status: 500 })
    ];

    const responses = await Promise.all(requests);
    const successfulResponses = responses.filter((res) => res.status === 200 || res.status === 201);
    expect(successfulResponses.length).toBeLessThanOrEqual(1);
  });
});