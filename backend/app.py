import json
import random
import smtplib
import os
import time
import re
from datetime import datetime, timedelta
from email.mime.text import MIMEText
import docker
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from passlib.hash import bcrypt
from passlib.context import CryptContext
from jose import JWTError, jwt
import psutil
import threading

from tools.memory_tool import add_message, get_memory
from agents import codeAssistAgent, researchAgent

load_dotenv()

# --- Config ---
USERS_DB = os.getenv("pathtodb")
EMAIL_SENDER = os.getenv("email")
EMAIL_PASSWORD = os.getenv("password")
JWT_SECRET = os.getenv("jwt_secret")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

if not EMAIL_SENDER or not EMAIL_PASSWORD:
    raise Exception("Email credentials not set in .env file")

OTP_STORE = {}
OTP_EXPIRY_SECONDS = 300
BLACKLISTED_TOKENS = set()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
docker_client = docker.from_env()


# --- Auth Helpers ---
def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRY_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def verify_access_token(token: str) -> str:
    if token in BLACKLISTED_TOKENS:
        raise HTTPException(status_code=401, detail="Token has been invalidated — please log in again")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except JWTError as e:
        print("JWT ERROR:", e)
        raise HTTPException(status_code=401, detail="Token expired or invalid")


def logout_user(token: str):
    BLACKLISTED_TOKENS.add(token)
    print(f"[AUTH] Token blacklisted. Total blacklisted tokens: {len(BLACKLISTED_TOKENS)}")
    return {"message": "Logged out successfully"}


def load_users():
    try:
        with open(USERS_DB, "r") as f:
            return json.load(f)
    except:
        return []


def save_user(email: str, hashed_password: str):
    users = load_users()
    users.append({"email": email, "password": hashed_password})
    with open(USERS_DB, "w") as f:
        json.dump(users, f, indent=4)


def send_email(to_email: str, otp: str):
    msg = MIMEText(f"Your AgentSphere OTP is: {otp}\n\nThis OTP expires in 5 minutes.")
    msg["Subject"] = "Your AgentSphere OTP"
    msg["From"] = EMAIL_SENDER
    msg["To"] = to_email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_SENDER, to_email, msg.as_string())
        server.quit()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send email")


def generate_otp_service(email: str, password: str):
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    users = load_users()
    if any(user["email"] == email for user in users):
        raise HTTPException(status_code=400, detail="User already exists")
    otp = str(random.randint(100000, 999999))
    OTP_STORE[email] = {
        "otp": otp,
        "password": bcrypt.hash(password),
        "timestamp": time.time()
    }
    send_email(email, otp)
    return {"message": "OTP sent successfully"}


def verify_signup_service(email: str, otp: str):
    stored = OTP_STORE.get(email)
    if not stored:
        raise HTTPException(status_code=400, detail="OTP not found")
    if time.time() - stored["timestamp"] > OTP_EXPIRY_SECONDS:
        OTP_STORE.pop(email)
        raise HTTPException(status_code=400, detail="OTP expired")
    if stored["otp"] != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    save_user(email, stored["password"])
    OTP_STORE.pop(email)
    token = create_access_token(email)
    return {"message": "Signup successful", "token": token}


def login_user(email: str, password: str):
    try:
        with open(USERS_DB, "r") as f:
            users = json.load(f)
    except:
        raise HTTPException(status_code=400, detail="User database not found")
    user = next((u for u in users if u["email"] == email), None)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not pwd_context.verify(password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(email)
    return {"message": "Login successful", "token": token}


# --- FastAPI App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request Models ---
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

class LoginRequest(BaseModel):
    email: str
    password: str

class LogoutRequest(BaseModel):
    token: str

class RepoRequest(BaseModel):
    repo_url: str


AGENT_MAP = {
    "code-assist": codeAssistAgent.run,
    "research": researchAgent.run,
}


# --- Routes ---
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


@app.post("/login")
def login(req: LoginRequest):
    return login_user(req.email, req.password)


@app.post("/logout")
def logout(req: LogoutRequest):
    verify_access_token(req.token)
    return logout_user(req.token)


@app.get("/test-agent/stream")
def test_agent_stream(repo_url: str, token: str):
    verify_access_token(token)

    if not repo_url.startswith("https://github.com/"):
        raise HTTPException(status_code=400, detail="Invalid repository URL")

    def event_stream():
        start = time.time()

        def emit(data: dict) -> str:
            return f"data: {json.dumps(data)}\n\n"

        yield emit({"type": "status", "message": f"Launching container for {repo_url}"})

        container = None
        try:
            container = docker_client.containers.run(
                image="agent-runner:latest",
                environment={"REPO_URL": repo_url},
                detach=True,
                remove=False,
                mem_limit="512m",
                cpu_period=100000,
                cpu_quota=50000,
                network_mode="bridge",
            )

            yield emit({"type": "status", "message": f"Container started (ID: {container.short_id})"})

            # --- start monitor BEFORE waiting ---
            performance = []
            container_done = threading.Event()

            def collect_metrics():
                while not container_done.is_set():
                    cpu = psutil.cpu_percent(interval=1)
                    memory = psutil.virtual_memory().percent
                    performance.append({
                        "time": round(time.time() - start, 2),
                        "cpu": cpu,
                        "memory": memory
                    })

            monitor_thread = threading.Thread(target=collect_metrics, daemon=True)
            monitor_thread.start()

            # single wait — monitor collects during this
            container.wait()

            container_done.set()
            monitor_thread.join()
            # ------------------------------------

            logs_output = container.logs().decode()
            raw_lines = logs_output.split("\n")

            for text in raw_lines:
                if not text:
                    continue
                level = "error" if ("FAILED" in text or "ERROR" in text) else "info"
                yield emit({
                    "type": "log",
                    "time": round(time.time() - start, 2),
                    "level": level,
                    "message": text,
                })

            container.reload()
            exit_code = container.attrs["State"]["ExitCode"]
            container.remove()
            container = None

            full_output = "\n".join(raw_lines)

            passed_match = re.search(r'(\d+)\s+passed', full_output)
            failed_match = re.search(r'(\d+)\s+failed', full_output)

            passed = int(passed_match.group(1)) if passed_match else 0
            failed = int(failed_match.group(1)) if failed_match else 0
            total = passed + failed

            tests = [{"name": "Agent Tests", "passed": passed, "failed": failed}]

            metrics = {
                "success_rate": round((passed / total) * 100, 2) if total else 0,
                "tests_passed": passed,
                "tests_total": total,
                "error_rate": round((failed / total) * 100, 2) if total else 0,
                "avg_response": round((time.time() - start) * 1000, 2)
            }

            yield emit({"type": "tests", "payload": tests})

            for point in performance:
                yield emit({"type": "performance", "payload": point})

            yield emit({
                "type": "result",
                "exit_code": exit_code,
                "metrics": metrics
            })

        except Exception as e:
            if container:
                try:
                    container.remove(force=True)
                except Exception:
                    pass
            yield emit({"type": "error", "message": str(e)})

    return StreamingResponse(event_stream(), media_type="text/event-stream")

# from fastapi import FastAPI, HTTPException
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# from tools.memory_tool import add_message, get_memory
# from agents import codeAssistAgent, researchAgent
# from agents import codeAssistAgent, researchAgent

# from authfiles.auth_service import generate_otp_service, verify_signup_service, login_user
# from authfiles.auth_service import generate_otp_service, verify_signup_service, login_user

# from agent_test.orcherstrator import run_agent_tests
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class ChatRequest(BaseModel):
#     agent: str
#     message: str
#     session_id: str

# class OTPRequest(BaseModel):
#     email: str
#     password: str


# class VerifySignupRequest(BaseModel):
#     email: str
#     otp: str

# class LoginRequest(BaseModel):
#     email: str
#     password: str

# class RepoRequest(BaseModel):
#     repo_url: str

# AGENT_MAP = {
#     "code-assist": codeAssistAgent.run,
#     "research": researchAgent.run,
# }

# @app.post("/agent")
# def route_agent(req: ChatRequest):
#     history = get_memory(req.session_id)

#     agent_function = AGENT_MAP.get(req.agent)

#     if not agent_function:
#         return {"response": "Unknown agent."}

#     response = agent_function(history, req.message)

#     add_message(req.session_id, "user", req.message)
#     add_message(req.session_id, "assistant", response)

#     return {"response": response}


# @app.post("/generate-otp")
# def generate_otp(req: OTPRequest):
#     return generate_otp_service(req.email, req.password)


# @app.post("/verify-signup")
# def verify_signup(req: VerifySignupRequest):
#     try:
#         return verify_signup_service(req.email, req.otp)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

# @app.post("/login")
# def login(req: LoginRequest):
#     email = req.email
#     password = req.password
#     return login_user(email, password)

# @app.post("/test-agent")
# def test_agent(req: RepoRequest):

#     if not req.repo_url.startswith("https://github.com/"):
#         raise HTTPException(status_code=400, detail="Invalid repository URL")

#     return run_agent_tests(req.repo_url)