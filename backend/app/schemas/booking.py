from pydantic import BaseModel, field_validator
from datetime import datetime, date

class Booking(BaseModel):
    name: str
    phone: str
    city: str
    address: str
    acBrand: str
    service: str
    date: str
    time: str
    notes: str | None = None

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        # Strip any formatting characters
        digits = "".join(char for char in v if char.isdigit())
        if len(digits) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return digits

    @field_validator("date")
    @classmethod
    def validate_date(cls, v):
        try:
            booking_date = datetime.strptime(v, "%Y-%m-%d").date()
        except ValueError:
            raise ValueError("Invalid date format. Use YYYY-MM-DD")
        
        if booking_date < date.today():
            raise ValueError("Booking date cannot be in the past")
        return v

    @field_validator("time")
    @classmethod
    def validate_time(cls, v):
        try:
            booking_time = datetime.strptime(v, "%H:%M").time()
        except ValueError:
            try:
                booking_time = datetime.strptime(v, "%H:%M:%S").time()
            except ValueError:
                raise ValueError("Invalid time format. Use HH:MM")
        
        start_time = datetime.strptime("08:00", "%H:%M").time()
        end_time = datetime.strptime("20:00", "%H:%M").time()
        
        if not (start_time <= booking_time <= end_time):
            raise ValueError("Time slot must be during working hours (08:00 to 20:00)")
        return v