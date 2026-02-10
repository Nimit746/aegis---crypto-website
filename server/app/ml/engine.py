import numpy as np
import tensorflow as tf
import pickle
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go to app/ directory
APP_DIR = os.path.dirname(BASE_DIR)

# models folder is inside app/
MODEL_DIR = os.path.join(APP_DIR, "models")


class AegisMLEngine:
    def __init__(self):

        # Load Anomaly Model
        with open(os.path.join(MODEL_DIR, "anomaly_detector.pkl"), "rb") as f:
            self.anomaly_model = pickle.load(f)

        # Load Risk Model
        with open(os.path.join(MODEL_DIR, "risk_classifier.pkl"), "rb") as f:
            self.risk_model = pickle.load(f)

        # Load LSTM Model
        self.btc_model = tf.keras.models.load_model(
            os.path.join(MODEL_DIR, "btc_model.h5")
        )

    def detect_anomaly(self, data):
        data = np.array(data).reshape(1, -1)
        return self.anomaly_model.predict(data)[0]

    def classify_risk(self, data):
        data = np.array(data).reshape(1, -1)
        return self.risk_model.predict(data)[0]

    def predict_price(self, price_series):
        arr = np.array(price_series).reshape(1, -1, 1)
        pred = self.btc_model.predict(arr)
        return float(pred[0][0])


# Singleton instance
ml_engine = AegisMLEngine()
