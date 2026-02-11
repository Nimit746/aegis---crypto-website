import numpy as np
import tensorflow as tf
import pickle
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.dirname(BASE_DIR)
MODEL_DIR = os.path.join(APP_DIR, "models")

class AegisMLEngine:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.anomaly_model = None
        self.risk_model = None
        
        # Load static models
        self._load_static_models()

    def _load_static_models(self):
        """Load anomaly and risk models which are always needed"""
        try:
            anomaly_path = os.path.join(MODEL_DIR, "anomaly_detector.pkl")
            if os.path.exists(anomaly_path):
                with open(anomaly_path, "rb") as f:
                    self.anomaly_model = pickle.load(f)
                logger.info("Anomaly model loaded successfully")
            
            risk_path = os.path.join(MODEL_DIR, "risk_classifier.pkl")
            if os.path.exists(risk_path):
                with open(risk_path, "rb") as f:
                    self.risk_model = pickle.load(f)
                logger.info("Risk model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading static models: {e}")

    def _load_coin_model(self, coin: str):
        """Lazy load coin-specific models"""
        if coin in self.models:
            return self.models[coin], self.scalers.get(coin)
        
        try:
            model_path = os.path.join(MODEL_DIR, f"{coin.lower()}_model.h5")
            scaler_path = os.path.join(MODEL_DIR, f"{coin.lower()}_scaler.pkl")
            
            if os.path.exists(model_path):
                self.models[coin] = tf.keras.models.load_model(model_path)
                logger.info(f"Model for {coin} loaded successfully")
                
                if os.path.exists(scaler_path):
                    with open(scaler_path, "rb") as f:
                        self.scalers[coin] = pickle.load(f)
                    logger.info(f"Scaler for {coin} loaded successfully")
                
                return self.models[coin], self.scalers.get(coin)
            else:
                logger.warning(f"No model found for {coin} at {model_path}")
                return None, None
        except Exception as e:
            logger.error(f"Error loading model for {coin}: {e}")
            return None, None

    def detect_anomaly(self, data):
        if not self.anomaly_model:
            return 0 # Default non-anomaly
        try:
            data = np.array(data).reshape(1, -1)
            return self.anomaly_model.predict(data)[0]
        except Exception as e:
            logger.error(f"Anomaly detection error: {e}")
            return 0

    def classify_risk(self, data):
        if not self.risk_model:
            return "medium" # Default
        try:
            data = np.array(data).reshape(1, -1)
            return self.risk_model.predict(data)[0]
        except Exception as e:
            logger.error(f"Risk classification error: {e}")
            return "medium"

    def predict_price(self, coin: str, price_series: list):
        model, scaler = self._load_coin_model(coin)
        if not model:
            return None
        
        try:
            # Basic preprocessing (would need actual scaler logic if available)
            # For now, just reshape if no scaler
            input_data = np.array(price_series).reshape(1, -1, 1)
            
            # If we had a scaler, we would use it here:
            # if scaler: input_data = scaler.transform(input_data)
            
            pred = model.predict(input_data, verbose=0)
            return float(pred[0][0])
        except Exception as e:
            logger.error(f"Price prediction error for {coin}: {e}")
            return None

# Singleton instance
ml_engine = AegisMLEngine()
