import random
from datetime import datetime, timedelta

class MarketService:
    async def get_latest_price(self, symbol: str):
        # Simulation: In prod, fetch from Redis or External API
        base_price = 64231.50
        noise = random.uniform(-50, 50)
        return {
            "symbol": symbol,
            "price": base_price + noise,
            "change_24h": 2.5,
            "timestamp": datetime.now().isoformat()
        }

    async def get_ohlcv(self, symbol: str, timeframe: str):
        # Simulation: Generate dummy OHLCV data
        data = []
        base_price = 64000.0
        now = datetime.now()
        
        for i in range(24):
            time_point = now - timedelta(hours=24-i)
            open_p = base_price + random.uniform(-100, 100)
            close_p = open_p + random.uniform(-50, 50)
            high_p = max(open_p, close_p) + random.uniform(0, 50)
            low_p = min(open_p, close_p) - random.uniform(0, 50)
            
            data.append({
                "time": time_point.isoformat(),
                "open": open_p,
                "high": high_p,
                "low": low_p,
                "close": close_p,
                "volume": random.uniform(100, 500)
            })
            base_price = close_p
            
        return data

market_service = MarketService()
