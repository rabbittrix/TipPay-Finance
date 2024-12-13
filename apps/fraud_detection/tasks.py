from celery import shared_task
from .ml.models import FraudDetectionModel
from .models import Transaction

@shared_task
def analyze_transaction(transaction_data):
    model = FraudDetectionModel()
    
    # Get fraud prediction
    fraud_score = model.predict(transaction_data)
    
    # Update transaction status based on score
    transaction = Transaction.objects.get(id=transaction_data['id'])
    transaction.fraud_score = fraud_score
    
    if fraud_score > 0.8:
        transaction.status = 'rejected'
    elif fraud_score > 0.5:
        transaction.status = 'flagged'
    else:
        transaction.status = 'approved'
    
    transaction.save()
    return transaction.id

@shared_task
def train_model():
    # Get training data
    transactions = Transaction.objects.all()
    X, y = prepare_training_data(transactions)
    
    # Train model
    model = FraudDetectionModel()
    new_model = model.train(X, y)
    
    # Save new model
    save_model(new_model) 