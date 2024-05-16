import os
from dotenv import load_dotenv

load_dotenv() 

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    DG_API_KEY= os.getenv('DG_API_KEY')
    
class ProductionConfig(Config):
    DEBUG = True

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    DEBUG = True