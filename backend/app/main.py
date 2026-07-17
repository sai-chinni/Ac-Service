from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.routers.booking import router as booking_router

app = FastAPI(title="AC Service API")

default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ac-service-delta.vercel.app",
    "https://ac-service-88jy.onrender.com",
    "https://ac-service-henna.vercel.app",
]

# Read comma-separated origins from environment variable `ALLOWED_ORIGINS`.
# Example: ALLOWED_ORIGINS="https://my-frontend.vercel.app,https://other.example.com"
allowed_env = os.getenv("ALLOWED_ORIGINS")
if allowed_env:
    allow_origins = [o.strip() for o in allowed_env.split(",") if o.strip()]
else:
    allow_origins = default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    booking_router,
    prefix="/api"
)

@app.get("/")
def home():
    return {"message": "API is running"}