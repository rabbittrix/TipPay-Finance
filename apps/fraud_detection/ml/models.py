import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
from ..models import MLModel
from .utils import preprocess_transaction

class FraudDetectionModel:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        try:
            # Load the latest active model from database
            ml_model = MLModel.objects.filter(is_active=True).latest('created_at')
            self.model = joblib.load(ml_model.file_path)
        except Exception as e:
            # Load default model if no saved model exists
            self.model = RandomForestClassifier()
    
    def predict(self, transaction_data):
        features = preprocess_transaction(transaction_data)
        prediction = self.model.predict_proba(features)
        return prediction[0][1]  # Return probability of fraud
    
    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)
        return self.model 