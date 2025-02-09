from flask_login import UserMixin
from api.models import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)  
    password_hash = db.Column(db.String(256), nullable=False)  


    def __repr__(self):
        return f"<User {self.name}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def get_user_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def create(cls, name, email, password):
        if cls.get_user_by_email(email):
            return None  
        
        new_user = cls(name=name, email=email)
        new_user.set_password(password)  
        db.session.add(new_user)
        db.session.commit()
        return new_user
