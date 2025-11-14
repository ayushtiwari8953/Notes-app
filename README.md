# Notes App (Local - Windows)

This package contains a full-stack Notes App (React frontend + Node/Express backend + MongoDB).

## Setup (Windows)

1. Make sure MongoDB is installed and `mongod` is running (default port 27017).
2. Open two terminals.

### Backend
```
cd Notes_app/backend
npm install
npm run dev
```
Server: http://localhost:4000

### Frontend
```
cd Notes_app/frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Default .env
The backend .env file (backend/.env) uses:
MONGODB_URI=mongodb://localhost:27017/notesdb
PORT=4000
JWT_SECRET=yourVerySecretKeyHere

Change JWT_SECRET for production.
