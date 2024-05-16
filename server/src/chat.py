import os
import openai
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
import dotenv

dotenv.load_dotenv()


class ChatGPT:
    def __init__(self):
        openai.api_key = os.getenv('OPENAI_API_KEY')
    
    def generate_response(self, user_message, model = "gpt-3.5-turbo"):

        system_message = "Answer in the language that the user talks to you. If the prompt is empty answer that you could not understand the user."
        ai_response = ""
        for response in openai.chat.completions.create(
            model= model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}, 
            ],
            stream=True
        ):
            ai_response += str(response.choices[0].delta.content)
        
        return ai_response[:-4]
    

class Mistral:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")
        self.model = "mistral-large-latest"
        self.client = MistralClient(api_key=self.api_key)

    def generate_response(self, user_message):

        messages = [
            ChatMessage(role="user", content=user_message)
        ]

        chat_response = self.client.chat(
            model=self.model,
            messages=messages,
        )
        return chat_response.choices[0].message.content
    