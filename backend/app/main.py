from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.booking import router as booking_router

app = FastAPI(
    title="AC Service API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
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
    return {
        "message": "API is running"
    }