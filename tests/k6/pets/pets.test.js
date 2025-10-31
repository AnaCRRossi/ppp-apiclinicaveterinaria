import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000';

function loginMedico() {
    let loginPayload = JSON.stringify({
        email: `medico${__VU}@test.com`,
        senha: '123456'
    });
    let loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, { headers: { 'Content-Type': 'application/json' } });
    return loginRes.json('token');
}

export default function () {
    let token = loginMedico();

    // Criar pet
    let petPayload = JSON.stringify({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'SRD',
        idade: 2
    });
    let petRes = http.post(`${BASE_URL}/pets`, petPayload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    check(petRes, { 'create pet status 201': r => r.status === 201 });
    let petId = petRes.json('id');

    // Listar pets
    let listPetsRes = http.get(`${BASE_URL}/pets`, { headers: { 'Authorization': `Bearer ${token}` } });
    check(listPetsRes, { 'list pets status 200': r => r.status === 200 });

    // Buscar pet por id
    if (petId) {
        let getPetRes = http.get(`${BASE_URL}/pets/${petId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        check(getPetRes, { 'get pet status 200': r => r.status === 200 });
    }

    sleep(1);
}
