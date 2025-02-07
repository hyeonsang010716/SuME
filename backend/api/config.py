import os


class Config:
    '''공통 설정'''
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEST = False
    DEBUG = False
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    JSON_AS_ASCII = False
    JSONIFY_PRETTYPRINT_REGULAR = False


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///dev.db"
    DEBUG = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///prov.db"


config = {
    "default": ProductionConfig,
    "production": ProductionConfig,
    "development": DevelopmentConfig,
}