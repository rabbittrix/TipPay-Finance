import numpy as np

def preprocess_transaction(transaction_data):
    # Convert transaction data into feature array
    features = np.array([
        transaction_data['amount'],
        transaction_data.get('user_history_length', 0),
        transaction_data.get('transaction_frequency', 0),
    ]).reshape(1, -1)
    
    return features 