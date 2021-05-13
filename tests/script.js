// reference: https://k6.io/docs/test-types/load-testing

import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // During the whole test execution, the error rate must be lower than 1%.
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2s
  },
  stages: [
    { duration: '10s', target: 200 }, // simulate ramp-up of traffic from 1 to 100 users over 15 seconds
    { duration: '10s', target: 700 }, // stay at 500 users for 30 seconds
    { duration: '15s', target: 1500 }, // ramp-up to 1500 users over 30 seconds (peak hour starts)
    { duration: '2m20s', target: 3000 }, // stay at 100 users for short amount of time (peak hour)
    { duration: '15s', target: 1500 }, // ramp-down to 1500 users over 30 seconds (peak hour ends)
    { duration: '10s', target: 1500 }, // continue at 500 for additional 30 seconds
    { duration: '10s', target: 200 }, // ramp-down to 0 users
  ]
};
export default function () {
  http.get('http://localhost:3000/reviews?product_id=987123');
  // http.get('http://localhost:3000/reviews/meta?product_id=987456');
  sleep(1);
}
