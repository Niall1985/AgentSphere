import json
import random
import smtplib
import os
import time
from email.mime.text import MIMEText
from dotenv import load_dotenv
from fastapi import HTTPException
from passlib.hash import bcrypt

load_dotenv()

USERS_DB = os.getenv("pathtodb")
EMAIL_SENDER = os.getenv("email")
EMAIL_PASSWORD = os.getenv("password")

if not EMAIL_SENDER or not EMAIL_PASSWORD:
    raise Exception("Email credentials not set in .env file")

OTP_STORE = {}
OTP_EXPIRY_SECONDS = 300  


def generate_otp_service(email: str, password: str):

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    users = load_users()
    if any(user["email"] == email for user in users):
        raise HTTPException(status_code=400, detail="User already exists")

    otp = str(random.randint(100000, 999999))

    OTP_STORE[email] = {
        "otp": otp,
        "password": bcrypt.hash(password),  # HASH password immediately
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

    return {"message": "Signup successful"}


def save_user(email: str, hashed_password: str):

    users = load_users()

    users.append({
        "email": email,
        "password": hashed_password
    })

    with open(USERS_DB, "w") as f:
        json.dump(users, f, indent=4)


def load_users():
    try:
        with open(USERS_DB, "r") as f:
            return json.load(f)
    except:
        return []


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