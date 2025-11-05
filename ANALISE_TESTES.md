# 🧪 Análise de Testes - Partição de Equivalência e Tabela de Decisão

**Projeto:** API Clínica Veterinária  
**Objetivo:** Definir casos de teste sistemáticos usando técnicas de caixa preta  
**Data:** Novembro 2025

---

## 📊 1. PARTIÇÃO DE EQUIVALÊNCIA

### 🔐 **Endpoint: POST /auth/medico/register**

| Campo | Partições Válidas | Partições Inválidas | Casos de Teste |
|-------|-------------------|---------------------|----------------|
| **nome** | • String 1-100 chars<br>• Caracteres alfanuméricos e espaços | • Campo vazio/null<br>• String >100 chars<br>• Apenas números<br>• Caracteres especiais | CT001, CT002, CT003 |
| **email** | • Formato válido: user@domain.com<br>• Email único no sistema | • Formato inválido<br>• Email duplicado<br>• Campo vazio/null<br>• Sem @ ou domínio | CT004, CT005, CT006 |
| **senha** | • String 6-50 chars<br>• Qualquer caractere | • Campo vazio/null<br>• String <6 chars<br>• String >50 chars | CT007, CT008, CT009 |

**Casos de Teste Identificados:**
- **CT001** ✅ Nome válido: "Dr. João Silva"
- **CT002** ❌ Nome vazio: ""
- **CT003** ❌ Nome muito longo: "A"*101
- **CT004** ✅ Email válido: "joao@email.com"
- **CT005** ❌ Email inválido: "email-sem-arroba"
- **CT006** ❌ Email duplicado: mesmo email 2x
- **CT007** ✅ Senha válida: "123456"
- **CT008** ❌ Senha curta: "12345"
- **CT009** ❌ Senha vazia: null

---

### 🐕 **Endpoint: POST /pets**

| Campo | Partições Válidas | Partições Inválidas | Casos de Teste |
|-------|-------------------|---------------------|----------------|
| **nome** | • String 1-50 chars<br>• Letras, números, espaços | • Campo vazio/null<br>• String >50 chars<br>• Apenas símbolos | CT010, CT011, CT012 |
| **especie** | • "Cachorro"<br>• "Gato"<br>• "Pássaro"<br>• "Outros" | • Campo vazio/null<br>• Números<br>• Caracteres especiais<br>• String muito longa | CT013, CT014, CT015 |
| **raca** | • String 1-30 chars<br>• Qualquer texto válido | • Campo vazio/null<br>• String >30 chars | CT016, CT017, CT018 |
| **donoId** | • ID existente ("1", "2", etc) | • ID inexistente ("999")<br>• Campo vazio/null<br>• Formato inválido ("abc") | CT019, CT020, CT021 |
| **token** | • Token JWT válido de médico | • Token inválido<br>• Token de dono<br>• Sem token | CT022, CT023, CT024 |

**Casos de Teste Identificados:**
- **CT010** ✅ Nome válido: "Rex"
- **CT011** ❌ Nome vazio: ""
- **CT012** ❌ Nome longo: "A"*51
- **CT013** ✅ Espécie válida: "Cachorro"
- **CT014** ❌ Espécie inválida: "123"
- **CT015** ❌ Espécie vazia: null
- **CT016** ✅ Raça válida: "SRD"
- **CT017** ❌ Raça vazia: ""
- **CT018** ❌ Raça longa: "A"*31
- **CT019** ✅ DonoId existente: "1"
- **CT020** ❌ DonoId inexistente: "999"
- **CT021** ❌ DonoId inválido: "abc"
- **CT022** ✅ Token médico válido
- **CT023** ❌ Token de dono
- **CT024** ❌ Sem token

---

### 🏥 **Endpoint: GET /consultas**

| Campo | Partições Válidas | Partições Inválidas | Casos de Teste |
|-------|-------------------|---------------------|----------------|
| **Authorization** | • Token JWT médico válido<br>• Token não expirado | • Token de dono<br>• Token inválido/expirado<br>• Sem token<br>• Formato incorreto | CT025, CT026, CT027 |

**Casos de Teste Identificados:**
- **CT025** ✅ Token médico válido
- **CT026** ❌ Token de dono (403)
- **CT027** ❌ Sem token (401)

---

## 📋 2. TABELAS DE DECISÃO

### 🔐 **Tabela 1: Autenticação POST /auth/login**

| Condições | R1 | R2 | R3 | R4 | R5 | R6 |
|-----------|----|----|----|----|----|----|
| Email formato válido? | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Email existe no sistema? | ✅ | ✅ | ❌ | - | ✅ | ✅ |
| Senha correta? | ✅ | ❌ | - | - | ❌ | ✅ |
| Usuário é médico? | ✅ | ✅ | - | - | ❌ | ❌ |
| **Ações** |
| Status Code | 200 | 401 | 401 | 400 | 401 | 200 |
| Retorna token? | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Role no token | medico | - | - | - | - | dono |
| Mensagem | Login OK | Credenciais inválidas | Credenciais inválidas | Email inválido | Credenciais inválidas | Login OK |

**Casos de Teste:**
- **CT028** (R1): Login médico válido → 200 + token
- **CT029** (R2): Médico senha errada → 401
- **CT030** (R3): Email não existe → 401
- **CT031** (R4): Email inválido → 400
- **CT032** (R5): Dono senha errada → 401
- **CT033** (R6): Login dono válido → 200 + token

---

### 🐕 **Tabela 2: Criação de Pet POST /pets**

| Condições | R1 | R2 | R3 | R4 | R5 | R6 |
|-----------|----|----|----|----|----|----|
| Token válido? | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Token é de médico? | ✅ | ❌ | ✅ | - | ✅ | ✅ |
| Dados pet válidos? | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| DonoId existe? | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Ações** |
| Status Code | 201 | 403 | 400 | 401 | 400 | 201 |
| Pet criado? | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Retorna pet? | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Mensagem | Sucesso | Acesso negado | Dados inválidos | Token inválido | Dono não encontrado | Sucesso |

**Casos de Teste:**
- **CT034** (R1): Médico cria pet válido → 201
- **CT035** (R2): Dono tenta criar pet → 403
- **CT036** (R3): Dados inválidos → 400
- **CT037** (R4): Sem token → 401
- **CT038** (R5): Dono inexistente → 400

---

### 🏥 **Tabela 3: Acesso a Recursos GET /consultas, /procedimentos**

| Condições | R1 | R2 | R3 | R4 |
|-----------|----|----|----|----|
| Token presente? | ✅ | ✅ | ❌ | ✅ |
| Token válido? | ✅ | ✅ | - | ❌ |
| Token é de médico? | ✅ | ❌ | - | ✅ |
| **Ações** |
| Status Code | 200 | 403 | 401 | 401 |
| Retorna dados? | ✅ | ❌ | ❌ | ❌ |
| Mensagem | Sucesso | Acesso negado | Token não fornecido | Token inválido |

**Casos de Teste:**
- **CT039** (R1): Médico acessa → 200 + dados
- **CT040** (R2): Dono tenta acessar → 403
- **CT041** (R3): Sem token → 401
- **CT042** (R4): Token inválido → 401

---

## 🎯 3. RESUMO DOS TESTES AUTOMATIZADOS

### **Total de Casos Identificados: 42 testes**

| Categoria | Quantidade | Prioridade |
|-----------|------------|------------|
| **Autenticação** | 15 testes | 🔴 CRÍTICA |
| **Autorização** | 8 testes | 🔴 CRÍTICA |
| **Criação de Pets** | 12 testes | 🟡 ALTA |
| **Validação de Dados** | 7 testes | 🟡 ALTA |

### **Distribuição por Status Esperado:**
- ✅ **Casos Positivos**: 12 testes (sucesso esperado)
- ❌ **Casos Negativos**: 30 testes (erro esperado)

---

## 🚀 4. IMPLEMENTAÇÃO RECOMENDADA

### **Fase 1 - Testes Críticos (Prioridade Máxima)**
```javascript
// Implementar imediatamente
- CT028-CT033: Autenticação completa
- CT022-CT024: Autorização de pets
- CT039-CT042: Autorização de consultas/procedimentos
```

### **Fase 2 - Validação de Dados (Prioridade Alta)**
```javascript
// Implementar em seguida  
- CT001-CT009: Validação registro médico
- CT010-CT021: Validação criação pets
- CT034-CT038: Cenários complexos pets
```

### **Estrutura de Arquivos Sugerida:**
```
tests/supertest/integration/
├── auth-equivalence.test.js      # CT001-CT009, CT028-CT033
├── pets-equivalence.test.js      # CT010-CT024, CT034-CT038  
├── authorization.test.js         # CT039-CT042
└── data-validation.test.js       # Casos edge adicionais
```

---

**Próximo passo**: Implementar os testes da Fase 1 usando essas especificações! 🎯