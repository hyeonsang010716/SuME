from db import db

class Audio(db.Model):
    __tablename__ = "audiofile"
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(200), nullable=False)