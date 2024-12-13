from fastapi import APIRouter, HTTPException, Depends
from typing import List
from .schemas import TransactionCreate, TransactionResponse
from ..ml.models import FraudDetectionModel
from ..tasks import analyze_transaction

router = APIRouter()
model = FraudDetectionModel()

@router.post("/analyze", response_model=TransactionResponse)
async def analyze_transaction_endpoint(transaction: TransactionCreate):
    try:
        # Queue transaction for analysis
        task = analyze_transaction.delay(transaction.dict())
        
        return {
            "transaction_id": task.id,
            "status": "pending",
            "message": "Transaction queued for analysis"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{transaction_id}")
async def get_transaction_status(transaction_id: str):
    try:
        # Get transaction status from database
        transaction = Transaction.objects.get(id=transaction_id)
        return {
            "transaction_id": transaction_id,
            "status": transaction.status,
            "fraud_score": transaction.fraud_score
        }
    except Transaction.DoesNotExist:
        raise HTTPException(status_code=404, detail="Transaction not found") 