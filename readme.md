# 🎯 Provably Fair Plinko Game

A full-stack Provably Fair Plinko game built with React, Node.js, Express, Prisma, PostgreSQL, and Supabase.

The project demonstrates a complete commit-reveal fairness system where every game outcome can be independently verified by the player.

---

## 🌐 Live Demo

**Frontend:** https://plinko-eight-gamma.vercel.app/

**Backend:** https://plinko-5y3l.onrender.com/

---

## ✨ Features

### 🎲 Plinko Gameplay

* Interactive Plinko board with animated ball drop
* Configurable client seed
* Adjustable bet amount
* Adjustable drop column bias
* Winning bin highlighting
* Deterministic outcome generation

### 🔐 Provably Fair System

* SHA-256 commit generation
* Server seed generation
* Client seed support
* Nonce generation
* Commit-Reveal workflow
* Independent verification endpoint
* Replayable deterministic results

### ♿ Accessibility

* Left Arrow → Move drop column left
* Right Arrow → Move drop column right
* Spacebar → Drop ball
* Honors `prefers-reduced-motion`

### 🎨 User Interface

* Animated Plinko board
* Fairness verification panel
* Reveal server seed functionality
* Responsive layout
* Dark mode styling

---

## 🏗️ Architecture

Frontend:

* React
* Axios
* Vite

Backend:

* Node.js
* Express
* Prisma ORM

Database:

* PostgreSQL
* Supabase

Deployment:

* Vercel (Frontend)
* Render (Backend)

---

## 🔄 Provably Fair Workflow

### Step 1: Create Commit

Server generates:

* Server Seed
* Nonce

Server computes:

```text
commitHex = SHA256(serverSeed)
```

Only the commit hash is shared with the player.

---

### Step 2: Player Starts Round

Player submits:

```text
clientSeed
betAmount
dropColumn
```

Combined seed is generated:

```text
combinedSeed =
SHA256(serverSeed + clientSeed + nonce)
```

---

### Step 3: Generate Outcome

The deterministic Plinko engine uses:

```text
combinedSeed
dropColumn bias
```

to generate:

```text
path
binIndex
pegMapHash
```

---

### Step 4: Reveal

After the round, the server reveals:

```text
serverSeed
```

---

### Step 5: Verify

The verifier recomputes:

```text
combinedSeed
binIndex
pegMapHash
```

and compares them against stored values.

If they match:

```text
✅ VERIFIED
```

the result has not been manipulated.

---

## 📡 API Endpoints

### Create Commit

```http
POST /api/rounds/commit
```

Response:

```json
{
  "success": true,
  "roundId": "...",
  "commitHex": "..."
}
```

---

### Start Round

```http
POST /api/rounds/:id/start
```

Request:

```json
{
  "clientSeed": "shivam",
  "betCents": 100,
  "dropColumn": 6
}
```

---

### Reveal Round

```http
POST /api/rounds/:id/reveal
```

---

### Verify Round

```http
GET /api/rounds/:id/verify
```

---

## 📸 Screenshots

### Main Game Board

*Add screenshot here*

### Ball Drop Result

*Add screenshot here*

### Fairness Verification

*Add screenshot here*

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/shivcodecf/Plinko.git
```

### Backend

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Backend:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

Frontend:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Accessibility Support

* Keyboard navigation
* Spacebar gameplay controls
* Reduced motion mode support

---

## 👨‍💻 Author

**Shivam Yadav**

Backend Developer

GitHub: https://github.com/shivcodecf
