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
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoibWVkaWNvIiwidHlwZSI6Im1lZGljbyIsImlhdCI6MTc2MjExMzUxNywiZXhwIjoxNzYyMTQyMzE3fQ.5794LzKVUpKtYxYmWWdKE1nx3BfYRgBTM1CIN5dBJh4'
        },
    };

    // 1 -  Criar um pet
    const petPayload = JSON.stringify({
        nome: 'Mia',
        especie: 'Gato',
        raca: 'Persa',
        idade: 1,
        donoId: "2"
    });

    const petResponse = http.post('http://localhost:3000/pets', petPayload, params);
    check(petResponse, {
        'pet criado com sucesso': (r) => r.status === 201,
    });

    if (petResponse.status === 201) {
        const pet = JSON.parse(petResponse.body);
        const petId = pet.id;

        // 2 - Criar procedimento com o ID do pet criado
        const procedimentoPayload = JSON.stringify({
            petId: petId,
            tipo: 'Vacina',
            descricao: 'Vacina anual',
            data: '2025-11-02'
        });

        const procedimentoRes = http.post('http://localhost:3000/procedimentos', procedimentoPayload, params);
        check(procedimentoRes, {
            'Procedimento criado com sucesso': (r) => r.status === 201,
        });
        sleep(1);
    }
}
