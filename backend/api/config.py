import os


class Config:
    '''공통 설정'''
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEST = False
    DEBUG = False
    MAX_CONTENT_LENGTH = 32 * 1024 * 1024
    JSON_AS_ASCII = False
    JSONIFY_PRETTYPRINT_REGULAR = False
    USE_RELOADER=False


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///dev.db"
    JWT_SECRET_KEY="dev_secret_key"
    DEBUG = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///prov.db"


config = {
    "default": DevelopmentConfig,
    "production": ProductionConfig,
    "development": DevelopmentConfig,
}