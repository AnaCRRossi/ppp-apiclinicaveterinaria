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

    // 1 -  Criar um pet
    const petPayload = JSON.stringify({
        nome: 'Mia',
        especie: 'Gato',
        raca: 'Persa',
        idade: 1,
        donoId: "2"
    });
    
    const petResponse = http.post('http://localhost:3000/pets', petPayload, params);
    console.log(`Pet - Resposta ${petResponse.status}: ${petResponse.body}`);
    
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

        const procedimentoResponse = http.post('http://localhost:3000/procedimentos', procedimentoPayload, params);
        console.log(`Procedimento - Resposta ${procedimentoResponse.status}: ${procedimentoResponse.body}`);
    }
}
