from .schemas import TransactionCreate, TransactionResponse
from decimal import Decimal

def test_transaction_create():
    # Criar uma transação válida
    transaction = TransactionCreate(
        amount=Decimal("100.50"),
        user_id="user123",
        device_id="device456",
        ip_address="192.168.1.1",
        location="New York"
    )
    
    # Verificar se os dados foram validados corretamente
    assert transaction.amount == Decimal("100.50")
    assert transaction.user_id == "user123"
    assert transaction.device_id == "device456" 