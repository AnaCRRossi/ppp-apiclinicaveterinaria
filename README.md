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

Observações

- Para simplicidade, o JWT secret padrão está embutido no código (`trocar_esse_segredo_em_producao`). Em produção, definir `JWT_SECRET`.
- O banco de dados é em memória; para persistência, substituir por uma camada de armazenamento.
