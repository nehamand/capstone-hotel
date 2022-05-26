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

## 2. URL base da aplicação:

https://api-hotel-caps.herokuapp.com/

---

## 3. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![der](https://github.com/nehamamandelbaum/capstone-hotel/blob/readme/src/img/der%20new.png)

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Faça login utilizando o endpoint /sessions, passando o cpf e a password, nesse formato:

```
{
	"cpf": "66666666666",
	"password": "senhaforte"
}
```

A resposta da requisição virá nesse formato:

```
{
	"employee": {
		"id": "faaea679-98a8-45ca-b0b6-1cce525aa7f0",
		"name": "Nehama",
		"cpf": "66666666666",
		"admin": true,
		"status": true,
		"created_at": "2022-05-20T13:52:34.608Z",
		"updated_at": "2022-05-20T13:52:34.608Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTM0ODg4MTYsImV4cCI6MTY1Mzc0ODAxNiwic3ViIjoiZmFhZWE2NzktOThhOC00NWNhLWIwYjYtMWNjZTUyNWFhN2YwIn0.Y5YnEp5jz_0o1e4x1WmYv4tLd5-9etxQDyULC3LaLL8"
}
```

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Clientes](#1-clients)
  - [POST - /clients](#11-criação-de-clientes)
  - [GET - /clients](#12-listando-clientes)
  - [GET - /clients/:id](#13-listar-clientes-por-id)
  - [PATCH - /clients/:id](#14-atualizar-clientes-por-id)
  - [PATCH - /clients/joinbedroom/:id](#14-atualizar-clientes-por-id)
  - [DELETE - /clients/:id](#15-desativar-clientes)
- [Quartos](#2-bedrooms)
  - [POST - /bedrooms](#21-criação-de-quartos)
  - [GET - /bedrooms](#22-listando-quartos)
  - [GET - /bedrooms/:id](#23-listar-quartos-por-id)
  - [PATCH - /bedrooms/:id](#24-atualizar-dados-quartos)
  - [DELETE - /bedrooms/:id](#25-desativar-quartos)
- [Serviços contratado](#3-hired_services)
  - [POST - /hireds](#31-criação-de-contratos)
  - [GET - /hireds](#32-listando-contratos)
  - [GET - /hireds/:id](#33-listar-contratos-por-id)
  - [DELETE - /hireds/:id](#34-desativar-contratos)
- [Empregados](#4-employees)
  - [POST - /employees](#41-criação-de-funcionarios)
  - [GET - /employees](#42-listando-funcionarios)
  - [GET - /employees/:id](#43-listar-funcionarios-por-id)
  - [PATCH - /employees/:id](#44-atualizar-dados-funcionarios)
  - [DELETE - /employees/:id](#45-desativar-funcionarios)
- [Serviços](#5-services)
  - [POST - /services](#51-criação-de-servico)
  - [GET - /services](#52-listando-servicos)
  - [GET - /services/:id](#53-listar-servico-por-id)
  - [PATCH - /services/:id](#54-atualizar-dados-servicos)
  - [DELETE - /services/:id](#55-desativar-servicos)

---

## 1. **Clientes**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto clients é definido como:

| Campo     | Tipo   | Descrição                                 |
| --------- | ------ | ----------------------------------------- |
| name      | string | O nome do usuário.                        |
| birthDate | string | Data de aniversário no formato YYYY-MM-DD |
| cpf       | string | Número com 11 digitos                     |
| cellphone | string | Número de telefone celular                |

### Endpoints

| Método | Rota                     | Descrição                                        |
| ------ | ------------------------ | ------------------------------------------------ |
| POST   | /clients                 | Criação de um clientes                           |
| GET    | /clients                 | Lista todos os clientes                          |
| GET    | /clients/:id             | Lista um cliente usando seu ID como parâmetro    |
| PATCH  | /clients/:id             | atualiza um cliente usando seu ID como parâmetro |
| PATCH  | /clients/joinbedroom/:id | coloca o cliente dentro de um quarto             |
| DELETE | /clients/:id             | desativa um cliente usando seu ID como parâmetro |

---

### 1.1. **Criação de Clientes**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
POST /clientes
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "bryan",
  "birthDate": "30/10/2002",
  "cpf": "16712345245",
  "cellphone": "68999943321"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "bryan",
  "birthDate": "30/10/2002",
  "cpf": "16712345245",
  "cellphone": "68999943321",
  "id": "dd622e7a-e0df-470e-8834-91b5320ba970",
  "created_at": "2022-05-18T00:36:36.901Z",
  "updated_at": "2022-05-18T00:36:36.901Z",
  "status": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição                    |
| -------------- | ---------------------------- |
| 409 Conflict   | cpf already registered       |
| 409 Conflict   | cellphone already registered |

---

### 1.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
GET /clients
Host: link da api
Authorization: `Bearer {token}`
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
    "id": "1ee98f55-c042-4672-a91e-d464b7c32e4b",
    "name": "example1",
    "cpf": "00000000000",
    "birthDate": "2000-11-11T05:00:00.000Z",
    "cellphone": "00000000000",
    "created_at": "2022-05-17T23:58:32.438Z",
    "updated_at": "2022-05-17T23:58:32.438Z",
    "status": true,
    "hired_services": []
  },
  {
    "id": "dd622e7a-e0df-470e-8834-91b5320ba970",
    "name": "example2",
    "cpf": "11111111111",
    "birthDate": "2001-11-11T04:31:12.000Z",
    "cellphone": "11111111111",
    "created_at": "2022-05-18T00:36:36.901Z",
    "updated_at": "2022-05-18T00:36:36.901Z",
    "status": true,
    "hired_services": []
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | JWT is missing. |
| 400 Bad Request  | Invalid Token   |

---

### 1.3. **Listar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
GET /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: `Bearer Token`
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do cliente |

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
  "id": "1ee98f55-c042-4672-a91e-d464b7c32e4b",
  "name": "example1",
  "cpf": "00000000000",
  "birthDate": "2000-11-11T05:00:00.000Z",
  "cellphone": "00000000000",
  "created_at": "2022-05-17T23:58:32.438Z",
  "updated_at": "2022-05-17T23:58:32.438Z",
  "status": true,
  "hired_services": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | clients not found. |
| 401 Unauthorized | JWT is missing.    |
| 400 Bad Request  | Invalid Token      |

---

### 1.4. **Atualizar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
PATCH /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do cliente |

### Corpo da Requisição(Todos os parâmetros são opcionais):

```json
{
  "name": "exampleUpdated",
  "birthDate": "11/11/2000",
  "cpf": "00000000000",
  "cellphone": "00000000000"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
 {
	"name": "Nehama Mandelbaum",
	"cellphone": "999999989",
	"id": "81cfac66-0c83-463c-9202-5761648061fb",
	"updated_at": "2022-05-26T17:11:22.577Z"
}
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 404 Not Found    | clients not found.       |
| 400 Bad Request  | Id in params is not uuid |
| 401 Unauthorized | JWT is missing.          |
| 400 Bad Request  | Invalid Token            |

---

### 1.5. **Colocar o cliente em um quarto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/joinbedroom/:id`

### Exemplo de Request:

```
PATCH /clients/joinbedroom/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do cliente |

### Corpo da Requisição:

```json
{
  "bedroomId": 2
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
 {
	"id": "6e48b0e4-728f-4ab5-b793-6c6b9ea6880d",
	"name": "Nehama",
	"cpf": "44444444444",
	"birthDate": "1999-09-28T00:00:00.000Z",
	"cellphone": "999999999",
	"created_at": "2022-05-20T13:03:03.349Z",
	"updated_at": "2022-05-26T15:00:30.968Z",
	"status": true,
	"bedroom": {
		"id": 5,
		"number": "9",
		"floor": "2",
		"capacity": 4,
		"availability": false,
		"status": true
	}
}
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                              |
| ---------------- | -------------------------------------- |
| 404 Not Found    | client not found                       |
| 400 Bad Request  | This Bedroom is already full           |
| 400 Bad Request  | This client is already in this bedroom |
| 401 Unauthorized | JWT is missing.                        |
| 400 Bad Request  | Invalid Token                          |

### 1.6. **Desativar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
DELETE /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do cliente |

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
  "message": "Client Disabled",
  "client": {
    "name": "Nehama Mandelbaum",
    "status": false
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | clients not found. |
| 401 Unauthorized | JWT is missing.    |
| 400 Bad Request  | Invalid Token      |

## 2. **Quartos**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto bedroom é definido como:

| Campo        | Tipo    | Descrição                              |
| ------------ | ------- | -------------------------------------- |
| number       | string  | Número do quarto                       |
| floor        | string  | Número do andar                        |
| capacity     | number  | Capacidade maxima de pessoas no quarto |
| availability | boolean | Sé o quarto está ocupado ou não        |

### Endpoints

| Método | Rota          | Descrição                                       |
| ------ | ------------- | ----------------------------------------------- |
| POST   | /bedrooms     | Criação de um quartos                           |
| GET    | /bedrooms     | Lista todos os quartos                          |
| GET    | /bedrooms/:id | Lista um quarto usando seu ID como parâmetro    |
| PATCH  | /bedrooms/:id | atualiza um quarto usando seu ID como parâmetro |
| DELETE | /bedrooms/:id | desativa um quarto usando seu ID como parâmetro |

---

### 2.1. **Criação de Quartos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/bedrooms`

### Exemplo de Request:

```
POST /bedrooms
Host: link da api
Authorization: `Bearer {Token}`
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "number": "5",
  "floor": "4",
  "capacity": 5,
  "availability": true
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "number": 204,
  "floor": 2,
  "capacity": 3,
  "availability": true,
  "id": 6,
  "created_at": "2022-05-26T17:19:54.984Z",
  "updated_at": "2022-05-26T17:19:54.984Z",
  "status": true
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                   |
| ---------------- | --------------------------- |
| 409 Conflict     | This bedroom already exists |
| 401 Unauthorized | JWT is missing.             |
| 400 Bad Request  | Invalid Token               |

---

### 2.2. **Listando Quartos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms`

### Exemplo de Request:

```
GET /bedrooms
Host: link da api
Authorization: `Bearer {token}`
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
    "id": "dd622e7a-e0df-470e-8834-91b5320ba970",
    "number": "5",
    "floor": "4",
    "capacity": 5,
    "availability": true,
    "created_at": "2022-05-18T00:36:36.901Z",
    "updated_at": "2022-05-18T00:36:36.901Z",
    "status": true,
    "clients": []
  },
  {
    "id": "dd622e7a-e0df-470e-8834-91b5320ba999",
    "number": "3",
    "floor": "1",
    "capacity": 2,
    "availability": true,
    "created_at": "2022-05-18T00:36:36.901Z",
    "updated_at": "2022-05-18T00:36:36.901Z",
    "status": true,
    "clients": []
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | JWT is missing. |
| 400 Bad Request  | Invalid Token   |

---

### 2.3. **Listar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:

```
GET /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| id        | string | Identificador único do quarto |

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
  "id": "dd622e7a-e0df-470e-8834-91b5320ba970",
  "number": "5",
  "floor": "4",
  "capacity": 5,
  "availability": true,
  "created_at": "2022-05-18T00:36:36.901Z",
  "updated_at": "2022-05-18T00:36:36.901Z",
  "status": true,
  "clients": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | bedrooms not found. |
| 401 Unauthorized | JWT is missing.     |
| 400 Bad Request  | Invalid Token       |

---

### 2.4. **Atualizar quarto por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:

```
PATCH /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                     |
| --------- | ------ | ----------------------------- |
| id        | string | Identificador único do quarto |

### Corpo da Requisição:

```json
{
  "number": "5",
  "floor": "5",
  "capacity": 6,
  "availability": true
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "dd622e7a-e0df-470e-8834-91b5320ba970",
  "number": "5",
  "floor": "5",
  "capacity": 6,
  "availability": true,
  "created_at": "2022-05-18T00:36:36.901Z",
  "updated_at": "2022-05-18T00:36:36.901Z",
  "status": true,
  "clients": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 404 Not Found    | bedrooms not found.              |
| 409 Conflict     | This bedroom already exists      |
| 401 Unauthorized | JWT is missing.                  |
| 400 Bad Request  | Invalid Token                    |
| 401 Unauthorized | Only admin can access this route |

---

### 2.5. **Desativar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:

```
DELETE /bedrooms/9cda28c9-e540-4b2c-bf0c-c90006d37894
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do quartos |

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
  "message": "Bedroom disabled",
  "bedroom": {
    "status": false,
    "number": "5"
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 404 Not Found    | bedrooms not found.              |
| 409 Conflict     | This bedroom already exists      |
| 401 Unauthorized | JWT is missing.                  |
| 400 Bad Request  | Invalid Token                    |
| 401 Unauthorized | Only Admin can access this route |

## 3. **Serviços contratados**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto hireds é definido como:

| Campo      | Tipo    | Descrição                                    |
| ---------- | ------- | -------------------------------------------- |
| clientsId  | string  | UUID do cliente                              |
| servicesId | string  | Número referente ao id especifico do serviço |
| start_date | Date    | Data de inicio de hospedagem (opicional)     |
| end_date   | Date    | Data de final de hospedagem (opicional)      |
| paid       | boolean | Se o contrato já foi pago                    |
| status     | boolean | Se o quarto está disponível                  |

### Endpoints

| Método | Rota                   | Descrição                                      |
| ------ | ---------------------- | ---------------------------------------------- |
| POST   | /hiredservices         | Criação de um contratos                        |
| GET    | /hiredservices         | Lista todos os contratos                       |
| GET    | /hiredservices/:id     | Lista um contrato usando seu ID como parâmetro |
| DELETE | /hiredservices/:id     | desativa contrato usando seu ID como parâmetro |
| PATCH  | /hiredservices/pay/:id | Muda o status do serviço para pago             |

---

### 3.1. **Criação de Serviços contratados**

[ Voltar para os Endpoints ](#5-endpoints)

### `/hiredservices`

### Exemplo de Request:

```
POST /hiredservices
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "serviceId": 1,
  "cpf": "37137668860",
  "start_date": "2022-05-19",
  "end_date": "2022-05-20"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": 3,
  "paid": false,
  "start_date": "2022-05-20T00:00:00.000Z",
  "end_date": "2022-05-25",
  "bedroom_number": "202",
  "total_price": 150,
  "created_at": "2022-05-26T17:30:17.787Z",
  "updated_at": "2022-05-26T17:30:17.787Z",
  "status": true,
  "client": {
    "id": "91b7e113-ef7e-472f-bcea-352ad555e23a",
    "name": "Alexandre Araujo",
    "cpf": "37137668860",
    "status": true
  },
  "service": {
    "id": 1,
    "name": "Café da manhã",
    "price": "30.00",
    "description": "Café da manhã com pães e bolos",
    "status": true
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | client not found.  |
| 404 Not Found    | Service not found. |
| 401 Unauthorized | JWT is missing.    |
| 400 Bad Request  | Invalid Token      |

---

### 3.2. **Listando Serviços contratados**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hiredservices`

### Exemplo de Request:

```
GET /hiredservices
Host: link da api
Authorization: `Bearer {token}`
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
    "id": 36,
    "paid": false,
    "start_date": "2022-05-19T03:00:00.000Z",
    "end_date": "2022-05-20",
    "bedroom_number": "6",
    "total_price": 70,
    "created_at": "2022-05-19T18:32:58.928Z",
    "updated_at": "2022-05-19T18:32:58.928Z",
    "status": true,
    "client": {
      "id": "6871647a-d117-4609-9988-7c0f3d8b8693",
      "name": "marioto",
      "cpf": "1234567872",
      "status": true
    },
    "service": {
      "id": 1,
      "name": "muitas coisas",
      "price": "70.00",
      "description": "tudo",
      "status": true
    }
  }
]
```

### Possíveis Erros:

| Código do erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | JWT is missing. |
| 400 Bad Request  | Invalid Token   |

---

### 3.3. **Listar Serviços contratados por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hiredservices/:id`

### Exemplo de Request:

```
GET /hiredservices/36
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                           |
| --------- | ------ | ----------------------------------- |
| id        | string | Identificador do serviço contratado |

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
  "id": 36,
  "paid": false,
  "start_date": "2022-05-19T03:00:00.000Z",
  "end_date": "2022-05-20",
  "bedroom_number": "6",
  "total_price": 70,
  "created_at": "2022-05-19T18:32:58.928Z",
  "updated_at": "2022-05-19T18:32:58.928Z",
  "status": true,
  "client": {
    "id": "6871647a-d117-4609-9988-7c0f3d8b8693",
    "name": "marioto",
    "cpf": "1234567872",
    "status": true
  },
  "service": {
    "id": 1,
    "name": "muitas coisas",
    "price": "70.00",
    "description": "tudo",
    "status": true
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 404 Not Found  | hiredServices not found. |

---

### 3.4. **Desativar Serviço contrato por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hiredservices/:id`

### Exemplo de Request:

```
DELETE /hiredservices/36
Host: link da api
Authorization: `Bearer token`
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                           |
| --------- | ------ | ----------------------------------- |
| id        | string | Identificador do serviço contratado |

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
  "id": 36,
  "paid": false,
  "start_date": "2022-05-19T03:00:00.000Z",
  "end_date": "2022-05-20",
  "bedroom_number": "6",
  "total_price": 70,
  "created_at": "2022-05-19T18:32:58.928Z",
  "updated_at": "2022-05-19T18:32:58.928Z",
  "status": false,
  "client": {
    "id": "6871647a-d117-4609-9988-7c0f3d8b8693",
    "name": "marioto",
    "cpf": "1234567872",
    "status": true
  },
  "service": {
    "id": 2,
    "name": "muitas coisas",
    "price": "70.00",
    "description": "tudo",
    "status": true
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 404 Not Found    | hiredservices not found. |
| 401 Unauthorized | JWT is missing.          |
| 400 Bad Request  | Invalid Token            |

## 4. **Empregados**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto employees é definido como:

| Campo    | Tipo    | Descrição                          |
| -------- | ------- | ---------------------------------- |
| name     | string  | Nome do empregado                  |
| cpf      | string  | Número com 11 digitos              |
| password | string  | Senha de acesso                    |
| admin    | boolean | Permissão de controle total na api |
| status   | boolean | Se o usuário está ativo ou não     |

### Endpoints

| Método | Rota            | Descrição                                            |
| ------ | --------------- | ---------------------------------------------------- |
| POST   | /employeers     | Criação de um funcionarios                           |
| GET    | /employeers     | Lista todos os funcionarios                          |
| GET    | /employeers/:id | Lista um funcionario usando seu ID como parâmetro    |
| PATCH  | /employeers/:id | atualiza um funcionario usando seu ID como parâmetro |
| DELETE | /employeers/:id | desativa um funcionario usando seu ID como parâmetro |

---

### 4.1. **Criação de Funcionarios**

[ Voltar para os Endpoints ](#5-endpoints)

### `/employees`

### Exemplo de Request:

```
POST /employees
Host: link da api
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Nehama",
  "cpf": "10101010101",
  "password": "senhaforte",
  "admin": true,
  "status": true
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "0c22f573-a2cc-4628-96ae-1aca9c4b7042",
  "name": "Nehama",
  "cpf": "10101010101",
  "admin": true,
  "status": true,
  "created_at": "2022-05-26T17:44:08.956Z",
  "updated_at": "2022-05-26T17:44:08.956Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                             |
| -------------- | ------------------------------------- |
| 409 Conflict   | Employee with this cpf already exists |

---

### 4.2. **Listando Funcionarios**

[ Voltar aos Endpoints ](#5-endpoints)

### `/employees`

### Exemplo de Request:

```
GET /employees
Host: link da api
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
    "id": "a88858e5-3352-4266-8a3c-40e61c6aa340",
    "name": "bryan",
    "cpf": "66666666666",
    "admin": true,
    "status": true,
    "created_at": "2022-05-19T22:18:00.531Z",
    "updated_at": "2022-05-19T22:18:00.531Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 4.3. **Listar Funcionarios por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/employees/:id`

### Exemplo de Request:

```
GET /employees/a88858e5-3352-4266-8a3c-40e61c6aa340
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do funcionario |

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
  "id": "a88858e5-3352-4266-8a3c-40e61c6aa340",
  "name": "bryan",
  "cpf": "66666666666",
  "admin": true,
  "status": true,
  "created_at": "2022-05-19T22:18:00.531Z",
  "updated_at": "2022-05-19T22:18:00.531Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | employee not found. |

---

### 2.4. **Atualizar funcionarios por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/employees/:id`

### Exemplo de Request:

```
PATCH /employees/a88858e5-3352-4266-8a3c-40e61c6aa340
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do funcionario |

### Corpo da Requisição:

```json
{
  "name": "teste1",
  "cpf": "55555555555",
  "password": "11111111111",
  "admin": false
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "a88858e5-3352-4266-8a3c-40e61c6aa340",
  "name": "teste1",
  "cpf": "55555555555",
  "admin": false,
  "status": true,
  "created_at": "2022-05-19T22:18:00.531Z",
  "updated_at": "2022-05-19T22:18:00.531Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição            |
| -------------- | -------------------- |
| 404 Not Found  | employees not found. |

---

### 2.5. **Desativar funcionario por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/employees/:id`

### Exemplo de Request:

```
DELETE /employees/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do quartos |

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
  "message": "Employee deactivated",
  "status": {
    "name": "bryan",
    "status": false
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | bedrooms not found. |

## 5. **Serviços**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto services é definido como:

| Campo       | Tipo   | Descrição            |
| ----------- | ------ | -------------------- |
| name        | string | Nome do serviço      |
| description | string | Descrição do serviço |
| price       | string | Preço do serviço     |

### Endpoints

| Método | Rota          | Descrição                                        |
| ------ | ------------- | ------------------------------------------------ |
| POST   | /services     | Criação de um serviço                            |
| GET    | /services     | Lista todos os serviços                          |
| GET    | /services/:id | Lista um serviço usando seu ID como parâmetro    |
| PATCH  | /services/:id | atualiza um serviço usando seu ID como parâmetro |
| DELETE | /services/:id | desativa um serviço usando seu ID como parâmetro |

---

### 5.1. **Criação de serviços**

[ Voltar para os Endpoints ](#5-endpoints)

### `/services`

### Exemplo de Request:

```
POST /services
Host: link da api
Authorization: `Bearer {token}`
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Café da manha",
  "price": 12.99,
  "description": "Todos os dias café da manha disponivel do periodo das 07:00  ás 10:00 AM"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "Diária de quarto",
  "price": 30,
  "description": "Café da manhã com pães e bolos",
  "id": 6,
  "created_at": "2022-05-26T17:49:45.429Z",
  "updated_at": "2022-05-26T17:49:45.429Z",
  "status": true
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | JWT is missing |
| 400 Bad Request  | Invalid Token  |

---

### 5.2. **Listando serviços**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services`

### Exemplo de Request:

```
GET /services
Host: link da api
Authorization: Bearer {token}
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
    "name": "Café da manha",
    "price": 12.99,
    "description": "Todos os dias café da manha disponivel do periodo das 07:00  ás 10:00 AM",
    "status": true,
    "created_at": "2022-05-19T22:18:00.531Z",
    "updated_at": "2022-05-19T22:18:00.531Z"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | JWT is missing |
| 400 Bad Request  | Invalid Token  |

---

### 5.3. **Listar serviços por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services/:id`

### Exemplo de Request:

```
GET /service/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                       |
| --------- | ------ | ------------------------------- |
| id        | string | Identificador único do serviços |

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
  "name": "Café da manha",
  "price": 12.99,
  "description": "Todos os dias café da manha disponivel do periodo das 07:00  ás 10:00 AM",
  "status": true,
  "created_at": "2022-05-19T22:18:00.531Z",
  "updated_at": "2022-05-19T22:18:00.531Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | services not found. |
| 401 Unauthorized | JWT is missing      |
| 400 Bad Request  | Invalid Token       |

---

### 5.4. **Atualizar serviços por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/services/:id`

### Exemplo de Request:

```
PATCH /services/a88858e5-3352-4266-8a3c-40e61c6aa340
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                       |
| --------- | ------ | ------------------------------- |
| id        | string | Identificador único do serviços |

### Corpo da Requisição:

```json
{
  "name": "Almoço",
  "price": 10,
  "description": "Todos os dias almoço disponivel do periodo das 11:00  ás 13:30"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Almoço",
  "price": 10,
  "description": "Todos os dias almoço disponivel do periodo das 11:00  ás 13:30",
  "status": true,
  "created_at": "2022-05-19T22:18:00.531Z",
  "updated_at": "2022-05-19T22:18:00.531Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | services not found. |
| 401 Unauthorized | JWT is missing      |
| 400 Bad Request  | Invalid Token       |

---

### 5.5. **Desativar serviço por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/service/:id`

### Exemplo de Request:

```
DELETE /service/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| id        | string | Identificador único do quartos |

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
  "message": "Service deactivated",
  "status": {
    "name": "Almoço",
    "status": false
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | services not found. |
| 401 Unauthorized | JWT is missing      |
| 400 Bad Request  | Invalid Token       |
