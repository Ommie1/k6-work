import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
    const credentials = `${username}:${password}`;

    // Passing username and password as part of the URL will
    // allow us to authenticate using HTTP Basic Auth.
    const url = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;

    let res = http.get(url);

    // Verify response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'is authenticated': (r) => r.json().authenticated === true,
        'is correct user': (r) => r.json().user === username,
    });
}