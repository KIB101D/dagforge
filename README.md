# DAGForge

Visual pipeline builder for creating and validating DAGs (Directed Acyclic Graphs).

## 🌐 Live Demo

[DAGForge Link](https://dagforge.vercel.app/)

## Features

- Drag-and-drop pipeline editor
- Custom node types
- DAG cycle detection
- React Flow visualization
- FastAPI backend
- Vercel + Railway deployment

## Tech Stack

- React
- React Flow
- Zustand
- FastAPI
- Python

## Project Structure

```text
dagforge/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Run Locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend: `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend: `http://localhost:3000`

## Deployment

- Frontend: Vercel
- Backend: Railway

Set the frontend environment variable:

```env
REACT_APP_API_URL=https://your-railway-backend-url
```

The frontend sends pipeline data to:

```text
POST /pipelines/parse
```
