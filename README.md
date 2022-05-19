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
- [Quartos](#2-bedrooms)
    - [POST - /bedrooms](#21-criação-de-quartos)
    - [GET - /bedrooms](#22-listando-quartos)
    - [GET - /bedrooms/:id](#23-listar-quartos-por-id)
    - [PATCH - /bedrooms/:id](#24-atualizar-dados-quartos)
    - [DELETE - /bedrooms/:id](#25-desativar-quartos)
- [Serviços contratado](#4-hired_services)
    - [POST - /hireds](#31-criação-de-contratos)
    - [GET - /hireds](#32-listando-contratos)
    - [GET - /hireds/:id](#33-listar-contratos-por-id)
    - [DELETE - /hireds/:id](#35-desativar-contratos)
- [Empregados](#4-employees)
    - [POST - /employees](#26-criação-de-funcionarios)
    - [GET - /employees](#27-listando-funcionarios)
    - [GET - /employees/:id](#28-listar-funcionarios-por-id)
    - [PATCH - /employees/:id](#29-atualizar-dados-funcionarios)
    - [DELETE - /employees/:id](#30-desativar-funcionarios)
- [Serviços](#5-services)
    - [POST - /services](#31-criação-de-servico)
    - [GET - /services](#32-listando-servicos)
    - [GET - /services/:id](#33-listar-servico-por-id)
    - [PATCH - /services/:id](#34-atualizar-dados-servicos)
    - [DELETE - /services/:id](#35-desativar-servicos)

---

## 1. **Clientes**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto clients é definido como:

| Campo          | Tipo    | Descrição                                       |
| ---------------|---------|-------------------------------------------------|
| name           | string  | O nome do usuário.                              |
| birthDate      | string  | Data de aniversário no formato YYYY-MM-DD       |
| cpf            | string  | Número com 11 digitos                           |
| cellphone      | string  | Número de telefone celular                      |

### Endpoints

| Método      | Rota         | Descrição                                        |
|-------------|--------------|--------------------------------------------------|
| POST        | /clients     | Criação de um clientes                           |
| GET         | /clients     | Lista todos os clientes                          |
| GET         | /clients/:id | Lista um cliente usando seu ID como parâmetro    | 
| PATCH       | /clients/:id | atualiza um cliente usando seu ID como parâmetro | 
| DELETE      | /clients/:id | desativa um cliente usando seu ID como parâmetro |  

---

### 1.1. **Criação de Clientes**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
POST /clientes
Host: link da api
Authorization: None
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

### Schema de Validação com Yup:
```javascript
	em andamento
```
OBS.: Chaves não presentes no schema serão removidas.

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
| Código do Erro | Descrição                     |
|----------------|-------------------------------|
| 400 Conflict   | cpf already registered        |
| 400 Conflict   | cellphone already registered  |

---

### 1.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
GET /clients
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
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
GET /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |

---

### 1.4. **Atualizar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
PATCH /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
		"name": "exampleUpdated",
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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |

---

### 1.5. **Desativar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
DELETE /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
	"message": "Service Disabled",
	"service": {
		"name": "example1",
		"status": false
	}
}
```

### Possíveis Erros:
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |


## 2. **Quartos**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto bedroom é definido como:

| Campo          | Tipo    | Descrição                                       |
| ---------------|---------|-------------------------------------------------|
| number         | string  | Número do quarto                                |
| floor          | string  | Número do andar                                 |
| capacity       | number  | Capacidade maxima de pessoas no quarto          |
| availability   | boolean | Sé o quarto está ocupado ou não                 |

### Endpoints

| Método      | Rota         | Descrição                                        |
|-------------|--------------|--------------------------------------------------|
| POST        | /bedrooms     | Criação de um quartos                           |
| GET         | /bedrooms     | Lista todos os quartos                          |
| GET         | /bedrooms/:id | Lista um quarto usando seu ID como parâmetro    | 
| PATCH       | /bedrooms/:id | atualiza um quarto usando seu ID como parâmetro | 
| DELETE      | /bedrooms/:id | desativa um quarto usando seu ID como parâmetro | 

---

### 2.1. **Criação de Quartos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/bedrooms`

### Exemplo de Request:
```
POST /bedrooms
Host: link da api
Authorization: None
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

### Schema de Validação com Yup:
```javascript
	em andamento
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
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
Nenhum

---

### 2.2. **Listando Quartos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms`

### Exemplo de Request:
```
GET /bedrooms
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
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
GET /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quarto         |

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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | bedrooms not found. |

---

### 2.4. **Atualizar quarto por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
PATCH /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quarto         |

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
| Código do Erro  | Descrição           |
|-----------------|---------------------|
| 404 Not Found   | bedrooms not found. |

---

### 2.5. **Desativar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
DELETE /bedrooms/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quartos        |

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
      "number": "5",
    }
}
```

### Possíveis Erros:
| Código do Erro  | Descrição           |
|-----------------|---------------------|
| 404 Not Found   | bedrooms not found. |


## 3. **Serviços contratados**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto hireds é definido como:

| Campo          | Tipo    | Descrição                                       |
| ---------------|---------|-------------------------------------------------|
| clientsId      | string  | UUID do cliente                                 |
| servicesId     | string  | Número referente ao id especifico do serviço    |
| start_date     | Date    | Data de inicio de hospedagem (opicional)        |
| end_date       | Date    | Data de final de hospedagem (opicional)         |
| paid           | boolean | Se o contrato já foi pago                       |
| status         | boolean | Se o quarto está disponível                     |

### Endpoints

| Método      | Rota        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| POST        | /hireds     | Criação de um contratos                        |
| GET         | /hireds     | Lista todos os contratos                       |
| GET         | /hireds/:id | Lista um contrato usando seu ID como parâmetro | 
| DELETE      | /hireds/:id | desativa contrato usando seu ID como parâmetro | 

---

### 3.1. **Criação de Serviços contratados**

[ Voltar para os Endpoints ](#5-endpoints)

### `/hireds`

### Exemplo de Request:
```
POST /hireds
Host: link da api
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"serviceId": 1,
	"clientId": "6871647a-d117-4609-9988-7c0f3d8b8693",
	"start_date": "2022-05-19",
	"end_date": "2022-05-20"
}
```

### Schema de Validação com Yup:
```javascript
	em andamento
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
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
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found   | clientsId not found. |
| 404 Not Found   | ServiceID not found. |

---

### 3.2. **Listando Serviços contratados**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hireds`

### Exemplo de Request:
```
GET /hireds
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
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 3.3. **Listar Serviços contratados por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hireds/:id`

### Exemplo de Request:
```
GET /hireds/36
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador do serviço contratado   |

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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | hired not found.   |

---

### 3.5. **Desativar Serviço contrato por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/hireds/:id`

### Exemplo de Request:
```
DELETE /hireds/36
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador do serviço contratado   |

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
| Código do Erro  | Descrição           |
|-----------------|---------------------|
| 404 Not Found   | hireds not found.   |

## 1. **Clientes**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto clients é definido como:

| Campo          | Tipo    | Descrição                                       |
| ---------------|---------|-------------------------------------------------|
| name           | string  | O nome do usuário.                              |
| birthDate      | string  | Data de aniversário no formato YYYY-MM-DD       |
| cpf            | string  | Número com 11 digitos                           |
| cellphone      | string  | Número de telefone celular                      |

### Endpoints

| Método      | Rota         | Descrição                                        |
|-------------|--------------|--------------------------------------------------|
| POST        | /clients     | Criação de um clientes                           |
| GET         | /clients     | Lista todos os clientes                          |
| GET         | /clients/:id | Lista um cliente usando seu ID como parâmetro    | 
| PATCH       | /clients/:id | atualiza um cliente usando seu ID como parâmetro | 
| DELETE      | /clients/:id | desativa um cliente usando seu ID como parâmetro |  

---

### 1.1. **Criação de Clientes**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
POST /clientes
Host: link da api
Authorization: None
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

### Schema de Validação com Yup:
```javascript
	em andamento
```
OBS.: Chaves não presentes no schema serão removidas.

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
| Código do Erro | Descrição                     |
|----------------|-------------------------------|
| 400 Conflict   | cpf already registered        |
| 400 Conflict   | cellphone already registered  |

---

### 1.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
GET /clients
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
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
GET /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |

---

### 1.4. **Atualizar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
PATCH /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
		"name": "exampleUpdated",
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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |

---

### 1.5. **Desativar clientes por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:
```
DELETE /clientes/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do cliente        |

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
	"message": "Service Disabled",
	"service": {
		"name": "example1",
		"status": false
	}
}
```

### Possíveis Erros:
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | clients not found. |


## 4. **Empregados**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto employeers é definido como:

| Campo    | Tipo    | Descrição                             |
| ---------|---------|---------------------------------------|
| name     | string  | Nome do empregado                     |
| cpf      | string  | Número com 11 digitos                 |
| password | string  | Senha de acesso                       |
| admin    | boolean | Permissão de controle total na api    |
| status   | boolean | Se o usuário está ativo ou não        |

### Endpoints

| Método      | Rota            | Descrição                                            |
|-------------|-----------------|------------------------------------------------------|
| POST        | /employeers     | Criação de um funcionarios                           |
| GET         | /employeers     | Lista todos os funcionarios                          |
| GET         | /employeers/:id | Lista um funcionario usando seu ID como parâmetro    | 
| PATCH       | /employeers/:id | atualiza um funcionario usando seu ID como parâmetro | 
| DELETE      | /employeers/:id | desativa um funcionario usando seu ID como parâmetro | 

---

### 2.1. **Criação de Funcionarios**

[ Voltar para os Endpoints ](#5-endpoints)

### `/employeers`

### Exemplo de Request:
```
POST /employeers
Host: link da api
Authorization: None
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

### Schema de Validação com Yup:
```javascript
	em andamento
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
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
Nenhum

---

### 2.2. **Listando Quartos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms`

### Exemplo de Request:
```
GET /bedrooms
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
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
GET /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quarto         |

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
| Código do Erro  | Descrição          |
|-----------------|--------------------|
| 404 Not Found   | bedrooms not found. |

---

### 2.4. **Atualizar quarto por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
PATCH /bedrooms/dd622e7a-e0df-470e-8834-91b5320ba970
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quarto         |

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
| Código do Erro  | Descrição           |
|-----------------|---------------------|
| 404 Not Found   | bedrooms not found. |

---

### 2.5. **Desativar quartos por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/bedrooms/:id`

### Exemplo de Request:
```
DELETE /bedrooms/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: link da api
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do quartos        |

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
      "number": "5",
    }
}
```

### Possíveis Erros:
| Código do Erro  | Descrição           |
|-----------------|---------------------|
| 404 Not Found   | bedrooms not found. |
