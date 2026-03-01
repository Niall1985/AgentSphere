from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from tools.memory_tool import add_message, get_memory
from agents import codeAssistAgent, researchAgent

from authfiles.auth_service import generate_otp_service, verify_signup_service

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

class OTPRequest(BaseModel):
    email: str
    password: str


class VerifySignupRequest(BaseModel):
    email: str
    otp: str

AGENT_MAP = {
    "code-assist": codeAssistAgent.run,
    "research": researchAgent.run,
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


@app.post("/generate-otp")
def generate_otp(req: OTPRequest):
    return generate_otp_service(req.email, req.password)


@app.post("/verify-signup")
def verify_signup(req: VerifySignupRequest):
    try:
        return verify_signup_service(req.email, req.otp)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))