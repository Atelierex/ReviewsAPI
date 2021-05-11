// reference: https://k6.io/docs/test-types/load-testing

import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // During the whole test execution, the error rate must be lower than 1%.
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
  stages: [
    { duration: '15s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 15 seconds
    { duration: '15s', target: 500 }, // stay at 500 users for 30 seconds
    { duration: '30s', target: 800 }, // ramp-up to 800 users over 30 seconds (peak hour starts)
    { duration: '1m', target: 1000 }, // stay at 1000 users for short amount of time (peak hour)
    { duration: '30s', target: 800 }, // ramp-down to 800 users over 30 seconds (peak hour ends)
    { duration: '15s', target: 500 }, // continue at 500 for additional 30 seconds
    { duration: '15s', target: 0 }, // ramp-down to 0 users
  ]
};
export default function () {
  http.get('http://localhost:3000/reviews?product_id=987123');
  http.get('http://localhost:3000/reviews/meta?product_id=987456');
  sleep(1);
}
