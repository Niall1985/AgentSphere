from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from tools.memory_tool import add_message, get_memory

from agents import codeAssistAgent
from agents import researchAgent
from agents import dataAnalysisAgent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    agent: str
    message: str
    session_id: str

AGENT_MAP = {
    "code-assist": codeAssistAgent.run,
    "research": researchAgent.run,
    # "data_analysis_agent": dataAnalysisAgent.run,
}

@app.post("/agent")
def route_agent(req: ChatRequest):

    history = get_memory(req.session_id)

    agent_function = AGENT_MAP.get(req.agent)

    if not agent_function:
        return {"response": "Unknown agent."}

    response = agent_function(history, req.message)

    add_message(req.session_id, "user", req.message)
    add_message(req.session_id, "assistant", response)

    return {"response": response}