# Voyara — Travel Booking Platform

A MakeATrip-style travel booking platform with an AI-powered travel guide chatbot. Browse destinations, book city activities and hotel stays, and manage your bookings — all in one place.

## Tech Stack

- **Frontend** — Static HTML/CSS + React (via Babel standalone, no build step)
- **Backend** — Node.js + Express
- **Database & Auth** — Supabase (PostgreSQL + Auth)
- **AI Chatbot** — OpenAI GPT (gpt-4.1-nano)

## Features

- Browse tours & destinations across India
- Book city activities with login-gated flow
- Browse hotel stays (26 cities)
- Manage and cancel bookings
- AI travel guide chatbot (travel queries only, 2-strike system)
- Auth modal (sign up / login) on every page
- Profile drawer with recent bookings
- Auto token refresh for persistent sessions

## Project Structure

```
├── backend/          Express server, API routes, Supabase & OpenAI config
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
└── makeAtrip/        Static frontend served by Express
    ├── index.html
    ├── voyara.css
    ├── hotels/
    ├── travel/
    └── tours_and_destinations/
```

## Setup

1. **Clone and install**
   ```bash
   cd backend
   npm install
   ```

2. **Create `backend/.env`**
   ```
   OPENAI_API_KEY=your_openai_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_role_key
   SUPABASE_ANON_KEY=your_anon_key
   PORT=3000
   ```

3. **Run**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/config` | Serves Supabase anon key to frontend |
| POST | `/api/auth/signup` | Register |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/refresh` | Refresh JWT |
| GET | `/api/bookings` | Get user bookings |
| POST | `/api/bookings` | Create booking |
| DELETE | `/api/bookings/:id` | Cancel booking |
| POST | `/api/chat/message` | Send chat message |
| GET | `/api/chat/history/:sessionId` | Get chat history |
| DELETE | `/api/chat/session/:sessionId` | Delete chat session |
