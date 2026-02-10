# Aegis: Crypto Intelligence Platform

A production-grade cryptocurrency intelligence dashboard featuring real-time data, AI-driven price predictions, and a professional financial UI.

## Features

- **Real-time Dashboard**: Live BTC/USDT price feed via WebSockets.
- **AI Predictions**: LSTM-based model predicting 24H price ranges with confidence intervals.
- **Order Book**: Live bid/ask table visualization.
- **Explainable AI**: Insights into market drivers (Sentiment, Technicals, Volume).
- **Tech Stack**: Next.js 14, FastAPI, TimescaleDB, Redis, Docker.

## Setup Instructions

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local frontend dev)
- Python 3.10+ (for local backend dev)

### Quick Start (Docker)

1. **Clone the repository** (if applicable) and navigate to the project root.

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - TimescaleDB: Port 5432
   - Redis: Port 6379

### Local Development

#### Backend
1. Navigate to `backend/`.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture

- **Frontend**: Next.js App Router, Tailwind CSS, Recharts.
- **Backend**: FastAPI, SQLAlchemy (Async), Pydantic.
- **ML Engine**: Simulated LSTM inference for demo (located in `app/ml/engine.py`).
- **Data**: TSDB (Timescale) for candles, Redis for pub/sub.
