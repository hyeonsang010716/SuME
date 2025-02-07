from api.models import db
from datetime import datetime


class Audio(db.Model):
    __tablename__ = 'audio'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    file_path = db.Column(db.String(200), nullable=False)
    create_time = db.Column(db.DateTime, nullable=False)

    @classmethod
    def create(cls, filename, file_path):
        new_audio = cls(
            filename=filename,
            file_path=file_path,
            create_time=datetime.now()
        )
        db.session.add(new_audio)
        db.session.commit()
        return new_audio

    @classmethod
    def get(cls, id: int=None, filename: str=None):
        if id is not None:
            return cls.query.get(id)
        elif filename is not None:
            return cls.query.filter(cls.filename==filename).first()
        return None

    @classmethod
    def update(cls, audio_name, file_path):
        audio = cls.query.get(audio_name)
        if audio:
            audio.file_path = file_path
            db.session.commit()
        return audio

    @classmethod
    def delete(cls, audio_name):
        audio = cls.query.get(audio_name)
        if audio:
            db.session.delete(audio)
            db.session.commit()
        return audio