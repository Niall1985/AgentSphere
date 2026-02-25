from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from tools.llm_tool import llm_model
from tools.memory_tool import add_message, get_memory

app = FastAPI()

# ✅ Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body structure
class ChatRequest(BaseModel):
    message: str
    session_id: str

# Response route
@app.post("/code-assist")
def code_assist(req: ChatRequest):

    # Get previous memory
    history = get_memory(req.session_id)

    # Generate response
    response = llm_model(history, req.message)

    # Store conversation
    add_message(req.session_id, "user", req.message)
    add_message(req.session_id, "assistant", response)

    return {"response": response}