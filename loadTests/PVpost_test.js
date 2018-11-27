import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: "30s",
  rps: 1000
};

export default function() {
  let id = Math.floor(Math.random() * 1e7);
  
  var payload = JSON.stringify({
    week: 12,
    price: 3.50,
    volume: 78
  });

  const params = {
     headers: {
    'Content-Type': 'application/json'
    }
  };

  const url = `http://localhost:3002/api/volumes/symbols/${id}`;

  let res = http.post(url, payload, params);
  check(res, {
    "status was 200": (r) => r.status === 200
  });
};