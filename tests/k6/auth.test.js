import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 20 },
        { duration: '20s', target: 30 },
        { duration: '10s', target: 10 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<30'],
    },
};

export default function () {
    const url = 'http://localhost:3000/auth/login';
    const payload = JSON.stringify({
        email: 'ana.carolina@email.com',
        senha: '123456',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'Login bem-sucedido': (r) => r.status === 200,
    });

    sleep(1);
}
