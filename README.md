# PPP - API Clínica Veterinária

Projeto: API REST para acompanhamento do quadro clínico de pacientes de uma clínica veterinária.

## 🚀 Principais Funcionalidades

- ✅ **Autenticação via JWT** (médicos e donos)
- ✅ **Controle de acesso por perfil** (médicos: acesso total | donos: consulta apenas)
- ✅ **CRUD completo** para pets, consultas e procedimentos
- ✅ **Endpoints GET** para listagem de consultas e procedimentos
- ✅ **Documentação Swagger** interativa
- ✅ **Testes automatizados** com Mocha/Chai/SuperTest
- ✅ **Testes de performance** com k6
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

3. **Execute os testes:**
   ```bash
   # Testes principais (autenticação + autorização)
   npm run test:principais
   
   # Todos os testes funcionais
   npm test
   
   # Testes específicos
   npm run test:auth        # Apenas autenticação
   npm run test:authorization  # Apenas autorização
   ```

4. **Acesse a documentação:**
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

## 🧪 Testes Automatizados

Este projeto implementa uma **suíte completa de testes automatizados** utilizando **Mocha**, **Chai** e **SuperTest** para garantir a qualidade e confiabilidade da API.

### � **Estrutura dos Testes**

```
tests/
├── supertest/
│   ├── helpers/              # Utilitários de apoio
│   │   ├── setup.js         # Configuração base dos testes
│   │   ├── fixtures.js      # Dados de teste padronizados
│   │   └── auth-helper.js   # Utilitários de autenticação
│   └── funcional/           # Testes funcionais da API
│       ├── autenticacao.test.js  # Testes de login e registro
│       └── autorizacao.test.js   # Testes de controle de acesso
└── k6/                      # Testes de performance
```

### 🚀 **Scripts de Teste Disponíveis**

```bash
# 📊 PRINCIPAIS - Executa testes essenciais (autenticação + autorização)
npm run test:principais

# 🔄 TODOS - Executa toda a suíte de testes funcionais
npm test

# 🔐 ESPECÍFICOS - Executa testes por categoria
npm run test:auth          # Apenas autenticação (login, registro, validação)
npm run test:authorization # Apenas autorização (controle de acesso)

# 👀 MODO WATCH - Executa testes automaticamente ao salvar arquivos
npm run test:watch
```

### 📋 **Cobertura de Testes Implementada**

#### **🔐 Testes de Autenticação** (`autenticacao.test.js`)
- ✅ **Login de usuários** (médico e dono)
- ✅ **Registro de médicos** e **donos**
- ✅ **Validação de credenciais** (sucesso e erro)
- ✅ **Verificação de tokens JWT**
- ✅ **Detecção de emails duplicados**
- ❌ **Validação de dados de entrada** (2 bugs identificados)

#### **🛡️ Testes de Autorização** (`autorizacao.test.js`)
- ✅ **Controle de acesso por perfil** (médico vs dono)
- ✅ **Proteção de endpoints** sem token
- ✅ **Validação de tokens inválidos**
- ✅ **Acesso a recursos protegidos**
- ✅ **Criação de pets** com permissões adequadas

### � **Status Atual dos Testes**

```
✅ 20 testes passando (91%)
❌ 2 testes falhando (9%)

Testes por categoria:
🔐 Autenticação:  10/12 (83%) - 2 bugs de validação identificados
🛡️ Autorização:   10/10 (100%) - Todos os controles funcionando
```

### 🐛 **Bugs Identificados pelos Testes**

Os testes automatizados identificaram **2 bugs reais** na validação da API:

1. **❌ Validação de Email Inválido**
   - **Problema**: API aceita emails sem formato válido (ex: "email-sem-arroba")
   - **Esperado**: Retornar erro 400 com mensagem de email inválido
   - **Atual**: Retorna 201 (sucesso) e cria usuário

2. **❌ Validação de Nome Vazio**
   - **Problema**: API aceita registro com campo nome vazio
   - **Esperado**: Retornar erro 400 com mensagem de nome obrigatório
   - **Atual**: Retorna 201 (sucesso) e cria usuário

### 🛠️ **Utilitários de Teste (Helpers)**

#### **`setup.js`** - Configuração Base
- Configuração do Chai + SuperTest
- Função `clearDatabase()` para isolamento entre testes
- Exporta `expect` e `request` para uso nos testes

#### **`fixtures.js`** - Dados Padronizados
- Dados válidos para médicos, donos, pets, consultas e procedimentos
- Múltiplas variações para cenários diversos
- Dados inválidos para testes de erro
- Credenciais de login centralizadas

#### **`auth-helper.js`** - Utilitários de Autenticação
- `createMedicoAndLogin()` - Registra médico + retorna token
- `createDonoAndLogin()` - Registra dono + retorna token
- `createCompleteSetup()` - Setup completo (médico, dono, pet)
- `authenticatedRequest()` - Helper para requisições autenticadas

### 🎯 **Benefícios dos Testes Automatizados**

- **🔍 Detecção precoce de bugs** - Encontrou 2 problemas de validação
- **🛡️ Confiabilidade** - Garante que mudanças não quebrem funcionalidades
- **📚 Documentação viva** - Testes servem como documentação dos requisitos
- **🚀 Deploy seguro** - Validação automática antes de releases
- **🔄 Regressão** - Evita que bugs corrigidos voltem a aparecer

### � **Como Interpretar os Resultados**

```bash
# Execução bem-sucedida mostra:
✔ Deve retornar 200 com um token em string quando usuario e senha válidos
✔ Deve permitir acesso para médico autenticado
✔ Deve negar acesso para dono de pet

# Bugs identificados mostram:
1) Deve retornar erro 400 quando email tem formato inválido
   AssertionError: expected 201 to equal 400
   
2) Deve retornar erro 400 quando nome está vazio  
   AssertionError: expected 201 to equal 400
```

Esta implementação representa um **caso realista** onde a maioria dos testes passa (91%), mas ainda existem alguns problemas de validação que foram identificados e documentados pelos testes.

## 🆕 Changelog - Latest Updates

### **Novembro 2025** - Branch `tests/api`

#### ✨ **Principais Implementações:**

**🧪 Suíte de Testes Automatizados**
- **Framework**: Mocha + Chai + SuperTest para testes de integração
- **Estrutura organizada**: Helpers para reutilização e fixtures para dados padronizados
- **22 testes implementados**: Cobertura completa de autenticação e autorização
- **Scripts personalizados**: `test:principais`, `test:auth`, `test:authorization`
- **Isolamento**: Limpeza automática do banco entre testes

**🔐 Testes de Autenticação**
- Login e registro de médicos e donos
- Validação de tokens JWT
- Detecção de emails duplicados
- Verificação de credenciais inválidas
- Testes de validação de entrada de dados

**🛡️ Testes de Autorização**
- Controle de acesso por perfil (médico vs dono)
- Proteção de endpoints sem autenticação
- Validação de tokens inválidos
- Permissões específicas para criação de recursos

**🛠️ Infraestrutura de Testes**
- **Helpers organizados**: `setup.js`, `fixtures.js`, `auth-helper.js`
- **Dados padronizados**: Fixtures centralizados para consistência
- **Utilitários de autenticação**: Funções helper para login automatizado
- **Limpeza automática**: Reset do banco entre cada teste

#### 🐛 **Bugs Identificados pelos Testes:**
- **Validação de email**: API aceita emails com formato inválido
- **Validação de nome**: API aceita registro com nome vazio
- **Status**: 91% dos testes passando (20/22) - bugs documentados para correção

#### 📊 **Melhorias na Qualidade:**
- **Detecção precoce**: Bugs encontrados automaticamente pelos testes
- **Documentação viva**: Testes servem como especificação dos requisitos
- **Regressão**: Prevenção de bugs em futuras alterações
- **Confiabilidade**: Validação automática de funcionalidades críticas

#### �️ **Reorganização do Projeto:**
- Pasta `integration` renomeada para `funcional` (mais intuitivo)
- Estrutura de helpers bem definida e documentada
- Scripts npm organizados e com nomes em português
- README completamente reescrito com foco nos testes automatizados

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

- [ ] **Corrigir bugs de validação** identificados pelos testes automatizados
- [ ] **Implementar banco de dados persistente** (PostgreSQL/MySQL)
- [ ] **Expandir cobertura de testes** para endpoints de pets, consultas e procedimentos
- [ ] **Adicionar testes unitários** para services e controllers
- [ ] **Implementar CI/CD** com execução automática dos testes
- [ ] **Deploy para produção** com pipeline de testes