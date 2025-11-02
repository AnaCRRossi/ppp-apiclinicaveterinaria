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
    const url = 'http://localhost:3000/pets';
    const payload = JSON.stringify({
        nome: 'Chico',
        especie: 'Cachorro',
        raca: 'Spitz Alemão',
        idade: 2,
        donoId: "2"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoibWVkaWNvIiwidHlwZSI6Im1lZGljbyIsImlhdCI6MTc2MjExMzUxNywiZXhwIjoxNzYyMTQyMzE3fQ.5794LzKVUpKtYxYmWWdKE1nx3BfYRgBTM1CIN5dBJh4'
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'Pet criado com sucesso': (r) => r.status === 201,
    });
    sleep(1);
}
