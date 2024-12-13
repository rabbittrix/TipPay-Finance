import redis
import json
from ..config.settings import settings

class RedisCache:
    def __init__(self):
        self.redis = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            decode_responses=True
        )
    
    def cache_transaction(self, transaction_id, data, expire_seconds=3600):
        """Cache transaction data"""
        key = f"transaction:{transaction_id}"
        self.redis.setex(
            key,
            expire_seconds,
            json.dumps(data)
        )
    
    def get_transaction(self, transaction_id):
        """Get cached transaction data"""
        key = f"transaction:{transaction_id}"
        data = self.redis.get(key)
        return json.loads(data) if data else None 