# 📌 MyTasks API

A **MyTasks API** é uma aplicação back-end desenvolvida com foco em organização e produtividade pessoal. Ela permite que usuários criem, editem e excluam tarefas, com autenticação segura e validações robustas.

---

## 🚀 Tecnologias utilizadas

- **[Express](https://expressjs.com/)** – Framework minimalista para criação de APIs
- **[Zod](https://zod.dev/)** – Validação de dados de entrada
- **[Prisma ORM](https://www.prisma.io/)** – ORM moderno para acesso ao banco de dados
- **[SQLite](https://www.sqlite.org/)** – Banco de dados leve e embutido, ideal para testes e pequenos projetos
- **[JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)** – Autenticação com tokens seguros
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** – Criptografia de senhas de forma segura

---

## 🔒 Autenticação

Todas as rotas relacionadas a `/tasks` agora exigem autenticação com **JWT**.

Você deve enviar o token no header da requisição:

```http
Authorization: Bearer <seu_token_aqui>


## 📁 Rotas da API

### 🧑‍💻 Autenticação de usuário

- `POST /sessions`  
  → Faz login do usuário, retornando um token JWT válido.

---

### 👤 Usuários

- `POST /user`  
  → Cria um novo usuário com senha criptografada.

---

### ✅ Tarefas

- `POST /tasks`  
  → Cria uma nova tarefa.

- `PUT /tasks/:id`  
  → Atualiza uma tarefa do usuário.

- `DELETE /tasks/:id`  
  → Remove uma tarefa do usuário existente no banco.

- `GET /tasks`  
  → Exibe as tarefas do usuário, tendo a possibilidade de utilizar queries para filtragem.

---

## 🔐 Segurança

- As senhas são armazenadas de forma segura usando **bcrypt**.
- A autenticação é feita com **JWT**, garantindo segurança e escalabilidade.

---


---

## 📷 Prints ou vídeos do projeto

![image](https://github.com/user-attachments/assets/cde3ea97-6972-418c-be94-ca45382477e2)



---
