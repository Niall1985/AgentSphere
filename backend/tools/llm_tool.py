import google.generativeai as genai
from dotenv import load_dotenv
import os
from typing import List, Dict

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction="""
You are a strict code execution assistant.
Only return the final result.
Do not add explanations unless explicitly asked.
"""
)

def llm_model(history: List[Dict], user_message: str) -> str:
    """
    history format:
    [
        {"role": "user", "content": "..."},
        {"role": "assistant", "content": "..."}
    ]
    """

    formatted_history = []

    for msg in history:
        role = "model" if msg["role"] == "assistant" else "user"
        formatted_history.append({
            "role": role,
            "parts": [msg["content"]]
        })

    formatted_history.append({
        "role": "user",
        "parts": [user_message]
    })

    response = model.generate_content(formatted_history)

    return response.text