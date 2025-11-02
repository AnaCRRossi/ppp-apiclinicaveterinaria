import http from 'k6/http';

export const options = {
  iterations: 10,
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

   const resposta = http.post(url, payload, params);
   console.log(`Pet - Resposta ${resposta.status}: ${resposta.body}`);
}
