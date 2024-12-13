from pydantic import BaseModel
from decimal import Decimal
from typing import Optional

class TransactionCreate(BaseModel):
    amount: Decimal
    user_id: str
    device_id: str
    ip_address: str
    location: str

class TransactionResponse(BaseModel):
    transaction_id: str
    status: str
    message: Optional[str] = None 