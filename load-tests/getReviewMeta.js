import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '30s'
};

export default function () {
  let res = http.get('http://localhost:3000/reviews/meta?product_id=987456');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
