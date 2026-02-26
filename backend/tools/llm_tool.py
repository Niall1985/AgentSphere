import google.generativeai as genai
from dotenv import load_dotenv
import os
from typing import List, Dict

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def llm_model(
    history: List[Dict],
    user_message: str,
    system_instruction: str
) -> str:
    """
    history format:
    [
        {"role": "user", "content": "..."},
        {"role": "assistant", "content": "..."}
    ]
    """

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=system_instruction
    )

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