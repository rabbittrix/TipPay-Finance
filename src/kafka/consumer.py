from confluent_kafka import Consumer, KafkaError
from loguru import logger
from ..config.settings import settings
import json

class KafkaConsumer:
    def __init__(self, topics):
        self.consumer = Consumer({
            'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
            'group.id': 'tippay_data_processor',
            'auto.offset.reset': 'earliest'
        })
        self.topics = topics
        self.consumer.subscribe(topics)
    
    def process_messages(self, callback):
        try:
            while True:
                msg = self.consumer.poll(1.0)
                
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        logger.info('Reached end of partition')
                    else:
                        logger.error(f'Error: {msg.error()}')
                    continue
                
                data = json.loads(msg.value().decode('utf-8'))
                callback(data)
                
        except KeyboardInterrupt:
            pass
        finally:
            self.consumer.close() 