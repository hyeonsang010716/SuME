from api.models import db
from datetime import datetime


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('events', lazy=True))


    @classmethod
    def create(cls, title, description, start_time, end_time, user_id):
        if isinstance(start_time, str):
            start_time = datetime.fromisoformat(start_time)
        if isinstance(end_time, str):
            end_time = datetime.fromisoformat(end_time)

        new_event = cls(
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time,
            user_id=user_id
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event
    
    @classmethod
    def get_event_by_title(cls, title):
        return cls.query.filter_by(title=title).first()
    
    @classmethod
    def get_user_events(cls, user_id, start_date, end_date):
        cls.query.filter(
            and_(
                cls.user_id == user_id,
                cls.start_time >= start_date,
                cls.end_time <= end_date
            )
        ).all()

    @classmethod
    def delete(cls, title):
        target_event = cls.query.filter_by(title=title).first()
        if not target_event:
            raise ValueError(f'Not found {title} Event')
        db.session.delete(target_event)
        db.session.commit()

        