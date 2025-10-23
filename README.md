Sikkim Heritage 360

This repo contains a minimal working MVP for the web platform:
- Server: Node/Express API with in-memory artifacts and search
- Client: Vite + React UI with archive, 360 tour placeholder, and circuit planner placeholder

Quickstart

1) Server
- cd server
- npm install
- cp .env.example .env (optional)
- npm run dev

2) Client
- cd client
- npm install
- npm run dev

Open http://localhost:5173

Next Steps

- Replace in-memory data with MongoDB (Atlas). Add models and CRUD.
- Add 360 viewer (e.g., Marzipano, React-Three-Fiber with spherical panorama).
- Integrate a map API for the planner and a cultural calendar collection.
- Build Unity AR app with AR Foundation and image tracking using the same media set.
