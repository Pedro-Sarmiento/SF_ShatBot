from flask import Flask
from config.config import Config, ProductionConfig, DevelopmentConfig, TestingConfig
from config.logger import conf_logging 
import os, cloudinary


conf_logging() 

def create_app(config_class=Config):
    
    cloudinary.config(
        cloudinary_url=os.getenv('CLOUDINARY_URL')
    )
    
    app = Flask(__name__)

    if Config.FLASK_ENV == 'development':
        app.config.from_object(DevelopmentConfig)

    elif Config.FLASK_ENV == 'production':
        app.config.from_object(ProductionConfig)

    else:
        app.config.from_object(TestingConfig) 


    return app
