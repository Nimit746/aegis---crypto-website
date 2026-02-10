from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aegis Crypto Intelligence"
    DATABASE_URL: str = "postgresql+asyncpg://aegis_user:aegis_password@timescaledb:5432/aegis_db"
    REDIS_URL: str = "redis://redis:6379"
    
    class Config:
        env_file = ".env"

settings = Settings()
