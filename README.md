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
| DELETE      | /clients/:id | deleta um cliente usando seu ID como parâmetro   | 

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
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Conflict   | cpf already registered |
| 400 Conflict   | cellphone already registered  |

---

### 1.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
GET /users
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

### 1.3. **Atualizar clientes por ID**

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

### 1.3. **Desativar clientes por ID**

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


