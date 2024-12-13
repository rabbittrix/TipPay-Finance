from pyspark.sql import SparkSession
from pyspark.sql.functions import col, window
from loguru import logger
from ..config.settings import settings

class SparkProcessor:
    def __init__(self):
        self.spark = SparkSession.builder \
            .appName("TipPay-DataProcessor") \
            .master(settings.SPARK_MASTER) \
            .config("spark.jars.packages", "org.postgresql:postgresql:42.2.18") \
            .getOrCreate()
    
    def process_transactions(self, df):
        """Process transaction data for analytics"""
        # Calculate transaction metrics
        metrics = df.groupBy(
            window(col("created_at"), "1 hour"),
            col("user_id")
        ).agg({
            "amount": "sum",
            "amount": "avg",
            "amount": "count"
        })
        
        return metrics
    
    def save_to_postgres(self, df, table_name):
        """Save DataFrame to PostgreSQL"""
        df.write \
            .format("jdbc") \
            .option("url", f"jdbc:postgresql://{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}") \
            .option("dbtable", table_name) \
            .option("user", settings.POSTGRES_USER) \
            .option("password", settings.POSTGRES_PASSWORD) \
            .mode("append") \
            .save() 