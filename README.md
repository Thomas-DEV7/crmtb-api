
# CRMTB API

[![CI](https://img.shields.io/github/actions/workflow/status/<YOUR_GH_USER>/<YOUR_REPO>/ci.yml?label=CI&logo=github)](https://github.com/<YOUR_GH_USER>/<YOUR_REPO>/actions)
[![Coverage](https://img.shields.io/badge/coverage-90%25-green)](#) 
[![Node](https://img.shields.io/badge/node-%3E%3D18.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Production-minded REST API with clean architecture, validation, auth and great DX.

**Live demo:** `TODO: add URL (Render/Railway/Vercel)`  
**API docs (Swagger/Redoc):** `TODO: add /docs URL (ex.: https://api.example.com/docs)`

---

## ✨ Highlights

- **Clean Architecture** (Controller → Service → Repository)  
- **Validation** with DTOs (Zod/Yup/Class-Validator)  
- **Auth** via JWT Bearer + roles (admin/user)  
- **Observability** (Healthcheck + logs + request id)  
- **Tests** (unit + integration) with coverage  
- **CI/CD** (GitHub Actions)  
- **OpenAPI** (Swagger/Redoc) with real examples

---

## 📦 Tech Stack

- **Node.js 18+**, **TypeScript** (if applicable)
- **Express** (or Fastify)  
- **Prisma + PostgreSQL** (or MySQL)  
- **Jest/Vitest + Supertest**  
- **ESLint + Prettier**  
- **Swagger UI / Redoc**

> *Note:* adapt names according to your current stack. This README is already “portfolio-ready”.

---

## 🧭 Example Endpoints

- `GET /health` → `{"up": true, "name": "CRMTB API"}`
- `POST /auth/login` → returns `{ access_token }`  
- `GET /v1/customers?search=` → pagination + filters (example)  
- `POST /v1/uploads` → file upload (example)

---

## 🚀 Quickstart

### 1) Requirements
- Node 18+  
- PNPM/Yarn/NPM  
- Docker (optional)  
- Database (PostgreSQL or MySQL)

### 2) Environment setup
Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Example:
```
PORT=3333
NODE_ENV=development

# Auth
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d

# Database (Prisma)
DATABASE_URL="postgresql://user:pass@localhost:5432/crmtb?schema=public"

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3) Install & run

```bash
# install deps
pnpm install   # or yarn / npm i

# (optional) run DB with docker
docker compose up -d

# prisma
pnpm prisma:generate
pnpm prisma:migrate

# seed (optional)
pnpm seed

# run in dev
pnpm dev

# production
pnpm build && pnpm start
```

**Healthcheck:**  
```bash
curl http://localhost:3333/health
```

---

## 📚 API Documentation (OpenAPI)

- **Swagger UI:** `GET /docs`  
- **OpenAPI JSON:** `GET /openapi.json`

---

## ✅ Tests & Quality

```bash
# tests
pnpm test

# coverage
pnpm test:coverage

# lint & format
pnpm lint
pnpm format
```

---

## 🔒 Security

- JWT Bearer (`Authorization: Bearer <token>`)
- Rate limiting & Helmet (recommended)
- CORS configurable via `.env`
- Payload sanitization & validation

---

## 🏗️ Folder Structure (example)

```
src/
  app.ts
  server.ts
  config/
  routes/
  modules/
    auth/
      auth.controller.ts
      auth.service.ts
      auth.repository.ts
      auth.dto.ts
    customers/
      customers.controller.ts
      customers.service.ts
      customers.repository.ts
      customers.dto.ts
  middlewares/
  infra/
    prisma/
      client.ts
  tests/
```

---

## 🔁 CI/CD (GitHub Actions)

- **CI:** lint, build and tests on every PR  
- **CD (optional):** automatic deploy (Render/Railway)

---

## 🧪 Postman / Thunder Collections

- Collection: `./docs/CRMTB.postman_collection.json`  
- Environment: `./docs/CRMTB.postman_environment.json`  

---

## 🧩 Usage Examples

### Login
```bash
curl -X POST http://localhost:3333/auth/login   -H "Content-Type: application/json"   -d '{ "email": "admin@crmtb.app", "password": "secret" }'
```

### Protected resource
```bash
curl http://localhost:3333/v1/customers   -H "Authorization: Bearer <token>"
```

---

## 🤝 Contribution

1. Create a branch `feat/awesome-feature`  
2. Commit in English, clear and descriptive  
3. Open a PR with screenshots/prints of the doc

---

## 📝 Roadmap

- [ ] Webhooks integration  
- [ ] Cache (Redis) for heavy queries  
- [ ] Observability: p99/p50, tracing, dashboards  
- [ ] Async uploads with queue  
- [ ] Feature flags (for A/B)

---

## 📜 License

MIT © `TODO: Thomas Bastos`

---

### 🇧🇷 Note
This README is in **English** for global portfolio. Keep this note in PT-BR if you want a bilingual touch.
