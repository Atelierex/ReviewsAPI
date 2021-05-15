import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 1000, // 1000 RPS, since timeUnit is the default 1s
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
  },
};

export default function () {
  http.get('http://localhost:3000/reviews?product_id=123457');
}
