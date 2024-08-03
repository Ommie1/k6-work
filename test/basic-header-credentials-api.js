import encoding from 'k6/encoding';
import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
    const credentials = `${username}:${password}`;

    // using HTTP Basic Auth
    const encodedCredentials = encoding.b64encode(credentials);
    const options = {
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    };

    res = http.get(`https://httpbin.test.k6.io/basic-auth/${username}/${password}`, options);

    // Verify response (checking the echoed data from the httpbin.test.k6.io
    // basic auth test API endpoint)
    check(res, {
        'status is 200': (r) => r.status === 200,
        'is authenticated': (r) => r.json().authenticated === true,
        'is correct user': (r) => r.json().user === username,
    });
}