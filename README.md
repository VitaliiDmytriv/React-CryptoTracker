# 📈 Crypto Portfolio Tracker

![React](https://img.shields.io/badge/react-19-blue)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)
![Node](https://img.shields.io/badge/node.js-backend-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A full-stack web application for tracking your cryptocurrency portfolio in real time. Built with a modern production stack across both frontend and backend.

> 🚧 **In active development** — core features are functional, additional improvements ongoing.

---

## 🖥️ Tech Stack

**Frontend**

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- [TanStack Query v5](https://tanstack.com/query) — server state management with typed query key factory
- [Zustand](https://zustand-demo.pmnd.rs/) — client state management
- [Axios](https://axios-http.com/) — HTTP client with request/response interceptors
- [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/) — form handling and schema validation
- [React Router v7](https://reactrouter.com/) — client-side routing

**Backend**

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) + [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — database access
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT authentication

**External API**

- [CoinGecko API](https://www.coingecko.com/en/api) — real-time cryptocurrency market data

---

## ✨ Features

- 🔐 JWT authentication via HttpOnly cookies (XSS-safe)
- 📊 Real-time crypto prices and market data via CoinGecko _(in progress)_
- 💼 Portfolio and transaction management
- 📋 Dashboard with aggregated portfolio analytics _(in progress)_
- 🌙 Dark / light mode

---

## 🏗️ Architecture Overview

The project follows a feature-based architecture where each domain (auth, portfolio, transactions) owns its UI, hooks, API layer and types.

Key principles:

- Feature isolation
- Presentational components with logic extracted into hooks
- Service layer for API requests
- React Query for server state
- Zustand for client-only UI state
- Zod schemas as a single source of truth
- Typed query key factories for cache invalidation
- Decimal.js for financial precision

---

## System Architecture

UI Components
│
▼
Custom Hooks
(business logic)
│
▼
API Service Layer
(\*.api.ts)
│
▼
Axios Client
(interceptors)
│
▼
Express API
│
▼
Database (SQLite / Prisma)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/VitaliiDmytriv/React-CryptoTracker.git
cd React-CryptoTracker

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### Environment Variables

Create a `.env` in the `server/` folder:

```env
JWT_SECRET=your_jwt_secret
DATABASE_URL="file:./dev.db"
```

### Database Initialization

```bash
#Create the database file and tables
npx prisma migrate dev

#Insert the initial data
npx prisma db seed

# Open Prisma Studio to browse your database
npx prisma studio
```

### Run the app

```bash
# Terminal 1 — backend
cd server
npm run backend

# Terminal 2 — frontend
npm run dev
```

---

## ⚙️ Planned Improvements

- 💼 Multiple portfolios — users will be able to create and manage more than one portfolio
- 📊 Portfolio valuation — calculate real-time portfolio value based on owned assets and market prices
  📈 Profit charts — display detailed transaction tables and charts to track portfolio performance over time
