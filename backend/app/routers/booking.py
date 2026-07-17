from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from app.schemas.booking import Booking
from app.services.google_sheet import save_booking, get_all_bookings, update_booking_status
from app.services.email import send_customer_confirmation_email, send_admin_booking_email
from app.services.whatsapp import send_whatsapp_customer_confirmation, send_whatsapp_admin_alert
import traceback
router = APIRouter()

class StatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v):
        allowed = ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"]
        if v not in allowed:
            raise ValueError(f"Status must be one of {allowed}")
        return v


@router.post("/bookings")
def create_booking(data: Booking):
    try:
        # Save to sheet (generates a unique booking ID)
        booking_id = save_booking(data)
        
        # Trigger simulated email notifications
        send_customer_confirmation_email(data, booking_id)
        send_admin_booking_email(data, booking_id)
        
        # Trigger simulated WhatsApp alerts and get click-to-chat URL
        wa_url = send_whatsapp_customer_confirmation(data, booking_id)
        send_whatsapp_admin_alert(data, booking_id)
        
        return {
            "success": True,
            "message": "Booking saved to Google Sheets",
            "booking_id": booking_id,
            "whatsapp_url": wa_url
        }
    except Exception as e:
        traceback.print_exc()   # Print full traceback in Render logs
        print("ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save booking: {str(e)}"
        )
@router.get("/bookings")
def fetch_bookings():
    try:
        bookings = get_all_bookings()
        return {
            "success": True,
            "data": bookings
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch bookings: {str(e)}")


@router.put("/bookings/{booking_id}/status")
def update_status(booking_id: str, data: StatusUpdate):
    # Update status in the Google Sheet database
    success = update_booking_status(booking_id, data.status)
    if not success:
        raise HTTPException(status_code=404, detail="Booking ID not found or update failed")
    
    # Notify simulated channels of status update
    print(f"\n[STATUS UPDATE] Booking {booking_id} status changed to {data.status}\n")
    
    return {
        "success": True,
        "message": f"Booking status updated to {data.status}"
    }