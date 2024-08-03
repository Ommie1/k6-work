import http from 'k6/http';
import { performanceThreshold } from '../common/common.js'
import { check } from 'k6';

// define configuration
export const options = Object.assign(
    performanceThreshold(),
    {
      vus: 1, // Number of Virtual Users
    }
  );


export default function () {
    // Get api request
    const response = http.get('https://test-api.k6.io/public/crocodiles/');

    // Log the request body
    console.log(response.body);

    // check that response is 200
    check(response, {
        'response code was 200': (res) => res.status == 200,
    });
}