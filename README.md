# AuctionHouse QA & Automation Test Suite

Repository chứa toàn bộ kịch bản kiểm thử tự động (Unit Test & API Automation Testing) cho hệ thống sàn đấu giá trực tuyến phân tán AuctionHouse.

## Cấu trúc thư mục

```text
├── src/
│   └── auctionEngine.js       # Động cơ nghiệp vụ lõi (Validate bid, Deposit 10%, Settlement)
├── tests/
│   ├── unit/
│   │   └── auctionEngine.test.js # Unit tests bao phủ 100% Statement, Branch, Function, Line
│   ├── api/
│   │   ├── auction.test.js    # API tests cho Auction (Bug_K09)
│   │   ├── bid.test.js        # API tests cho Bidding (Bug_001, Bug_K01, Bug_K02, Bug_K03, Bug_K04)
│   │   └── admin.test.js      # API tests cho Admin & RBAC (Bug_K06, Bug_K08)
│   ├── postman/
│   │   └── AuctionHouse_API_Collection.json # Postman Automated Collection v2.1
│   └── performance/
│       ├── k6-bid-concurrency.js                 # Kịch bản k6 tải đồng thời (10-50 VUs)
│       └── AuctionHouse_Bidding_Concurrency.jmx  # Kịch bản Apache JMeter Test Plan (Thread Group 50)
├── package.json
└── README.md
```

## Hướng dẫn cài đặt & Thực thi

### 1. Cài đặt thư viện phụ thuộc
```bash
npm install
```

### 2. Chạy kiểm thử đơn vị & kiểm tra độ bao phủ 100% (Unit Test & Coverage)
```bash
npm run test:coverage
```

### 3. Chạy kịch bản kiểm thử API tích hợp
```bash
npm run test:api
```

### 4. Chạy kiểm thử hiệu năng & tranh chấp tải đồng thời (k6)
```bash
npm run test:k6
```

### 5. Kiểm thử hiệu năng với Apache JMeter
Mở ứng dụng Apache JMeter -> Chọn `File > Open` -> Trỏ tới tệp `tests/performance/AuctionHouse_Bidding_Concurrency.jmx` và nhấn nút Run (Start).
