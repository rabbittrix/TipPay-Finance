from elasticsearch import Elasticsearch
from loguru import logger
from ..config.settings import settings

class ElasticsearchClient:
    def __init__(self):
        self.es = Elasticsearch([
            f'http://{settings.ELASTICSEARCH_HOST}:{settings.ELASTICSEARCH_PORT}'
        ])
        
    def index_transaction(self, transaction_data):
        """Index transaction data for search"""
        try:
            self.es.index(
                index="transactions",
                document=transaction_data
            )
        except Exception as e:
            logger.error(f"Error indexing transaction: {e}")
    
    def search_transactions(self, query):
        """Search transactions"""
        try:
            result = self.es.search(
                index="transactions",
                body={
                    "query": {
                        "multi_match": {
                            "query": query,
                            "fields": ["user_id", "status", "amount"]
                        }
                    }
                }
            )
            return result['hits']['hits']
        except Exception as e:
            logger.error(f"Error searching transactions: {e}")
            return [] 