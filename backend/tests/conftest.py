import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from ..apps.fraud_detection.api.endpoints import app
from ..apps.fraud_detection.ml.models import FraudDetectionModel

@pytest.fixture
def test_db():
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/tippay_test"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create test database
    Base.metadata.create_all(bind=engine)
    
    yield TestingSessionLocal()
    
    # Clean up
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def test_client():
    return TestClient(app)

@pytest.fixture
def ml_model():
    return FraudDetectionModel() 