import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 6,
  duration: "30s",
  rps: 1000
};

export default function() {
  let id = Math.floor(Math.random() * 1e7);
  let res = http.get(`http://localhost:3000/api/volumes/symbols/${id}`);
  check(res, {
    "status was 200": (r) => r.status === 200
  });
};