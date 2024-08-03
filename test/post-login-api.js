// import necessary module
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../constant/config.js';
// import { performanceThreshold } from '../common/common.js'

// define configuration
// export const options = performanceThreshold();

export default function () {
  // define URL and payload
  const url = `${BASE_URL}/auth/basic/login/`;
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