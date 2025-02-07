from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from wtforms.validators import DataRequired


class AudioUploadForm(FlaskForm):
    audio = FileField('Upload Audio', validators=[
        FileRequired(),
        FileAllowed(['wav'], '오디오 타입은 Wav만 가능합니다')
    ])
    submit = SubmitField('Upload')