import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    concurrent_bidding: {
      executor: 'constant-vus',
      vus: 50,
      duration: '30s'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
    http_req_failed: ['rate<0.6']
  }
};

const BASE_URL = __ENV.BASE_URL || 'https://distributed-auction-system.onrender.com';
const TOKEN = __ENV.TEST_USER_TOKEN || '';
const AUCTION_ID = __ENV.AUCTION_ID || '66a000000000000000000000';

export default function () {
  const url = `${BASE_URL}/api/auctions/${AUCTION_ID}/bid`;
  const payload = JSON.stringify({
    amount: Math.floor(Math.random() * 500000) + 1000000
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN
    }
  };

  const response = http.post(url, payload, params);

  check(response, {
    'valid status response': (r) => [200, 201, 400, 409, 422].includes(r.status),
    'response under 1500ms': (r) => r.timings.duration < 1500
  });

  sleep(0.5);
}
