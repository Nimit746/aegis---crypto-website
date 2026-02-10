from fastapi import APIRouter
from app.services.market_service import market_service
from app.ml.engine import lstm_predictor

router = APIRouter()

@router.get("/market/{symbol}/price")
async def get_price(symbol: str):
    return await market_service.get_latest_price(symbol)

@router.get("/market/{symbol}/ohlcv")
async def get_history(symbol: str, timeframe: str = "1h"):
    return await market_service.get_ohlcv(symbol, timeframe)

@router.get("/prediction/{symbol}")
async def get_prediction(symbol: str):
    # Get current price first
    market_data = await market_service.get_latest_price(symbol)
    prediction = lstm_predictor.predict_next_24h(market_data["price"])
    return prediction
