# Finance Dashboard Backend

A role-based finance dashboard backend built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. Supports financial record management, dashboard analytics, and role-based access control , fully documented with Swagger UI.

---

##  Live Demo

| | Link |
|---|---|
| **API Base URL** | https://finance-dashboard-backend-gzz9.onrender.com |
| **Swagger Docs** | https://finance-dashboard-backend-gzz9.onrender.com/api-docs |

---

##  Features

- **JWT Authentication** — stateless, token-based auth
- **Role-Based Access Control (RBAC)** — three roles with clearly enforced permissions
- **Financial Records CRUD** — create, read, update, soft-delete with pagination and filtering
- **Dashboard Analytics** — income/expense summaries, category breakdowns, monthly trends
- **Swagger UI** — interactive API documentation with JWT support
- **Input Validation** — email format, password strength, structured error responses

---

## 👥 Role Permissions

| Action | Viewer | Analyst | Admin |
|--------|:------:|:-------:|:-----:|
| View records | yes | yes | yes |
| View dashboard & analytics | no | yes | yes |
| Create records | no | no | yes |
| Update / delete records | no | no | yes |
| Manage users | no | no | yes |

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JSON Web Tokens (JWT) + bcryptjs |
| Validation | Zod |
| API Docs | Swagger UI (OpenAPI 3.0) |

---

## Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas cluster (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/srinidhijayakumar/finance-dashboard-backend.git
cd finance-dashboard-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Seed sample data (optional)
```bash
npm run seed
```
This creates one admin, one analyst, and one viewer account with 30 sample records.

> **Default credentials (after seeding):**
> - `admin@example.com` / `password123`
> - `analyst@example.com` / `password123`
> - `viewer@example.com` / `password123`

### 5. Start the server
```bash
npm run dev       # development (nodemon)
npm start         # production
```

---

##  API Endpoints

### Auth
```
POST   /api/auth/register       Register a new user
POST   /api/auth/login          Login and receive JWT token
GET    /api/auth/me             Get current user (authenticated)
```

### Users *(Admin only)*
```
GET    /api/users               List all users (paginated)
POST   /api/users               Create a user
GET    /api/users/:id           Get user by ID
PATCH  /api/users/:id/role      Update user role
PATCH  /api/users/:id/status    Activate / deactivate user
```

### Records
```
GET    /api/records             List records — filter by type, category, date (Admin, Analyst, Viewer)
GET    /api/records/:id         Get single record (Admin, Analyst, Viewer)
POST   /api/records             Create record (Admin only)
PATCH  /api/records/:id         Update record (Admin only)
DELETE /api/records/:id         Soft delete record (Admin only)
```

### Dashboard *(Analyst and Admin)*
```
GET    /api/dashboard/summary       Total income, expenses, net balance
GET    /api/dashboard/by-category   Category-wise aggregation
GET    /api/dashboard/trends        Monthly or weekly trends
GET    /api/dashboard/recent        Latest N records
```

---

## 🔐 Authentication Flow

1. Register via `POST /api/auth/register`
2. Login via `POST /api/auth/login` → receive JWT token
3. Pass token in all subsequent requests:
```
Authorization: Bearer <your_token>
```

---

##  Architecture

```
Client
  └── Express Server
        └── Middleware (Auth, RBAC, Error Handler)
              └── Controllers
                    └── Services / Models
                          └── MongoDB (Atlas)
```

---

##  Project Structure

```
src/
├── config/          # DB connection, Swagger config, seed script
├── middleware/       # JWT auth, role-based authorization, error handler
├── modules/
│   ├── auth/        # Register, login, JWT
│   ├── users/       # User management
│   ├── records/     # Financial records CRUD
│   └── dashboard/   # Analytics & aggregations
└── app.js
```

---

##  Design Decisions & Tradeoffs

| Decision | Reason |
|---|---|
| MongoDB over SQL | Flexible schema suits evolving financial record fields |
| Soft delete | Preserves data for audit trails; records are never hard deleted |
| Stateless JWT | Simpler horizontal scaling; no session store needed |
| Zod validation | Schema-first validation with TypeScript-friendly inference |
| Swagger annotations inline | Keeps docs co-located with routes; easier to maintain |
| No email verification | Out of scope for this assessment; noted as a future improvement |

---

##  Future Improvements

- [ ] Email verification on registration
- [ ] Refresh token support
- [ ] Rate limiting per IP / user
- [ ] Unit and integration tests
- [ ] Dockerization + docker-compose setup
- [ ] Advanced search across notes and categories

---

##  Author

**Srinidhi Jayakumar**
- GitHub: [@srinidhijayakumar](https://github.com/srinidhijayakumar)
- LinkedIn: [srinidhi-j](https://linkedin.com/in/srinidhi-j-69133937b)
- Email: srinidhijayakumarsk@gmail.com
