import os
import requests
import cloudinary.uploader
import cloudinary
from dotenv import load_dotenv


def text2speech(transcription, language="en"):
    
    load_dotenv('C:/Users/Pedro/Desktop/SF/server/.env')
    audio_folder = os.path.join(os.getcwd(), 'audio')
    os.makedirs(audio_folder, exist_ok=True)
    output_file = os.path.join(audio_folder, 'out.mp3')
    api_key = os.getenv('DG_API_KEY')
    api_secret = os.getenv('CLOUDINARY_API_SECRET')
    EL_API_KEY = os.getenv('EL_API_KEY')
    cloudinary.config( 
        cloud_name = "ddfhc4vjq", 
        api_key = "496158681641428", 
        api_secret = api_secret
    )
    
    if language == "en":
        url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"

        headers = {
            "Authorization": f"Token {api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "text": transcription,
        }

        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            with open(output_file, "wb") as f:
                f.write(response.content)
            print("File saved successfully.")
            upload_result = prepare_upload_audio()

        else:
            print(f"Error: {response.status_code} - {response.text}")
    else:
        url = "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB"
        CHUNK_SIZE = 1024

        headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": EL_API_KEY
        }

        data = {
        "text": transcription,
        "model_id": "eleven_multilingual_v2",
        "language_id":"es",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
        }
        }
 
 
        response = requests.post(url, json=data, headers=headers)
        with open(output_file, 'wb') as f:
            for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
                if chunk:
                    f.write(chunk)
                    
        upload_result = prepare_upload_audio()
    return upload_result
                
def prepare_upload_audio(file_path='audio/out.mp3', format='mp3'):

    
    upload_result = cloudinary.uploader.upload(file_path, resource_type="video", format=format)
    return upload_result['secure_url']
