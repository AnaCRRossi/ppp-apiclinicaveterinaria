# PPP - API Clínica Veterinária

Projeto: API REST para acompanhamento do quadro clínico de pacientes de uma clínica veterinária.

Principais pontos:
- Autenticação via JWT (médicos e donos)
- Donos apenas consultam histórico; médicos acessam todas as funcionalidades
- Armazenamento em memória (dados perdidos ao reiniciar)
- Documentação Swagger disponível em `/docs`

Como rodar

1. Instale dependências:

```bash
npm install
```

2. Rodar em modo desenvolvimento (recarrega ao salvar):

```bash
npm run dev
```

3. Acesse a documentação Swagger:

- http://localhost:3000/docs

## Testes de Performance (k6)

Os testes de performance são utilizados para validar o comportamento da API sob carga e verificar se os endpoints respondem corretamente. Execute após iniciar a API com `npm run dev`.

### Executar testes k6 básicos:
```bash
npm run test:k6
```

### Visualizar relatórios HTML em tempo real:

Execute o teste com web dashboard e acesse **http://127.0.0.1:5665** no navegador **durante a execução**:

```bash
# Teste de autenticação (30 segundos de duração)
k6 run --out web-dashboard --duration 30s tests/k6/auth.test.js

# Teste de pets
k6 run --out web-dashboard --duration 30s tests/k6/pets.test.js

# Teste de consultas
k6 run --out web-dashboard --duration 30s tests/k6/consultas.test.js

# Teste de procedimentos
k6 run --out web-dashboard --duration 30s tests/k6/procedimentos.test.js
```

**⚠️ Importante**: O dashboard HTML só fica disponível **enquanto o teste está executando**. Abra http://127.0.0.1:5665 logo após iniciar o comando.

Os relatórios em tempo real contêm gráficos interativos sobre:
- Tempo de resposta dos endpoints
- Taxa de sucesso/falha das requisições
- Métricas de performance sob carga
- Validação dos checks definidos nos testes

**Pré-requisitos para testes k6:**
- API rodando (`npm run dev`)
- k6 instalado ([instruções de instalação](https://k6.io/docs/getting-started/installation/))
- Usuários cadastrados (médico e dono) para autenticação


