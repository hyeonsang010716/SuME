from api import create_app
from models.stt.google_cloude import rInit_GoogleCloudeSTT


app = create_app()
rInit_GoogleCloudeSTT()
app.run(host="0.0.0.0", port=5000, debug=True)