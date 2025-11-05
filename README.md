# 🏥 API Clínica Veterinária

API RESTful para gerenciamento de clínica veterinária com sistema de autenticação e autorização baseado em roles (médico/dono).

## 🚀 Funcionalidades Implementadas

- ✅ **Sistema de Autenticação JWT** (médicos e donos de pets)
- ✅ **Controle de Acesso por Roles** (médicos: acesso completo | donos: acesso limitado aos próprios pets)
- ✅ **Gestão de Pets** (criação, listagem, busca e histórico)
- ✅ **Registro de Consultas** (médicos podem registrar e listar)
- ✅ **Registro de Procedimentos** (médicos podem registrar e listar)
- ✅ **Documentação Swagger** completa e interativa
- ✅ **Testes Automatizados** (22 testes com 91% de aprovação)
- ✅ **Armazenamento em Memória** (isolamento total para testes)

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
- `GET /consultas` - Listar todas as consultas (apenas médico)

### 💉 **Procedimentos**  
- `POST /procedimentos` - Registrar procedimento (apenas médico)
- `GET /procedimentos` - Listar todos os procedimentos (apenas médico)

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

### 📊 **Status Atual dos Testes**

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

### 📈 **Como Interpretar os Resultados**

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

## �️ Arquitetura da API

### **📁 Estrutura do Projeto**
```
src/
├── app.js                 # Servidor Express e configurações
├── controllers/           # Lógica de controle das rotas
│   ├── authController.js     # Autenticação (login/registro)
│   ├── petController.js      # Gestão de pets
│   ├── consultaController.js # Gerenciamento de consultas
│   └── procedimentoController.js # Gerenciamento de procedimentos
├── services/              # Regras de negócio
│   ├── authService.js        # Lógica de autenticação
│   ├── petService.js         # Lógica de pets
│   ├── consultaService.js    # Lógica de consultas
│   └── procedimentoService.js # Lógica de procedimentos
├── routes/                # Definição das rotas
│   ├── auth.js              # Rotas de autenticação
│   ├── pets.js              # Rotas de pets
│   ├── consultas.js         # Rotas de consultas
│   └── procedimentos.js     # Rotas de procedimentos
├── middlewares/           # Middlewares customizados
│   └── auth.js              # Middleware de autenticação/autorização
└── models/                # Modelo de dados
    └── db.js                # Banco de dados em memória
```

### **🔐 Sistema de Autenticação**
- **JWT (JSON Web Tokens)** para autenticação stateless
- **Roles baseados em usuário**: `medico` e `dono`
- **Middleware de autorização** que controla acesso por endpoint
- **Hash de senhas** usando bcryptjs

### **🛡️ Controle de Acesso**
| Recurso | Médico | Dono |
|---------|--------|------|
| Criar pets | ✅ | ❌ |
| Listar pets | ✅ (todos) | ✅ (apenas seus) |
| Ver pet específico | ✅ (todos) | ✅ (apenas seus) |
| Registrar consultas | ✅ | ❌ |
| Listar consultas | ✅ | ❌ |
| Registrar procedimentos | ✅ | ❌ |
| Listar procedimentos | ✅ | ❌ |

---

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 🛠️ Tecnologias Utilizadas

### **🔧 Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **JWT** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **Morgan** - Logger de requisições HTTP
- **CORS** - Cross-Origin Resource Sharing

### **📚 Documentação**
- **Swagger/OpenAPI 3.0** - Documentação interativa da API
- **YAML** - Formato de configuração do Swagger

### **🧪 Testes**
- **Mocha** - Framework de testes JavaScript
- **Chai** - Biblioteca de assertions
- **SuperTest** - Cliente HTTP para testes de API
- **Helpers customizados** - Utilitários para facilitar os testes

### **💾 Armazenamento**
- **Memória** - Banco de dados em memória para desenvolvimento e testes
- **Isolamento total** - Dados resetados a cada execução de teste

## 🎯 Próximos Passos

- [ ] **Corrigir bugs de validação** identificados pelos testes automatizados
- [ ] **Implementar banco de dados persistente** (PostgreSQL/MySQL)
- [ ] **Expandir cobertura de testes** para endpoints de pets, consultas e procedimentos
- [ ] **Adicionar testes unitários** para services e controllers
- [ ] **Implementar validação de entrada** com bibliotecas como Joi ou Yup
- [ ] **Deploy para produção** com pipeline de testes