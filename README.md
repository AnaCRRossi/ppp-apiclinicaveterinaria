# PPP - API Clínica Veterinária

Projeto: API REST para acompanhamento do quadro clínico de pacientes de uma clínica veterinária.

## 🚀 Principais Funcionalidades

- ✅ **Autenticação via JWT** (médicos e donos)
- ✅ **Controle de acesso por perfil** (médicos: acesso total | donos: consulta apenas)
- ✅ **CRUD completo** para pets, consultas e procedimentos
- ✅ **Endpoints GET** para listagem de consultas e procedimentos
- ✅ **Documentação Swagger** interativa
- ✅ **Testes de performance** com k6
- ✅ **Testes funcionais** com Postman
- ⚠️ **Armazenamento em memória** (dados perdidos ao reiniciar)

## 📋 Endpoints Disponíveis

### 🔐 **Autenticação**
- `POST /auth/medico/register` - Registrar médico veterinário
- `POST /auth/dono/register` - Registrar dono de pet
- `POST /auth/login` - Login (médico ou dono)

### 🐕 **Pets**
- `POST /pets` - Criar pet (apenas médico)
- `GET /pets` - Listar/buscar pets (médico: todos | dono: seus pets)
- `GET /pets/:id` - Obter pet específico e histórico

### 🏥 **Consultas**
- `POST /consultas` - Registrar consulta (apenas médico)
- `GET /consultas` - **[NOVO]** Listar todas as consultas (apenas médico)

### 💉 **Procedimentos**
- `POST /procedimentos` - Registrar procedimento (apenas médico)
- `GET /procedimentos` - **[NOVO]** Listar todos os procedimentos (apenas médico)

## ⚙️ Como rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie a API:**
   ```bash
   npm start
   # ou para desenvolvimento (com auto-reload):
   npm run dev
   ```

3. **Acesse a documentação:**
   - **Swagger UI**: http://localhost:3000/docs

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
- API rodando (`npm start`)
- k6 instalado ([instruções de instalação](https://k6.io/docs/getting-started/installation/))
- Usuários cadastrados (médico e dono) para autenticação

## 🧪 Testes Funcionais (Postman)

Os testes funcionais validam o comportamento correto de todos os endpoints da API através do Postman.

### 📝 **Coleção de Testes Implementada:**

| # | Teste | Endpoint | Método | Status |
|---|-------|----------|--------|--------|
| 1 | Registrar Médico | `/auth/medico/register` | POST | ✅ |
| 2 | Registrar Dono | `/auth/dono/register` | POST | ✅ |
| 3 | Login Médico | `/auth/login` | POST | ✅ |
| 4 | Criar Pet | `/pets` | POST | ✅ |
| 5 | Criar Consulta | `/consultas` | POST | ✅ |
| 6 | Criar Procedimento | `/procedimentos` | POST | ✅ |
| 7 | Listar Pets | `/pets` | GET | ✅ |
| **8** | **Listar Consultas** | `/consultas` | **GET** |
| **9** | **Listar Procedimentos** | `/procedimentos` | **GET** |
| 10 | Erro - Pet sem Token | `/pets` | POST | ✅ |
| 12 | Erro - Pet com Dono Inexistente | `/pets` | POST | ✅ |

### 🚀 **Como executar os testes:**

1. **Inicie a API:**
   ```bash
   npm start
   ```

2. **Configure o Postman:**
   - **Base URL**: `http://localhost:3000`
   - **Environment Variable**: 
     - `baseUrl`: `http://localhost:3000`
     - `token`: (será preenchido após login)

3. **Fluxo de testes recomendado:**
   
   **📋 Pré-requisitos:**
   - ✅ Registrar médico (`POST /auth/medico/register`)
   - ✅ Fazer login (`POST /auth/login`) → Copiar token
   
   **🧪 Testes principais:**
   - ✅ Criar recursos (pets, consultas, procedimentos)
   - ✅ **Listar consultas** (`GET /consultas`) → Deve retornar array
   - ✅ **Listar procedimentos** (`GET /procedimentos`) → Deve retornar array
   - ✅ Testar cenários de erro (sem token, dados inválidos)

### 🔐 **Configuração de Autenticação:**

**⚠️ Importante**: Use a **aba Authorization** no Postman para configurar o token:

1. **Type**: Bearer Token
2. **Token**: Cole o JWT obtido no login (sem "Bearer ")

**Evite** configurar Authorization na aba Headers para prevenir inconsistências.

### 📊 **Resultados dos Testes:**

- ✅ **Todos os endpoints básicos funcionais**
- ✅ **Novos endpoints GET implementados e testados**
- ✅ **Autenticação JWT funcionando corretamente**
- ✅ **Controle de acesso por perfil validado**
- ⚠️ **Issue reportada**: Inconsistência na autenticação via Headers vs Authorization

## 🆕 Changelog - Latest Updates

### **Novembro 2025** - Branch `tests/api`

#### ✨ **Funcionalidades Adicionadas:**
- **Endpoint GET /consultas**: Listagem de todas as consultas (apenas médicos)
- **Endpoint GET /procedimentos**: Listagem de todos os procedimentos (apenas médicos)
- **Testes Postman completos**: 12 testes cobrindo todos os cenários principais
- **Validação de autenticação**: Endpoints protegidos por JWT

#### 🐛 **Issues Identificadas:**
- **#1**: Inconsistência na autenticação JWT entre diferentes métodos de configuração no Postman

#### 🧪 **Testes Implementados:**
- **Testes funcionais**: Cobertura completa dos endpoints via Postman
- **Testes de erro**: Validação de cenários de falha (token inválido, recursos inexistentes)
- **Testes de autorização**: Validação de controle de acesso por perfil

#### 📚 **Documentação:**
- README atualizado com endpoints GET
- Guia completo de testes Postman
- Documentação de configuração de autenticação

---

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 🎯 Próximos Passos

- [ ] Resolver issue de inconsistência na autenticação
- [ ] Implementar banco de dados persistente
- [ ] Adicionar validações mais robustas
- [ ] Implementar testes automatizados (Jest)
- [ ] Deploy para produção