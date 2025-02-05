from api import create_app
from models.stt.google_cloude import rInit_GoogleCloudeSTT
from dotenv import load_dotenv


load_dotenv()
app = create_app()
rInit_GoogleCloudeSTT()
app.run(host="0.0.0.0", port=5000, debug=True)
