# Workflow Orchestration & Job Processing Platform

<p align="center">

A full-stack workflow orchestration system for asynchronous job processing, background workers, task lifecycle management, RESTful APIs, and real-time execution monitoring.

</p>

---

## Overview

The **Workflow Orchestration & Job Processing Platform** is a full-stack application designed to simulate a real-world job processing environment where authenticated users can create, manage, and monitor tasks.

Instead of executing tasks directly within API requests, newly created tasks are persisted in **PostgreSQL**, placed into an **in-memory processing queue**, and handled asynchronously by a dedicated **background worker**.

The worker manages task execution and updates the task lifecycle from `PENDING` to `PROCESSING`, followed by `COMPLETED` or `FAILED`. These state changes are propagated to the frontend through **Socket.IO**, allowing the dashboard to reflect execution progress without manual page refreshes.

The project demonstrates practical backend engineering concepts including:

- RESTful API design
- JWT authentication
- CRUD operations
- Asynchronous job processing
- Queue-based execution
- Background worker architecture
- Task lifecycle management
- Real-time communication
- PostgreSQL persistence
- Modular frontend and backend architecture

---

# Core Capabilities

## Authentication & Authorization

The platform provides secure user authentication using JWT-based access tokens.

Supported functionality includes:

- User registration
- User login
- JWT access token generation
- Protected API routes
- Authenticated task operations
- Persistent login using local storage

---

## Task Management

Authenticated users can manage tasks through the application dashboard.

Supported operations include:

- Create tasks
- Edit existing tasks
- Delete tasks
- View task history
- Search tasks
- Filter tasks by status

Task operations are exposed through RESTful backend APIs.

---

## Asynchronous Job Processing

Task execution is decoupled from the initial API request.

When a user creates a task:

```text
Task Creation
      ↓
PostgreSQL Persistence
      ↓
In-Memory Queue
      ↓
Background Worker
      ↓
Task Execution
      ↓
Status Update
```

This architecture prevents task processing from directly blocking the API request lifecycle.

---

## Task Lifecycle

Each task moves through a defined execution lifecycle:

```text
PENDING
   ↓
PROCESSING
   ↓
COMPLETED
```

If execution encounters an unexpected error:

```text
PENDING
   ↓
PROCESSING
   ↓
FAILED
```

The task status is persisted and subsequently exposed through the API and real-time dashboard.

---

## Background Worker

A dedicated background worker processes jobs independently from the request-response cycle.

The worker:

- Retrieves queued tasks
- Starts asynchronous execution
- Updates task state
- Records completion or failure
- Communicates updated state through Socket.IO

This separation provides a practical foundation for extending the system toward more advanced distributed job-processing architectures.

---

## Real-Time Execution Monitoring

The application uses **Socket.IO** to communicate task state changes from the backend to connected clients.

When a task changes state:

```text
Background Worker
        ↓
Task Status Update
        ↓
Socket.IO Event
        ↓
Connected Frontend
        ↓
Dashboard Update
```

This allows users to monitor task execution in real time without manually refreshing the page.

---

# Dashboard

The dashboard provides an operational view of the task-processing system.

It displays:

- Total tasks
- Pending tasks
- Processing tasks
- Completed tasks
- Live task table
- Search functionality
- Status filtering
- Real-time task updates

The dashboard is designed to provide an overview of both task activity and current processing state.

---

# System Architecture

```text
                         User
                           │
                           ▼
                  Next.js Frontend
                           │
                    REST API Calls
                           │
                           ▼
                Express + TypeScript API
                           │
                    JWT Middleware
                           │
                           ▼
                    Task Services
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
       PostgreSQL (Neon)          Task Processing Queue
             │                           │
             │                           ▼
             │                    Background Worker
             │                           │
             │                    Task Execution
             │                           │
             └──────────────┬────────────┘
                            │
                            ▼
                      Task Status
                            │
                            ▼
                         Socket.IO
                            │
                            ▼
                     Live Dashboard
```

---

# Processing Architecture

The application separates task submission from task execution.

```text
Client
  │
  │ POST /api/tasks
  ▼
Express API
  │
  ├── Validate Request
  ├── Authenticate User
  └── Persist Task
          │
          ▼
     PostgreSQL
          │
          ▼
    In-Memory Queue
          │
          ▼
 Background Worker
          │
          ├── PROCESSING
          │
          ├── Execute Task
          │
          └── COMPLETED / FAILED
                    │
                    ▼
                Socket.IO
                    │
                    ▼
              Live Dashboard
```

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Socket.IO Client
- React Hot Toast
- Lucide React
- Radix UI

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- Socket.IO

## Database

- PostgreSQL
- Neon
- Prisma ORM

---

# Project Structure

```text
workflow-orchestration-job-processing-platform/

├── client/
│   ├── app/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── providers/
│       ├── services/
│       ├── lib/
│       └── hooks/
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
│
└── README.md
```

---

# API Overview

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

## Tasks

```http
GET /api/tasks
GET /api/tasks/stats
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Task Processing Workflow

```text
1. User authenticates with the application.
2. User creates a task through the frontend.
3. The REST API validates the request.
4. The task is persisted in PostgreSQL.
5. The task is added to the in-memory queue.
6. The background worker retrieves the queued task.
7. The task state changes to PROCESSING.
8. The worker executes the task.
9. The task state changes to COMPLETED or FAILED.
10. Socket.IO broadcasts the updated state.
11. The dashboard updates in real time.
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/KanishkaGarg04/workflow-orchestration-job-processing-platform.git
cd workflow-orchestration-job-processing-platform
```

---

## 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

# Environment Variables

## Server

Create:

```text
server/.env
```

Required variables:

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

### DATABASE_URL

PostgreSQL connection string used by Prisma.

### JWT_SECRET

Secret key used for signing and validating JWT access tokens.

### PORT

Port on which the Express backend runs.

---

# Database

The application uses **PostgreSQL** for persistent task and user data.

**Prisma ORM** provides the data-access layer between the Express backend and PostgreSQL.

The database configuration and schema are maintained under:

```text
server/prisma/
```

---

# Real-Time Communication

**Socket.IO** is used for server-to-client communication during task processing.

When a worker changes a task's state, the backend emits the corresponding event to connected clients.

This enables:

- Live task status updates
- Automatic dashboard refresh
- Real-time task statistics
- Reduced reliance on manual polling or page refreshes

---

# Engineering Concepts Demonstrated

This project focuses on practical software-engineering concepts including:

- Client-server architecture
- RESTful API design
- JWT-based authentication
- CRUD operations
- Repository pattern
- Service-layer separation
- Input validation
- Database persistence
- Asynchronous processing
- Queue-based execution
- Background workers
- Event-driven communication
- Real-time frontend synchronization
- Modular project organization

---

# Security

The application implements:

- JWT authentication
- Protected API routes
- Authenticated task operations
- Request validation with Zod
- Environment-based secret configuration
- User-specific task access

Sensitive credentials should never be committed to the repository.

---

# Future Improvements

Potential extensions to the system include:

- Persistent queue using BullMQ and Redis
- Refresh-token authentication
- Task prioritization
- Pagination
- Retry mechanisms
- File attachments
- Email notifications
- Activity logging
- Role-based access control
- Unit and integration testing
- Docker-based deployment
- Distributed worker architecture

---

# Project Highlights

- Full-stack **Next.js + Node.js** application
- TypeScript across frontend and backend
- RESTful API architecture
- JWT-based authentication
- PostgreSQL persistence with Prisma ORM
- In-memory queue-based job processing
- Dedicated background worker
- Real-time Socket.IO communication
- Task lifecycle tracking
- Search and status filtering
- Responsive operational dashboard
- Modular backend architecture

---

# Author

**Kanishka Garg**

GitHub:  
https://github.com/KanishkaGarg04
