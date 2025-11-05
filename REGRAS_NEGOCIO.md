# 📋 Documentação das Regras de Negócio

**Sistema:** API Clínica Veterinária  
**Versão:** 1.0.0  
**Data:** Novembro 2025  

---

Aqui você encontrará todas as informações relacionadas às **regras de negócio**, **épicos**, **user stories** e **critérios de aceite** que definem o funcionamento do sistema.

## 🎯 Épicos

### 👤 1. Gestão de Usuários

Controle de acesso e autenticação de usuários do sistema (médicos veterinários e donos de pets).

#### 📝 **User Stories:**

**US001 - Cadastro de Médico Veterinário**
- **Como** um médico veterinário
- **Eu quero** me cadastrar no sistema
- **Para que** eu possa acessar as funcionalidades de gestão da clínica

**US002 - Cadastro de Dono de Pet**
- **Como** um dono de pet
- **Eu quero** me cadastrar no sistema  
- **Para que** eu possa acompanhar o histórico clínico do meu pet

**US003 - Autenticação de Usuários**
- **Como** um usuário do sistema (médico ou dono)
- **Eu quero** fazer login
- **Para que** eu possa acessar as funcionalidades de acordo com meu perfil

#### ✅ **Critérios de Aceite:**

**CA001 - Cadastro de Médico:**
- ✅ Email deve ser único no sistema
- ✅ Senha deve ser criptografada (bcrypt)
- ✅ Campos obrigatórios: nome, email, senha
- ✅ Retorno não deve conter a senha

**CA002 - Cadastro de Dono:**
- ✅ Email deve ser único no sistema
- ✅ Senha deve ser criptografada (bcrypt)
- ✅ Campos obrigatórios: nome, email, senha
- ✅ Retorno não deve conter a senha

**CA003 - Autenticação:**
- ✅ Login funciona para médicos e donos com mesmo endpoint
- ✅ Token JWT válido por 8 horas
- ✅ Token deve conter: id, role, type
- ✅ Credenciais inválidas retornam erro 401

---

### 🐕 2. Gestão de Pacientes (Pets)

Cadastro e consulta de informações dos animais atendidos na clínica.

#### 📝 **User Stories:**

**US004 - Cadastro de Pet**
- **Como** um médico veterinário
- **Eu quero** cadastrar um novo pet no sistema
- **Para que** eu possa iniciar o acompanhamento clínico do animal

**US005 - Consulta de Pets**
- **Como** um médico veterinário
- **Eu quero** visualizar todos os pets cadastrados
- **Para que** eu possa acessar rapidamente as informações dos pacientes

**US006 - Busca de Pets**
- **Como** um médico veterinário
- **Eu quero** buscar pets por nome ou raça
- **Para que** eu possa encontrar rapidamente um paciente específico

**US007 - Histórico do Pet**
- **Como** um dono de pet
- **Eu quero** visualizar o histórico clínico do meu pet
- **Para que** eu possa acompanhar seu estado de saúde

#### ✅ **Critérios de Aceite:**

**CA004 - Cadastro de Pet:**
- ✅ Apenas médicos podem cadastrar pets
- ✅ Dono deve existir no sistema
- ✅ Campos obrigatórios: nome, especie, raca, donoId
- ✅ Pet recebe ID único automaticamente

**CA005 - Listagem de Pets:**
- ✅ Médicos visualizam todos os pets
- ✅ Donos visualizam apenas seus pets
- ✅ Busca funciona por nome e raça (case-insensitive)
- ✅ Retorna array vazio se não encontrar resultados

**CA006 - Histórico do Pet:**
- ✅ Retorna consultas e procedimentos do pet
- ✅ Médicos acessam qualquer histórico
- ✅ Donos acessam apenas histórico de seus pets
- ✅ Erro 404 se pet não existir

---

### 🏥 3. Gestão de Consultas

Registro e acompanhamento das consultas veterinárias realizadas.

#### 📝 **User Stories:**

**US008 - Registro de Consulta**
- **Como** um médico veterinário
- **Eu quero** registrar uma consulta realizada
- **Para que** eu possa manter o histórico clínico do pet atualizado

**US009 - Listagem de Consultas**
- **Como** um médico veterinário
- **Eu quero** visualizar todas as consultas realizadas
- **Para que** eu possa ter uma visão geral dos atendimentos

#### ✅ **Critérios de Aceite:**

**CA007 - Registro de Consulta:**
- ✅ Apenas médicos podem registrar consultas
- ✅ Pet deve existir no sistema
- ✅ Médico é obtido automaticamente do token JWT
- ✅ Campos obrigatórios: petId, data, descricao
- ✅ ID da consulta gerado automaticamente

**CA008 - Listagem de Consultas:**
- ✅ Apenas médicos podem listar consultas
- ✅ Retorna todas as consultas do sistema
- ✅ Retorna array vazio se não houver consultas
- ✅ Requer autenticação JWT válida

---

### 💉 4. Gestão de Procedimentos

Controle dos procedimentos médicos realizados nos pets.

#### 📝 **User Stories:**

**US010 - Registro de Procedimento**
- **Como** um médico veterinário
- **Eu quero** registrar um procedimento realizado
- **Para que** eu possa manter registro completo dos tratamentos

**US011 - Listagem de Procedimentos**
- **Como** um médico veterinário
- **Eu quero** visualizar todos os procedimentos realizados
- **Para que** eu possa acompanhar os tratamentos em andamento

#### ✅ **Critérios de Aceite:**

**CA009 - Registro de Procedimento:**
- ✅ Apenas médicos podem registrar procedimentos
- ✅ Pet deve existir no sistema
- ✅ Médico é obtido automaticamente do token JWT
- ✅ Campos obrigatórios: petId, data, descricao
- ✅ Campo opcional: tipo (ex: "Vacina", "Cirurgia")

**CA010 - Listagem de Procedimentos:**
- ✅ Apenas médicos podem listar procedimentos
- ✅ Retorna todos os procedimentos do sistema
- ✅ Retorna array vazio se não houver procedimentos
- ✅ Requer autenticação JWT válida

---

## 🔐 Regras de Segurança e Autorização

### **RN001 - Controle de Acesso por Perfil**
- **Médicos:** Acesso total a todas as funcionalidades
- **Donos:** Acesso apenas para consulta de dados de seus próprios pets

### **RN002 - Autenticação JWT**
- Todos os endpoints protegidos requerem token JWT válido
- Token expira em 8 horas
- Token deve ser enviado no header Authorization: Bearer {token}

### **RN003 - Criptografia de Senhas**
- Todas as senhas são criptografadas com bcrypt (salt rounds: 8)
- Senhas nunca são retornadas nas responses da API

### **RN004 - Unicidade de Email**
- Emails de médicos e donos devem ser únicos em suas respectivas tabelas
- Sistema diferencia médicos e donos pelo tipo de cadastro

---

## 📊 Regras de Dados

### **RN005 - Geração de IDs**
- Todos os recursos recebem IDs únicos sequenciais
- IDs são strings numéricas ("1", "2", "3"...)
- Contadores separados por tipo de recurso

### **RN006 - Relacionamentos**
- Pet deve ter dono válido (donoId referencia donos.id)
- Consulta deve ter pet válido (petId referencia pets.id)
- Procedimento deve ter pet válido (petId referencia pets.id)
- Consultas e procedimentos são vinculados ao médico autenticado

### **RN007 - Busca e Filtros**
- Busca de pets funciona por nome ou raça
- Busca é case-insensitive
- Busca retorna correspondências parciais (substring)

---

## ⚠️ Regras de Validação

### **RN008 - Campos Obrigatórios**

**Médico:** nome, email, senha  
**Dono:** nome, email, senha  
**Pet:** nome, especie, raca, donoId  
**Consulta:** petId, data, descricao  
**Procedimento:** petId, data, descricao  

### **RN009 - Tratamento de Erros**
- 400: Dados inválidos ou recursos não encontrados
- 401: Token inválido ou não fornecido
- 403: Acesso negado (perfil insuficiente)
- 404: Recurso não encontrado
- 500: Erro interno do servidor

---

## 🎯 Status de Implementação

| Épico | User Stories | Status |
|-------|-------------|---------|
| **Gestão de Usuários** | US001, US002, US003 | ✅ **Completo** |
| **Gestão de Pacientes** | US004, US005, US006, US007 | ✅ **Completo** |
| **Gestão de Consultas** | US008, US009 | ✅ **Completo** |
| **Gestão de Procedimentos** | US010, US011 | ✅ **Completo** |

### 📋 **Cobertura de Testes:**
- ✅ **12 testes funcionais** implementados no Postman
- ✅ **4 testes de performance** k6 implementados
- ✅ **Todos os endpoints** testados e validados
- ⚠️ **1 issue conhecida:** Inconsistência na autenticação via Headers

---

## 🚀 Próximas Evoluções

### **Épicos Futuros:**

**5. Gestão de Agendamentos**
- Agendamento de consultas
- Controle de disponibilidade
- Notificações de lembrete

**6. Gestão Financeira**
- Controle de pagamentos
- Relatórios financeiros
- Gestão de convênios

**7. Relatórios e Analytics**
- Relatórios de atendimento
- Dashboard gerencial
- Indicadores de performance

---

*Documento criado com base na API implementada e testes realizados em Novembro 2025.*