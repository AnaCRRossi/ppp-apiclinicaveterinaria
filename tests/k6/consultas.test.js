import http from 'k6/http';

export const options = {
  iterations: 10,
};

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoibWVkaWNvIiwidHlwZSI6Im1lZGljbyIsImlhdCI6MTc2MjExMzUxNywiZXhwIjoxNzYyMTQyMzE3fQ.5794LzKVUpKtYxYmWWdKE1nx3BfYRgBTM1CIN5dBJh4'
        },
    };

    // 1 - Criar um pet
    const petPayload = JSON.stringify({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'SRD',
        idade: 3,
        donoId: "2"
    });
    
    const petResponse = http.post('http://localhost:3000/pets', petPayload, params);
    console.log(`Pet - Resposta ${petResponse.status}: ${petResponse.body}`);
    
    if (petResponse.status === 201) {
        const pet = JSON.parse(petResponse.body);
        const petId = pet.id;

        // 2 - Criar consulta com o ID do pet criado
        const consultaPayload = JSON.stringify({
            petId: petId,
            descricao: 'Consulta de rotina',
            data: '2025-11-02'
        });

        const consultaResponse = http.post('http://localhost:3000/consultas', consultaPayload, params);
        console.log(`Consulta - Resposta ${consultaResponse.status}: ${consultaResponse.body}`);
    }
}
