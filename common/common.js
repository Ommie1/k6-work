export function performanceThreshold() {
    return { 
      // define thresholds
      thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<6000'], // 99% of requests should be below 6 seconds
      },
      // define scenarios
      scenarios: {
        // arbitrary name of scenario
        average_load: {
          executor: 'ramping-vus',
          stages: [
            // ramp up to average load of 20 virtual users
            { duration: '5s', target: 20 },
            // maintain load
            { duration: '5s', target: 20 },
            // ramp down to zero
            { duration: '5s', target: 0 },
          ],
        },
      },
    };
  }