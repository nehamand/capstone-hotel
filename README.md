# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
link api aqui

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![der](https://github.com/nehamamandelbaum/capstone-hotel/blob/readme/src/img/der%20new.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---
## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Clientes](#1-clients)
    - [POST - /clients](#11-criação-de-clientes)
    - [GET - /clients](#12-listando-clientes)
    - [GET - /clients/:id](#13-listar-clientes-por-id)
    - [PATCH - /clients/:id](#14-atualizar-dados-clientes)
    - [DELETE - /clients/:id](#15-desativar-clientes)
- [Quartos](#2-bedroom)
    - [POST - /bedroom](#16-criação-de-quartos)
    - [GET - /bedroom](#17-listando-quartos)
    - [GET - /bedroom/:id](#18-listar-quartos-por-id)
    - [PATCH - /bedroom/:id](#19-atualizar-dados-quartos)
    - [DELETE - /bedroom/:id](#20-desativar-quartos)
- [Serviço contratado](#4-hired_service)
    - [POST - /clients](#21-criação-de-clientes)
    - [GET - /clients](#22-listando-clientes)
    - [GET - /clients/:id](#23-listar-clientes-por-id)
    - [PATCH - /clients/:id](#24-atualizar-dados-clientes)
    - [DELETE - /clients/:id](#25-desativar-clientes)
- [Empregados](#3-employees)
    - [POST - /employees](#26-criação-de-funcionarios)
    - [GET - /employees](#27-listando-funcionarios)
    - [GET - /employees/:id](#28-listar-funcionarios-por-id)
    - [PATCH - /employees/:id](#29-atualizar-dados-funcionarios)
    - [DELETE - /employees/:id](#30-desativar-funcionarios)
- [Serviços](#4-services)
    - [POST - /services](#31-criação-de-servico)
    - [GET - /services](#32-listando-servicos)
    - [GET - /services/:id](#33-listar-servico-por-id)
    - [PATCH - /services/:id](#34-atualizar-dados-servicos)
    - [DELETE - /services/:id](#35-desativar-servicos)

---

## 1. **Clientes**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo          | Tipo    | Descrição                                       |
| ---------------|---------|-------------------------------------------------|
| name           | string  | O nome do usuário.                              |
| birthDate      | date    | Data de aniversário no formato yyyy-mm-dd       |
| cpf            | string  | Número com 11 digitos                           |
| cellphone      | string  | Número de telefone celular                      |
| bedroom_id     | string  | UUID do quarto definido                         |

### Endpoints

| Método      | Rota         | Descrição                                        |
|-------------|--------------|--------------------------------------------------|
| POST        | /clients     | Criação de um clientes                           |
| GET         | /clients     | Lista todos os clientes                          |
| GET         | /clients/:id | Lista um cliente usando seu ID como parâmetro    | 
| PATCH       | /clients/:id | atualiza um cliente usando seu ID como parâmetro | 
| DELETE      | /clients/:id | deleta um cliente usando seu ID como parâmetro   | 

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "eDuArDo",
	"email": "edu@mail.com",
	"password": "1234",
	"isAdm": true
}
```

### Schema de Validação com Yup:
```javascript
name: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return titlelify(originalValue) 
	}),
email: yup
        .string()
	.email()
	.required()
	.transform((value, originalValue) => { 
		return originalValue.toLowerCase() 
	}),
password: yup
        .string()
	.required()
	.transform((value, originalValue) => { 
		return bcrypt.hashSync(originalValue, 10) 
	}),
isAdm: yup
        .boolean()
	.required(),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
		"name": "Eduardo",
		"email": "edu@mail.com",
		"isAdm": true
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |
