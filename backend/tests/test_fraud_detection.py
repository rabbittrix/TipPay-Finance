import pytest
from ..apps.fraud_detection.models import Transaction
from decimal import Decimal

def test_transaction_analysis(test_client, ml_model):
    # Test data
    transaction_data = {
        "amount": 1000.00,
        "user_id": "123e4567-e89b-12d3-a456-426614174000",
        "device_id": "device123",
        "ip_address": "192.168.1.1",
        "location": "New York"
    }
    
    # Test API endpoint
    response = test_client.post("/api/analyze", json=transaction_data)
    assert response.status_code == 200
    
    # Verify response structure
    data = response.json()
    assert "transaction_id" in data
    assert "status" in data
    assert data["status"] in ["pending", "approved", "rejected", "flagged"]

def test_ml_model_prediction(ml_model):
    # Test prediction
    transaction = {
        "amount": Decimal("1000.00"),
        "user_history_length": 365,
        "transaction_frequency": 0.5,
        "average_amount": Decimal("500.00")
    }
    
    prediction = ml_model.predict(transaction)
    assert 0 <= prediction <= 1

@pytest.mark.asyncio
async def test_async_transaction_processing(test_db):
    # Create test transaction
    transaction = Transaction(
        amount=Decimal("1000.00"),
        user_id="123e4567-e89b-12d3-a456-426614174000",
        status="pending"
    )
    test_db.add(transaction)
    await test_db.commit()
    
    # Verify transaction was saved
    saved_transaction = await test_db.query(Transaction).first()
    assert saved_transaction is not None
    assert saved_transaction.amount == Decimal("1000.00") 