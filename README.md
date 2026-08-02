# 🚀 TaskFlow – Task Automation & Job Processing Platform

A modern full-stack task automation platform built as part of the **Saarthi AI Full Stack Developer Technical Assessment**.

The application allows users to securely authenticate, create and manage tasks, process them asynchronously using a background worker, and monitor real-time execution through a responsive dashboard. The project demonstrates scalable backend architecture, asynchronous job processing, real-time communication, and modern frontend development practices.

---

# 📖 Project Overview

TaskFlow is designed to simulate a real-world job processing system where users submit tasks that are processed independently in the background.

Instead of executing tasks immediately after creation, every task is added to an in-memory queue and processed asynchronously by a background worker. During execution, task status automatically transitions through different stages while the frontend receives live updates using Socket.IO without requiring a page refresh.

The project follows a clean separation between frontend and backend, making it scalable, maintainable, and easy to extend.

---

# 🎯 Assignment Objectives

This project was developed to demonstrate:

- Secure JWT Authentication
- Full CRUD Operations
- Asynchronous Task Processing
- Background Worker Architecture
- Queue-based Job Execution
- Real-time Updates using Socket.IO
- Dashboard Analytics
- Modern Responsive UI
- Clean Project Structure
- REST API Design

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Access Token Authentication
- Protected API Routes
- Persistent Login using Local Storage

---

## Task Management

- Create Tasks
- Edit Existing Tasks
- Delete Tasks
- View Task List
- Search Tasks
- Filter Tasks by Status

---

## Background Processing

Every newly created task follows the lifecycle:

```
PENDING
      ↓
PROCESSING
      ↓
COMPLETED
```

If an unexpected error occurs during execution:

```
FAILED
```

Tasks are processed asynchronously using a background worker instead of blocking API requests.

---

## Real-Time Updates

The application uses **Socket.IO** to broadcast task status changes.

Whenever the worker updates a task:

- Dashboard refreshes automatically
- Statistics update instantly
- No manual page refresh required

---

## Dashboard

Interactive dashboard includes:

- Total Tasks
- Pending Tasks
- Processing Tasks
- Completed Tasks
- Live Task Table
- Search
- Status Filter

---

# 🏗️ System Architecture

```
               User

                 │

                 ▼

        Next.js Frontend

                 │

         REST API Requests

                 │

                 ▼

      Express + TypeScript API

                 │

         JWT Authentication

                 │

                 ▼

        PostgreSQL (Neon)

                 │

          Task Repository

                 │

                 ▼

          In-Memory Queue

                 │

                 ▼

        Background Worker

                 │

      Updates Task Status

                 │

                 ▼

            Socket.IO

                 │

                 ▼

      Live Dashboard Updates
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- React Hot Toast
- Socket.IO Client
- Lucide React
- Radix UI

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication
- Zod Validation
- Socket.IO

---

# 📂 Project Structure

```
TaskFlow/

│

├── client/

│   ├── app/

│   ├── src/

│   │   ├── components/

│   │   ├── layouts/

│   │   ├── providers/

│   │   ├── services/

│   │   ├── lib/

│   │   └── hooks/

│

├── server/

│   ├── controllers/

│   ├── services/

│   ├── repositories/

│   ├── routes/

│   ├── middlewares/

│   ├── workers/

│   ├── queues/

│   ├── validators/

│   ├── config/

│   └── prisma/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Server

Create a `.env` file inside the server directory.

```env
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

---

# 🚀 API Overview

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

---

## Tasks

```
GET /api/tasks

GET /api/tasks/stats

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
```

---

# 🔄 Task Processing Workflow

1. User creates a task.
2. Task is stored in PostgreSQL.
3. Task enters the processing queue.
4. Background worker starts execution.
5. Status changes to **PROCESSING**.
6. Worker completes execution.
7. Status changes to **COMPLETED**.
8. Socket.IO broadcasts the update.
9. Dashboard refreshes automatically.

---

# ✅ Highlights

- Secure JWT Authentication
- Modern Next.js Frontend
- RESTful API Design
- Prisma ORM Integration
- PostgreSQL Database
- Queue-Based Task Processing
- Background Worker
- Live Socket.IO Updates
- Search & Status Filters
- Responsive Dashboard
- TypeScript Across Frontend & Backend
- Modular Project Architecture

---

# 🔮 Future Improvements

- Persistent Queue using BullMQ + Redis
- Refresh Token Authentication
- Pagination
- Task Priority Levels
- File Attachments
- Email Notifications
- Docker Deployment
- Unit & Integration Testing
- Role-Based Access Control
- Activity Logs

---

# 👨‍💻 Author

**Kanishka Garg**

Built as part of the **Saarthi AI Full Stack Developer Technical Assessment** using a modern full-stack TypeScript architecture.