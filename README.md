# Study Room Booking

A full-stack booking platform for reserving quiet study and discussion rooms. It includes JWT authentication, room management, reservation history, cancellation, admin availability controls, responsive UI, validation, and API error handling.

## Stack

- Client: React + Vite + React Router + Axios
- Server: Node.js + Express + MongoDB/Mongoose + JWT
- Validation: Zod

## Quick start

1. Create a MongoDB Atlas cluster and copy its connection string.
2. In `server`, copy `.env.example` to `.env` and provide `MONGODB_URI` and `JWT_SECRET`.
3. Install and start the API:

```bash
cd server
npm install
npm run seed
npm run dev
```

4. In another terminal, install and start the client:

```bash
cd client
npm install
npm run dev
```

The demo accounts seeded are `student@example.com` / `Password123!` and `admin@example.com` / `Password123!`.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a student account |
| POST | `/api/auth/login` | Sign in and receive JWT |
| GET | `/api/auth/me` | Current user |
| GET | `/api/rooms` | Browse rooms (supports search/filtering) |
| POST | `/api/rooms` | Create a room (admin) |
| PATCH | `/api/rooms/:id` | Update a room (admin) |
| DELETE | `/api/rooms/:id` | Delete a room (admin) |
| GET | `/api/bookings` | Current user's bookings |
| POST | `/api/bookings` | Create a booking |
| PATCH | `/api/bookings/:id/cancel` | Cancel a booking |

## Deployment

- Deploy `client` on Vercel and set `VITE_API_URL` to the Render API URL plus `/api`.
- Deploy `server` on Render, set the environment variables in `.env.example`, and set `CLIENT_ORIGIN` to the Vercel URL.

