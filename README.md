# 🎬 MERN Movie App — Netflix-style Clone

This repository contains a full-stack movie application (client + server) built with the MERN stack (MongoDB, Express, React, Node). It provides user authentication, movie browsing, and AI-powered recommendation support. The app is intended as a learning project and a base you can extend.

---

## Key features

- User sign-up and sign-in (JWT-based authentication)
- Protected routes for user-only pages
- Movie browsing and detail pages
- AI-enhanced recommendations (client/lib/AIModel.js)
- Responsive Netflix-like UI
- Secure password hashing and input validation

---

## Tech stack

- Frontend: React (Vite) — see `client/`
- Backend: Node.js + Express — see `Server/`
- Database: MongoDB (Mongoose models in `Server/models`)
- Authentication: JWT + bcrypt
- Optional AI/recommendations: client/lib/AIModel.js (pluggable integration)

---

## Repo layout (important files/folders)

- `client/` — React app (Vite) with pages, components and assets
	- `src/pages` — pages (Homepage, Moviepage, Signin, Signup, AIRecommendations)
	- `src/components` — reusable UI components (Navbar, CardList, Loader, etc.)
	- `src/lib/AIModel.js` — AI recommendation helper (client-side integration)
- `Server/` — Express server
	- `Server/index.js` — app entry
	- `Server/config/db.js` — MongoDB connection
	- `Server/controllers` — route handlers
	- `Server/models/user.model.js` — user schema
	- `Server/routes/user.route.js` — user-related endpoints

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB running locally or a hosted MongoDB URI

---

## Quick start — development (Windows PowerShell examples)

1) Clone the repo and open the workspace.

2) Install dependencies for server and client.

```powershell
cd Server; npm install
cd ..\client; npm install
```

3)  Run server and client (in separate terminals):

```powershell
# run server
cd Server; node index.js - or - nodemon

# run client (new terminal)
cd client; npm run dev
```

Open the client URL printed by Vite (usually http://localhost:5173) and the server on its port.

---

## Where to look for specific behavior

- Authentication logic: `Server/controllers/user.controller.js` and `Server/routes/user.route.js`
- Client auth store: `client/src/store/authStore.js`
- AI/Recommendation helper: `client/src/lib/AIModel.js` and `client/src/pages/AIRecommendations.jsx`

---

## Contributing

Contributions are welcome. Small, well-scoped PRs are easiest to review. Please:

1. Fork the repo
2. Create a branch for your feature/fix
3. Add tests if applicable
4. Open a PR with a clear description of the change

---