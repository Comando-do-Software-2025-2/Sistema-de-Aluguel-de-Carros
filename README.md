# 🚗 Projeto Sistema de Aluguel de Carros

O **Sistema de Aluguel de Carros** é uma aplicação web completa para gestão de clientes, veículos, contratos e pedidos de aluguel.  
O backend foi desenvolvido em **Java + Spring Boot** e o frontend em **React**.  

🔗 **Veja em produção:** [Sistema de Aluguel de Carros]()

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Contexto](#-contexto)
- [Habilidades](#-habilidades)
- [Demo](#-demo)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Banco de Dados](#banco-de-dados)
- [Uso](#-uso)
- [Documentação da API](#-documentação-da-api)
- [Requisitos do Projeto](#-requisitos-do-projeto)
- [Status de Desenvolvimento](#-status-de-desenvolvimento)

---

## 📖 Sobre o Projeto

O desafio deste projeto foi desenvolver uma aplicação completa para **gerenciar o fluxo de aluguel de carros**.  
O sistema foi estruturado em **arquitetura MVC com Spring Boot** e integrado a um **frontend em React**.

### Funcionalidades principais:
- Registro de clientes e veículos  
- Criação, edição e listagem de pedidos de aluguel  
- Gestão de contratos  
- Controle de frota de veiculos
- Analise de contratos finaceiros e fianciamentos bancarios  

---

## 🎯 Contexto
O projeto tem como objetivo simular um sistema real de locadora de veículos, aplicando boas práticas de desenvolvimento, integração entre sistemas e organização em camadas.

---

## 🛠️ Habilidades

- Dockerização das aplicações (**frontend, backend e banco**)  
- Modelagem de dados com **MySQL**  
- Construção de uma **API REST** em Java Spring Boot  
- CRUD completo para clientes, veículos, pedidos e contratos  
- Integração com **frontend em React**  
- Organização do projeto seguindo **arquitetura MVC**

---

## Diagramas 

- [Cassos de classes](./Diagramas/DiagramaDeClasses.png)
- [Diagrma de Componentes](./Diagramas/DiagramaDeComponentes.png)
- [Historia de Historias de usuario](./Diagramas/HistoriasDeUsuario.pdf)
- [Modelo De Dados](./Diagramas/ModeloDeDados.png)
- [Use Case Diagram.pdf](./Diagramas/UseCaseDiagram.pdf)




---
## 🚀 Tecnologias Utilizadas

### Gerais

- Doker
- visualStudoCold
- intellij
- Figima

### Front-end
- React  

### Back-end
- Java 21  
- Spring Boot 3  
- Spring MVC  
- Spring Security  
- Spring Data JPA  

### Banco de Dados
- POSTGRES

### Testes e Integração
- Postman  

---

## 📌 Uso

Após logar no sistema, o usuário pode:
- Registrar novos clientes e veículos  
- Criar e gerenciar pedidos de aluguel  
- Editar clientes, veículos e contratos  
- Alterar o status de pedidos  
- Visualizar contratos e aprovações feitas por agentes  

---

## 📚 Documentação da API

### Visão geral de endpoints

| Endpoint                | Método | Descrição                           |
|--------------------------|--------|-------------------------------------|
| `/login`                | POST   | Faz login do usuário                |
| `/users/{id}/password`  | PUT    | Atualiza a senha de um usuário      |
| `/clients`              | GET    | Lista todos os clientes             |
| `/clients/{id}`         | GET    | Retorna um cliente específico       |
| `/clients`              | POST   | Cria um novo cliente                |
| `/clients/{id}`         | PUT    | Atualiza dados de um cliente        |
| `/clients/{id}`         | DELETE | Remove um cliente                   |
| `/vehicles`             | GET    | Lista veículos cadastrados          |
| `/vehicles/{id}`        | GET    | Retorna veículo pelo ID             |
| `/vehicles`             | POST   | Cadastra um novo veículo            |
| `/vehicles/{id}`        | PUT    | Atualiza veículo existente          |
| `/vehicles/{id}`        | DELETE | Remove veículo                      |
| `/orders`               | GET    | Lista pedidos                       |
| `/orders/{id}`          | GET    | Retorna pedido pelo ID              |
| `/orders`               | POST   | Cria um novo pedido                 |
| `/orders/{id}`          | PUT    | Atualiza pedido                     |
| `/orders/{id}/status`   | PATCH  | Atualiza status de um pedido        |
| `/contracts`            | GET    | Lista contratos                     |
| `/contracts/{id}`       | GET    | Retorna contrato pelo ID            |
| `/contracts`            | POST   | Cria contrato                       |
| `/contracts/{id}`       | PUT    | Atualiza contrato                   |
| `/contracts/{id}`       | DELETE | Remove contrato                     |
| `/agents`               | GET    | Lista agentes                       |
| `/agents`               | POST   | Cadastra um agente                  |

---

## ⚙️ Requisitos do Projeto

- Docker e Docker Compose  
- JDK 21  
- Node.js >= 16  
- MySQL  

---

## 📌 Status de Desenvolvimento
✅ **Concluído**

---
