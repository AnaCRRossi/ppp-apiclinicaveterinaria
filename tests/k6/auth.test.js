import http from 'k6/http';

export const options = {
  iterations: 10,
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

   const resposta = http.post(url, payload, params);
   console.log(`Resposta ${resposta.status}: ${resposta.body}`);
}
