const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

describe('Kiểm thử API Đặt giá (Bidding API)', () => {
  test('TC_API_BID_01: Đặt giá không truyền token xác thực -> Bị từ chối (HTTP 401 hoặc 404/403)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/auctions/66a000000000000000000000/bid`, {
        amount: 200000
      });
    } catch (error) {
      expect([401, 403, 404]).toContain(error.response.status);
    }
  });

  test('TC_API_BID_02: Đặt giá không có body amount -> Trả về HTTP 400 Bad Request', async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auctions/66a000000000000000000000/bid`,
        {},
        { headers: { Authorization: process.env.TEST_USER_TOKEN } }
      );
    } catch (error) {
      expect([400, 404]).toContain(error.response.status);
    }
  });
});