FROM python:3.12.3
WORKDIR /backend
ADD . .
RUN apt-get update && apt-get install -y ffmpeg
RUN pip install --upgrade pip && pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]