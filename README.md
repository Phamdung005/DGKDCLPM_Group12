# AuctionHouse — Báo Cáo Kiểm Định & Kiểm Thử Chất Lượng Phần Mềm

<div align="center">

![Phenikaa University](https://img.shields.io/badge/Trường-Đại%20học%20Phenikaa-blue?style=for-the-badge)
![Subject](https://img.shields.io/badge/Môn-Đánh%20giá%20%26%20Kiểm%20định%20CLPM-orange?style=for-the-badge)
![Group](https://img.shields.io/badge/Nhóm-12-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Trạng%20thái-Hoàn%20thành-brightgreen?style=for-the-badge)

**Trường Công nghệ Thông tin — Đại học Phenikaa**
**Đồ án môn học: Đánh giá và Kiểm định Chất lượng Phần mềm**
**Giảng viên hướng dẫn: Thầy Trịnh Thanh Bình**

</div>

---

## Mục Lục

1. [Giới thiệu đề tài](#1-giới-thiệu-đề-tài)
2. [Thông tin nhóm thực hiện](#2-thông-tin-nhóm-thực-hiện)
3. [Phân công công việc chi tiết](#3-phân-công-công-việc-chi-tiết)
4. [Hệ thống được kiểm thử](#4-hệ-thống-được-kiểm-thử)
5. [Phương pháp & Công cụ kiểm thử](#5-phương-pháp--công-cụ-kiểm-thử)
6. [Cấu trúc thư mục kho mã nguồn](#6-cấu-trúc-thư-mục-kho-mã-nguồn)
7. [Hướng dẫn cài đặt & thực thi kiểm thử](#7-hướng-dẫn-cài-đặt--thực-thi-kiểm-thử)
8. [Mô tả chi tiết các bộ kiểm thử](#8-mô-tả-chi-tiết-các-bộ-kiểm-thử)
9. [Kết quả chính đạt được](#9-kết-quả-chính-đạt-được)
10. [Danh sách khiếm khuyết (Defect Log)](#10-danh-sách-khiếm-khuyết-defect-log)
11. [Sản phẩm nộp trong kho](#11-sản-phẩm-nộp-trong-kho)
12. [Liên kết & Tài nguyên](#12-liên-kết--tài-nguyên)

---

## 1. Giới Thiệu Đề Tài

**AuctionHouse** là một nền tảng sàn đấu giá trực tuyến **phân tán**, hỗ trợ **đặt giá thời gian thực (Realtime Bidding)**, được xây dựng để giải quyết các bài toán kỹ thuật khó nhất trong hệ thống tài chính đồng thời:

- **Tranh chấp giá đồng thời (Race Condition)**: Xử lý hàng chục người dùng cùng đặt giá trong cùng một millisecond ở những giây cuối phiên đấu giá.
- **Minh bạch tài chính tuyệt đối**: Quản lý dòng tiền cọc tham gia (*frozen balance*), đảm bảo không bao giờ có tình trạng số dư âm hoặc mất cọc không lý do.
- **Bảo mật phân quyền**: Kiểm soát truy cập theo vai trò (RBAC) và ngăn chặn các lỗ hổng leo thang đặc quyền (BOLA).

### Kết Luận Tổng Quan Kiểm Định

> Hệ thống đạt **độ ổn định cao** ở các phân hệ xác thực, ví tiền và chat thời gian thực.
>
> - ✅ Tỷ lệ Pass kiểm thử thủ công: **88.1%** (89/101 ca)
> - ✅ Lỗi Race Condition nghiêm trọng đã được **vá triệt để** bằng khóa phân tán **Redis Redlock**
> - ✅ Lỗ hổng phân quyền RBAC đã được vá bằng **middleware bảo mật**
> - ✅ Hệ thống vượt qua kiểm thử hiệu năng: Độ trễ phản hồi **p₉₅ = 108.17ms**, tỷ lệ lỗi mạng **0.00%**

---

## 2. Thông Tin Nhóm Thực Hiện

| Họ và Tên | Mã Sinh Viên | Email | Vai Trò | Tỉ Lệ Đóng Góp | Đánh Giá |
|-----------|-------------|-------|---------|-----------------|----------|
| **Phạm Văn Tiến Dũng** | 23010681 | 23010681@st.phenikaa-uni.edu.vn | Trưởng nhóm | 25% | Hoàn thành |
| **Tạ Thu Hương Linh** | 23010686 | 23010686@st.phenikaa-uni.edu.vn | Thành viên | 25% | Hoàn thành |
| **Đoàn Văn Khánh** | 23010252 | 23010252@st.phenikaa-uni.edu.vn | Thành viên | 25% | Hoàn thành |
| **Đoàn Hoàng Vũ** | 23010534 | 23010534@st.phenikaa-uni.edu.vn | Thành viên | 25% | Hoàn thành |

* **Video thuyết trình**: Bản MP4 lưu trữ trong kho dự án (`Video_thuyet_trinh_AuctionHouse.mp4`)
* **Web Demo trực tuyến**: https://distributed-auction-system.vercel.app/ (Lưu ý: đợi khoảng 1 phút và reload để server hoạt động)
* **Mã nguồn dự án gốc**: https://github.com/Phamdung005/Distributed-Auction-System
* **Bảng danh sách testcase và bug report**: [Xem file Testcase & Bug Report (Excel)](./Group12_SOFTWARETESTING.xlsx)
* **Slide thuyết trình**: [Xem slide](./auction-house-presentation.pptx)
---

## 3. Phân Công Công Việc Chi Tiết

| # | Công Việc | Mô Tả Tóm Tắt | Người Thực Hiện |
|---|-----------|----------------|-----------------|
| 1 | **Quản lý dự án** | Lập kế hoạch thực hiện đồ án, phân chia công việc, quản lý tiến độ nhóm và làm việc với giảng viên hướng dẫn | Phạm Văn Tiến Dũng |
| 2 | **Đặc tả yêu cầu** | Đặc tả yêu cầu phần mềm: Use Case phân hệ đấu giá, ví tiền, quản lý phiên và đối chiếu mã nguồn | Tạ Thu Hương Linh |
| 3 | **Kế hoạch kiểm thử** | Thiết kế kế hoạch kiểm thử theo chuẩn **IEEE 829** và **IEEE 730** | Phạm Văn Tiến Dũng |
| 4 | **Môi trường kiểm thử** | Dựng môi trường kiểm thử: Node.js, MongoDB, Redis (Redlock), dữ liệu mẫu và tài khoản test | Đoàn Hoàng Vũ |
| 5 | **Test Cases thủ công** | Thiết kế và thực hiện **101 Ca kiểm thử** thủ công, lập ma trận truy vết Defect Log | Đoàn Văn Khánh, Đoàn Hoàng Vũ |
| 6 | **Kiểm thử tự động** | Viết bộ kiểm thử tự động Unit Test và API Testing bằng **Jest** và **Axios**, đo độ bao phủ mã nguồn | Phạm Văn Tiến Dũng, Tạ Thu Hương Linh |
| 7 | **Kiểm thử hiệu năng** | Kiểm thử hiệu năng và chịu tải đồng thời bằng **Grafana k6** và **Apache JMeter**, phân tích lỗi Race Condition | Phạm Văn Tiến Dũng |
| 8 | **Kiểm thử bảo mật** | Kiểm thử bảo mật: Phân quyền RBAC, BOLA, JWT Revocation, Token Blacklist | Tạ Thu Hương Linh |
| 9 | **Tổng hợp lỗi** | Tổng hợp **13 khiếm khuyết** (Defect Log), đánh giá chất lượng theo tiêu chí kiểm thử và kết luận | Phạm Văn Tiến Dũng |
| 10 | **Tổng hợp báo cáo** | Tổng hợp báo cáo, hoàn thiện tài liệu, chuẩn bị slide thuyết trình và kịch bản quay video | Toàn bộ nhóm |

---

## 4. Hệ Thống Được Kiểm Thử

AuctionHouse được xây dựng theo mô hình **Microservices / RESTful API** với các thành phần chính:

| Thành Phần | Công Nghệ | Vai Trò |
|-----------|-----------|---------|
| **Kiến trúc** | Microservices, RESTful API | Mô hình phân tán, tách biệt dịch vụ |
| **Frontend** | Tailwind CSS + Ant Design | Giao diện responsive, hiện đại |
| **Backend** | Node.js + Express.js | Xử lý logic nghiệp vụ, điều phối API |
| **Cơ sở dữ liệu** | MongoDB (Mongoose) | Lưu trữ giao dịch, phiên đấu giá, người dùng |
| **Cache / Khóa** | Redis + Redlock | Khóa phân tán chống tranh chấp đồng thời |
| **Hạ tầng** | Render Cloud Platform | Triển khai đám mây, tự động scale |
| **Xác thực** | JWT + bcrypt | Xác thực token, mã hóa mật khẩu |
| **Phân quyền** | RBAC Middleware | Kiểm soát truy cập theo vai trò (User/Admin/Seller) |

### Sơ Đồ Luồng Nghiệp Vụ Chính

```
Người dùng
    │
    ├──► [Đăng ký / Đăng nhập]  →  JWT Token
    │
    ├──► [Nạp tiền vào Ví]  →  Frozen Balance (Tiền cọc 10%)
    │
    ├──► [Tham gia Phiên Đấu Giá]
    │         │
    │         ├──► validateBidPlacement()    ← Kiểm tra điều kiện hợp lệ
    │         ├──► Redis Redlock (Khóa)      ← Chống Race Condition
    │         ├──► Ghi nhận Giá mới          ← Cập nhật DB
    │         └──► Redis Redlock (Mở khóa)
    │
    └──► [Kết thúc Phiên]
              │
              ├──► processAuctionSettlement()  ← Tính toán kết quả
              ├──► Hoàn cọc người thua          ← Refund Balance
              └──► Ghi nhận người thắng         ← SETTLED
```

---

## 5. Phương Pháp & Công Cụ Kiểm Thử

| Loại Kiểm Thử | Cấp Độ | Kỹ Thuật Chính | Công Cụ Sử Dụng |
|---------------|--------|----------------|-----------------|
| **Kiểm thử Chức năng** | Hệ thống | Phân vùng tương đương, Giá trị biên, Bảng quyết định | Excel, Postman Collection v2.1 |
| **Kiểm thử Đơn vị (Unit Test)** | Hộp trắng | Kiểm thử nhánh, Điều kiện, Giả lập logic | Jest (`auctionEngine.test.js`) |
| **Kiểm thử Tích hợp API** | Tích hợp | Kiểm tra route, Middleware, Phản hồi HTTP Status | Jest, Axios, Supertest |
| **Kiểm thử Hiệu năng** | Hệ thống | Kiểm thử tải đồng thời (Concurrency Testing) | Grafana k6, Apache JMeter |
| **Kiểm thử Bảo mật** | Hệ thống | Kiểm tra phân quyền BOLA, Chống ghi đè Race Condition | Redis Redlock, JWT Blacklist |

---

## 6. Cấu Trúc Thư Mục Kho Mã Nguồn

```
AuctionHouse-QA-Tests/
│
├── src/
│   └── auctionEngine.js              # Động cơ nghiệp vụ lõi
│                                     #     - validateBidPlacement()        : Xác thực điều kiện đặt giá
│                                     #     - calculateParticipationDeposit(): Tính tiền cọc 10% (sàn 50.000đ)
│                                     #     - processAuctionSettlement()    : Xử lý kết thúc & hoàn cọc
│
├── tests/
│   ├── unit/
│   │   └── auctionEngine.test.js     # Unit Tests — Jest (100% Code Coverage)
│   │                                 #     · 16 test case bao phủ toàn bộ nhánh & điều kiện
│   │                                 #     · Kiểm tra: ACTIVE, SELF_BIDDING, INVALID_AMOUNT, BID_TOO_LOW...
│   │
│   ├── api/
│   │   ├── auction.test.js           # API Tests — Phân hệ Auction  (Bug_K09)
│   │   ├── bid.test.js               # API Tests — Phân hệ Bidding  (Bug_001, Bug_K01 → K04)
│   │   └── admin.test.js             # API Tests — Admin & RBAC      (Bug_K06, Bug_K08)
│   │
│   ├── postman/
│   │   └── AuctionHouse_API_Collection.json  # Postman Collection v2.1 (tự động hóa)
│   │
│   └── performance/
│       ├── k6-bid-concurrency.js             # Kịch bản Grafana k6 (10–50 VUs đồng thời)
│       └── AuctionHouse_Bidding_Concurrency.jmx  # Apache JMeter Test Plan
│
├── scripts/
│   └── run-k6.js                     # Script khởi chạy k6 qua Node.js
│
├── coverage/                         # Báo cáo Coverage HTML (tự sinh sau khi chạy test)
│
├── .env                              # Biến môi trường (BASE_URL, JWT Tokens)
├── .gitignore
├── package.json
└── README.md
```

---

## 7. Hướng Dẫn Cài Đặt & Thực Thi Kiểm Thử

### Yêu Cầu Hệ Thống

| Phần Mềm | Phiên Bản Tối Thiểu | Ghi Chú |
|----------|---------------------|---------|
| Node.js | ≥ 18.x | Runtime chính |
| npm | ≥ 9.x | Đi kèm với Node.js |
| Grafana k6 | ≥ 0.50.0 | Chỉ cần cho kiểm thử hiệu năng |
| Apache JMeter | ≥ 5.6 | Chỉ cần cho kiểm thử JMeter |

### Bước 1 — Sao Chép Kho Mã Nguồn

```bash
git clone https://github.com/Phamdung005/AuctionHouse-QA-Tests.git
cd AuctionHouse-QA-Tests
```

### Bước 2 — Cài Đặt Thư Viện Phụ Thuộc

```bash
npm install
```

### Bước 3 — Cấu Hình Biến Môi Trường

Tạo file `.env` tại thư mục gốc (hoặc chỉnh sửa file `.env` hiện có) với nội dung:

```env
# URL của hệ thống AuctionHouse đang chạy (production hoặc local)
BASE_URL=https://distributed-auction-system.onrender.com

# JWT Token của tài khoản người dùng thông thường (dùng để test bidding)
TEST_USER_TOKEN=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Token của tài khoản người bán (dùng để test self-bidding rejection)
SELLER_TOKEN=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Lưu ý**: Các token JWT có thời hạn. Nếu test API thất bại với lỗi `401 Unauthorized`, hãy đăng nhập lại vào hệ thống và lấy token mới.

### Bước 4 — Chạy Các Bộ Kiểm Thử

#### Kiểm Thử Đơn Vị + Đo Độ Bao Phủ Mã Nguồn (Unit Test & Coverage)

```bash
npm run test:coverage
```

Kết quả mong đợi: **100% Statements | 100% Branches | 100% Functions | 100% Lines**

Báo cáo HTML chi tiết được lưu tại: `coverage/lcov-report/index.html`

---

#### Chạy Kiểm Thử API Tích Hợp Tự Động

```bash
npm run test:api
```

> Lệnh này chạy tuần tự (`--runInBand`) để tránh xung đột khi các test case chia sẻ trạng thái server.

Kết quả mong đợi: **16/16 API tests PASS** trong khoảng **3–5 giây**

---

#### Chạy Kiểm Thử Hiệu Năng với Grafana k6

```bash
npm run test:k6
```

Kịch bản k6 sẽ mô phỏng **10 → 50 Virtual Users (VUs)** đặt giá đồng thời trong **60 giây**, kiểm tra:
- Phát hiện Race Condition khi nhiều VU gửi cùng một mức giá
- Đo thời gian phản hồi trung bình và p₉₅

**Yêu cầu** **Grafana k6** đã được cài đặt sẵn. Xem hướng dẫn: https://grafana.com/docs/k6/latest/set-up/install-k6/

---

#### Chạy Kiểm Thử Hiệu Năng với Apache JMeter

1. Mở ứng dụng **Apache JMeter**
2. Vào **File → Open**
3. Trỏ tới tệp: `tests/performance/AuctionHouse_Bidding_Concurrency.jmx`
4. Nhấn nút **Run (▶ Start)**
5. Theo dõi kết quả trong tab **View Results Tree** hoặc **Summary Report**

---

#### Chạy Tất Cả Các Bài Test (Unit + API)

```bash
npm test
```

---

## 8. Mô Tả Chi Tiết Các Bộ Kiểm Thử

### 8.1 Unit Test — `auctionEngine.test.js`

Bộ kiểm thử **hộp trắng (White-box)** cho file `src/auctionEngine.js`, bao gồm **3 nhóm chức năng** với **16 test case**.

#### Nhóm 1: `validateBidPlacement()` — Xác Thực Đặt Giá

| # | Tên Test Case | Điều Kiện Đầu Vào | Kết Quả Mong Đợi |
|---|--------------|-------------------|------------------|
| T01 | Từ chối khi phiên không ACTIVE | `status = 'SCHEDULED'` | `valid: false, error: 'AUCTION_NOT_ACTIVE'` |
| T02 | Từ chối self-bidding | `sellerId === bidderId` | `valid: false, error: 'SELF_BIDDING_NOT_ALLOWED'` |
| T03 | Chấp nhận khi thiếu sellerId/bidderId | `sellerId = null` | `valid: true` |
| T04 | Từ chối giá trị không phải số | `bidAmount = 'invalid'` | `valid: false, error: 'INVALID_BID_AMOUNT'` |
| T05 | Từ chối giá trị NaN | `bidAmount = NaN` | `valid: false, error: 'INVALID_BID_AMOUNT'` |
| T06 | Từ chối giá bằng 0 hoặc âm | `bidAmount = 0 / -5000` | `valid: false, error: 'INVALID_BID_AMOUNT'` |
| T07 | Từ chối cấu hình phiên sai kiểu dữ liệu | `currentBid = '100000'` | `valid: false, error: 'INVALID_AUCTION_CONFIG'` |
| T08 | Từ chối stepPrice = 0 hoặc currentBid âm | `stepPrice = 0` | `valid: false, error: 'INVALID_AUCTION_CONFIG'` |
| T09 | Từ chối giá thấp hơn mức tối thiểu | `bid = 115.000 < min 120.000` | `valid: false, error: 'BID_AMOUNT_TOO_LOW'` |
| T10 | Chấp nhận giá bằng đúng mức tối thiểu | `bid = min = 120.000` | `valid: true, error: null` |
| T11 | Chấp nhận giá cao hơn mức tối thiểu | `bid = 150.000 > min 120.000` | `valid: true, error: null` |

#### Nhóm 2: `calculateParticipationDeposit()` — Tính Tiền Cọc

| # | Tên Test Case | Điều Kiện Đầu Vào | Kết Quả Mong Đợi |
|---|--------------|-------------------|------------------|
| T12 | Ném lỗi khi không phải số | `startingPrice = '100000'` | `throw 'INVALID_STARTING_PRICE'` |
| T13 | Ném lỗi khi là NaN | `startingPrice = NaN` | `throw 'INVALID_STARTING_PRICE'` |
| T14 | Ném lỗi khi bằng 0 hoặc âm | `startingPrice = 0 / -50000` | `throw 'INVALID_STARTING_PRICE'` |
| T15 | Áp dụng mức sàn 50.000đ khi 10% < sàn | `startingPrice = 200.000` | `deposit = 50.000` |
| T16 | Tính đúng 10% khi vượt sàn | `startingPrice = 5.000.000` | `deposit = 500.000` |

#### Nhóm 3: `processAuctionSettlement()` — Kết Thúc Phiên Đấu Giá

| # | Tên Test Case | Điều Kiện Đầu Vào | Kết Quả Mong Đợi |
|---|--------------|-------------------|------------------|
| T17 | Ném lỗi khi danh sách không phải Array | `participantList = 'string'` | `throw 'INVALID_PARTICIPANT_LIST'` |
| T18 | Hủy phiên khi không có người thắng | `winnerId = null` | `status: 'CANCELLED_NO_WINNER', refundList = tất cả` |
| T19 | Kết toán thành công, hoàn cọc người thua | `winner = 'winner_id'` | `status: 'SETTLED', refundList = ['loser_1', 'loser_2']` |

---

### 8.2 API Integration Tests

#### `bid.test.js` — Kiểm Thử Phân Hệ Bidding (7 test cases)

| # | Tên Test Case | Endpoint | Kết Quả Mong Đợi |
|---|--------------|----------|------------------|
| 1 | Đặt giá không có Authorization header | `POST /api/auctions/:id/bid` | HTTP `401 / 403 / 404` |
| 2 | Thiếu trường `amount` trong request body | `POST /api/auctions/:id/bid` | HTTP `400 / 404` |
| 3 | Giá đặt thấp hơn bước giá tối thiểu (`amount = 1`) | `POST /api/auctions/:id/bid` | HTTP `400 / 404 / 422` |
| 4 | Người bán (seller) tự đặt giá vào phiên của mình | `POST /api/auctions/:id/bid` | HTTP `400 / 403 / 404 / 422` |
| 5 | Đặt giá vào phiên không tồn tại / không ACTIVE | `POST /api/auctions/invalid_id/bid` | HTTP `400 / 404 / 409` |
| 6 | Đặt giá vượt số dư cọc (`amount = 1.000.000.000`) | `POST /api/auctions/:id/bid` | HTTP `400 / 402 / 404 / 422` |
| 7 | 2 request đồng thời cùng giá → chỉ 1 được chấp nhận (Race Condition) | Concurrent `POST` | `successfulResponses.length ≤ 1` |

#### `auction.test.js` — Kiểm Thử Phân Hệ Auction (4 test cases)

| # | Tên Test Case | Endpoint | Kết Quả Mong Đợi |
|---|--------------|----------|------------------|
| 1 | Lấy danh sách phiên đấu giá thành công | `GET /api/auctions` | HTTP `200`, data defined |
| 2 | ID phiên sai định dạng MongoDB trả 400 thay vì crash 500 | `GET /api/auctions/invalid_id` | HTTP `400 / 404`, không phải `500` |
| 3 | Xem chi tiết phiên hợp lệ thành công | `GET /api/auctions/:id` | HTTP `200`, data defined |
| 4 | Tạo phiên không có Authorization header | `POST /api/auctions` | HTTP `401` |

#### `admin.test.js` — Kiểm Thử Admin & Phân Quyền (5 test cases)

| # | Tên Test Case | Endpoint | Kết Quả Mong Đợi |
|---|--------------|----------|------------------|
| 1 | Xóa phiên không có token | `DELETE /api/auctions/:id` | HTTP `401 / 403` |
| 2 | Hủy phiên không có token | `POST /api/auctions/:id/cancel` | HTTP `401 / 403` |
| 3 | Bidder thường không được phép hủy phiên đấu giá | `POST /api/auctions/:id/cancel` | HTTP `401 / 403 / 404` |
| 4 | Bidder thường không được phép xóa phiên đấu giá | `DELETE /api/auctions/:id` | HTTP `401 / 403 / 404` |
| 5 | Admin hủy/kết thúc phiên không tồn tại trả lỗi hợp lệ | `POST /api/auctions/000.../cancel` | HTTP `400 / 401 / 403 / 404` |


---

### 8.3 Kiểm Thử Hiệu Năng

#### Grafana k6 — `k6-bid-concurrency.js`

- **Kịch bản**: Ramping VUs từ 10 lên 50 người dùng ảo trong 60 giây
- **Mục tiêu**: Phát hiện Race Condition và đo độ trễ dưới tải cao
- **Ngưỡng thành công**: `p₉₅ < 1000ms`, `error rate < 5%`

#### Apache JMeter — `AuctionHouse_Bidding_Concurrency.jmx`

- **Thread Group**: 50 luồng đồng thời, ramp-up 10 giây
- **Loop**: 10 lần/luồng → Tổng 500 requests
- **Mục tiêu**: Đánh giá throughput và Average Response Time

---

## 9. Kết Quả Chính Đạt Được

### Kiểm Thử Thủ Công (Manual Testing)

| Chỉ Số | Kết Quả |
|--------|---------|
| Tổng số ca kiểm thử | **101 / 101** (100% hoàn thành) |
| Số ca PASS | **89** ca (88.1%) |
| Số ca FAIL | **12** ca (11.9%) |
| Lỗi cốt lõi phát hiện | **13 lỗi** (Bug_K01 → Bug_K13) |

### Kiểm Thử Tự Động (Automation Test)

| Chỉ Số | Kết Quả |
|--------|---------|
| Unit Test Coverage — Statements | **100%** |
| Unit Test Coverage — Branches | **100%** |
| Unit Test Coverage — Functions | **100%** |
| Unit Test Coverage — Lines | **100%** |
| API Tests Pass | **16 / 16** (100%) |
| Thời gian chạy API Tests | **~3.14 giây** |

### Kiểm Thử Hiệu Năng (Performance Test)

| Chỉ Số | Kết Quả | Ngưỡng Yêu Cầu |
|--------|---------|-----------------|
| Độ trễ trung bình | **88.4 ms** | < 1000 ms |
| Độ trễ p₉₅ | **108.17 ms** | < 1000 ms |
| Tỷ lệ lỗi mạng | **0.00%** | < 5% |

---

## 10. Danh Sách Khiếm Khuyết (Defect Log)

> Nguồn dữ liệu: `Group12_SOFTWARETESTING (4).xlsx` — Sheet **Bug_Report** (13 lỗi, Bug_K01 → Bug_K13)

| Mã Lỗi | Module | Mô Tả Lỗi | Mức Độ | Trạng Thái |
|--------|--------|-----------|--------|-----------|
| **Bug_K01** | Bidding | Người dùng vẫn có thể đặt giá thành công sau khi admin hủy phiên đấu giá | Major | Đã vá |
| **Bug_K02** | Auction | Backend cho phép tạo phiên với giá khởi điểm = 0 (HTTP 201 thay vì báo lỗi) | Medium | Đã vá |
| **Bug_K03** | Auction | Không validate `depositAmount` khi tạo phiên — giá trị âm được chấp nhận và bỏ qua | Medium | Đang xử lý |
| **Bug_K04** | Auction | Lỗi nghiệp vụ/validate trả về HTTP 500 thay vì HTTP 400 (buyNow ≤ startPrice, endTime ≤ startTime…) | Low | Đã vá |
| **Bug_K05** | Auction | Xem phiên không tồn tại trả về 400/500 thay vì 404 | Low | Đã vá |
| **Bug_K06** | Auction | Tìm kiếm phiên đấu giá không lọc đúng kết quả — backend bỏ qua tham số `?title=` | Medium | Đang xử lý |
| **Bug_K07** | Auction | Seller sửa được giá khởi điểm và thông tin phiên đang ở trạng thái Active | Critical | Đã vá |
| **Bug_K08** | Auction | Admin hủy phiên: seller không nhận thông báo realtime; UI Admin thiếu ô nhập lý do hủy | Medium | Đang xử lý |
| **Bug_K09** | Admin | Khóa tài khoản không thu hồi JWT token đang hoạt động — token cũ vẫn hợp lệ (HTTP 200) | Major | Đã vá |
| **Bug_K10** | Admin | API cưỡng chế kết thúc phiên trả HTTP 500 — phiên vẫn ở trạng thái Active, không chốt winner | Major | Đã vá |
| **Bug_K11** | Admin | Trang Admin không hiển thị thống kê tài chính (biểu đồ, tổng nạp/cọc/doanh thu = 0) | Medium | Đang xử lý |
| **Bug_K12** | Wallet | Người thua đấu giá không được hoàn cọc ngay khi phiên kết thúc | Critical | Đã vá |
| **Bug_K13** | Auction | Không có thông báo thắng đấu giá khi phiên kết thúc (dù đơn hàng đã được tạo) | Medium | Đang xử lý |

---

## 11. Sản Phẩm Nộp Trong Kho

| Sản Phẩm | Tệp Trong Kho | Ghi Chú |
|---------|--------------|---------|
| **Báo cáo đồ án** | `Báo cáo đánh giá và kiểm định chất lượng phần mềm (2).docx` | Báo cáo chi tiết các chương kiểm định, phụ lục mã nguồn |
| **Bảng Test Case** | `Group12_SOFTWARETESTING (4).xlsx` | 101 ca kiểm thử thủ công kèm kết quả thực thi |
| **Mã nguồn Unit Test** | `tests/unit/auctionEngine.test.js` | 16 test case, đạt 100% Code Coverage |
| **Mã nguồn API Test** | `tests/api/*.test.js` | 3 file, 16 API test case tự động |
| **Postman Collection** | `tests/postman/AuctionHouse_API_Collection.json` | Collection v2.1, import trực tiếp vào Postman |
| **Kịch bản k6** | `tests/performance/k6-bid-concurrency.js` | Grafana k6 script (10–50 VUs) |
| **Kịch bản JMeter** | `tests/performance/AuctionHouse_Bidding_Concurrency.jmx` | Apache JMeter Test Plan |
| **Động cơ nghiệp vụ** | `src/auctionEngine.js` | Module logic lõi được kiểm thử |

---

## 12. Liên Kết & Tài Nguyên

| Tài Nguyên | Đường Dẫn |
|-----------|----------|
| **Hệ thống AuctionHouse (Live Demo)** | https://distributed-auction-system.vercel.app/ |
| **Kho mã nguồn hệ thống** | https://github.com/Phamdung005/Distributed-Auction-System |
| **Tài liệu Grafana k6** | https://grafana.com/docs/k6/latest/ |
| **Tài liệu Jest** | https://jestjs.io/docs/getting-started |
| **Chuẩn IEEE 829** | IEEE Standard for Software Test Documentation |
