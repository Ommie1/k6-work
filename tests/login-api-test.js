// import necessary module
import http from 'k6/http';
import { check } from 'k6';

// define configuration
export const options = {
  // define thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<6000'], // 99% of requests should be below 6s
  },
};

export default function () {
  // define URL and payload
  const url = 'https://test-api.k6.io/auth/basic/login/';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '1234',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);

  // Log the request body
  console.log(res.body);

  // check that response is 200
  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
}