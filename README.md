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
  → Atualiza uma tarefa existente.

- `DELETE /tasks/:id`  
  → Remove uma tarefa existente do banco.

---

## 🔐 Segurança

- As senhas são armazenadas de forma segura usando **bcrypt**.
- A autenticação é feita com **JWT**, garantindo segurança e escalabilidade.

---


---

## 📷 Prints ou vídeos do projeto

>![image](https://github.com/user-attachments/assets/b576a235-811e-4a89-88fd-6946f5323cde)


---

## 💡 Melhorias futuras

- Adicionar paginação e filtros nas tarefas
- Criar categorias ou etiquetas para as tasks
- Criar visualização de histórico por data

---

