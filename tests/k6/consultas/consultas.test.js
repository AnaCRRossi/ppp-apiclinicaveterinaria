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

    // Criar pet para consulta
    let petPayload = JSON.stringify({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'SRD',
        idade: 2
    });
    let petRes = http.post(`${BASE_URL}/pets`, petPayload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    let petId = petRes.json('id');

    // Registrar consulta
    let consultaPayload = JSON.stringify({
        petId: petId,
        descricao: 'Consulta de rotina',
        data: '2025-10-30'
    });
    let consultaRes = http.post(`${BASE_URL}/consultas`, consultaPayload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    check(consultaRes, { 'create consulta status 201': r => r.status === 201 });

    sleep(1);
}
