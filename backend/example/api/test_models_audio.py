import unittest
from api import create_app, db


class AudioCRUDTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app()
        self.app.testing = True
        self.app.debug = True
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.create_all()

    def tearDown(self) -> None:
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
    
    
    def test_create_audio(self):
        file_path = file_path = "./example/stt/example_audio_file/Trip (Feat. Hannah).wav"

        with open(file_path, 'rb') as audio_file:
            data = {
                'audio': audio_file,
                'filename': "test",
            }
            response = self.client.post(
                '/audio',
                data=data,
                content_type='multipart/form-data',
            )
        self.assertEqual(response.status_code, 200)
        self.assertIn('message', 'successfully')