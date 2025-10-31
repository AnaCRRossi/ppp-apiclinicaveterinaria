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

    // Criar pet para procedimento
    let petPayload = JSON.stringify({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'SRD',
        idade: 2
    });
    let petRes = http.post(`${BASE_URL}/pets`, petPayload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    let petId = petRes.json('id');

    // Registrar procedimento
    let procedimentoPayload = JSON.stringify({
        petId: petId,
        tipo: 'Vacina',
        descricao: 'Vacina anual',
        data: '2025-10-30'
    });
    let procedimentoRes = http.post(`${BASE_URL}/procedimentos`, procedimentoPayload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    check(procedimentoRes, { 'create procedimento status 201': r => r.status === 201 });

    sleep(1);
}
