// Reference: https://k6.io/docs/test-types/stress-testing/
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3000/reviews?product_id=987123');
  http.get('http://localhost:3000/reviews/meta?product_id=987456');
  sleep(1);
}