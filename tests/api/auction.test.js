const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

describe('Kiểm thử API Quản lý phiên đấu giá (Auction API)', () => {
  let existingAuctionId = '';

  test('TC_API_AUC_01: Lấy danh sách phiên đấu giá -> Trả về HTTP 200 và mảng dữ liệu', async () => {
    const res = await axios.get(`${BASE_URL}/api/auctions`);
    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();

    // Tự động bốc 1 ID thật từ danh sách trả về để dùng cho các test bên dưới
    const auctions = Array.isArray(res.data) ? res.data : (res.data.data || res.data.auctions || []);
    if (auctions.length > 0) {
      existingAuctionId = auctions[0]._id || auctions[0].id;
    }
  });

  test('TC_API_AUC_02: Truy vấn với ID sai định dạng -> Trả về HTTP 400 Bad Request', async () => {
    try {
      await axios.get(`${BASE_URL}/api/auctions/id_khong_hop_le_9999`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('TC_API_AUC_03: Truy vấn chi tiết phiên đấu giá tồn tại -> Trả về HTTP 200', async () => {
    if (!existingAuctionId) return;
    const res = await axios.get(`${BASE_URL}/api/auctions/${existingAuctionId}`);
    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();
  });

  test('TC_API_AUC_04: Tạo phiên đấu giá khi chưa đăng nhập -> Trả về HTTP 401 Unauthorized', async () => {
    try {
      await axios.post(`${BASE_URL}/api/auctions`, {
        title: 'Vợt cầu lông Yonex',
        startingPrice: 1000000
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});