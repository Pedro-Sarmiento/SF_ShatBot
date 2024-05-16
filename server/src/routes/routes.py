from flask import request, jsonify, Blueprint
from src.chat import ChatGPT, Mistral
from flask_cors import CORS
from src.audio_recorder import audio_recorder
from src.speech2text import speech2text
from src.text2speech import text2speech

api = Blueprint('api', __name__)

chatbot_gpt = ChatGPT()
chatbot_mistral = Mistral()
CORS(api)

@api.route("/", methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    model = data['model']
    if model != "mistral":
        ai_response = chatbot_gpt.generate_response(user_message, model)
        return ai_response
    else:
        ai_response = chatbot_mistral.generate_response(user_message)
        return ai_response

@api.route("/audio", methods=['POST'])
def audio():
    data = request.get_json()
    language = data['language']
    str = audio_recorder()
    if str == "ERROR: Try again":
        return str
    else:
        transcription = speech2text(language)
        return transcription 


@api.route("/audio_recorder", methods=['POST'])
def audio_recording():
    print("POST 1")
    data = request.get_json()
    timeout = data['timeout']
    str = audio_recorder(timeout)
    print(str)
    return jsonify({"str": str}), 200


@api.route("/audio_response", methods=['POST'])
def audio_response():
    print("POST 2")
    data = request.get_json()
    language = data['language']
    transcription = speech2text(language)
    print(transcription)
    ai_response = chatbot_gpt.generate_response(transcription)
    print(ai_response)
    url = text2speech(ai_response, language)
    return jsonify({"url": url}), 200

    

    