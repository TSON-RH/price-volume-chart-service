import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: "30s",
  rps: 1000
};

export default function() {
  const id = Math.floor(Math.random() * 1e7);
  const url = `http://localhost:3002/api/volumes/symbols/${id}`;

  // randomly choose to do a post or a get
  // 1% chance of doing a post, otherwise do a get

  let num = Math.random();

  if (num <= 0.01) {
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
   var res = http.post(url, payload, params);

  } else {
    var res = http.get(url);
  }

  check(res, {
    "status was 200": (r) => r.status === 200
  });
};