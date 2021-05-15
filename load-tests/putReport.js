import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  let res = http.get('http://localhost:3000/reviews/348390/report');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
