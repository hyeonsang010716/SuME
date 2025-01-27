from db import db

class Audio(db.Model):
    __tablename__ = "audiofile"
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(200), nullable=False)

    @classmethod
    def create(cls, file_path):
        new_audio = cls(file_path=file_path)
        db.session.add(new_audio)
        db.session.commit()
        return new_audio

    @classmethod
    def get(cls, audio_id):
        return cls.query.get(audio_id)

    @classmethod
    def update(cls, audio_id, file_path):
        audio = cls.query.get(audio_id)
        if audio:
            audio.file_path = file_path
            db.session.commit()
        return audio

    @classmethod
    def delete(cls, audio_id):
        audio = cls.query.get(audio_id)
        if audio:
            db.session.delete(audio)
            db.session.commit()
        return audio