import gspread
from google.oauth2.service_account import Credentials
import uuid
from datetime import datetime

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

HEADERS = ["ID", "Name", "Phone", "City", "Address", "AC Brand", "Service", "Date", "Time", "Notes", "Status", "Created At"]

# Caching sheet connection
_sheet = None

def get_sheet():
    global _sheet
    if _sheet is None:
        credentials = Credentials.from_service_account_file(
            "credentials/credentials.json",
            scopes=SCOPES
        )
        client = gspread.authorize(credentials)
        _sheet = client.open_by_key("1BstIxenL_PcL2DafF2pZ7kRaMb0HDSiyew2y6XNXcS8").sheet1
        
        # Ensure correct database headers exist on row 1
        try:
            first_row = _sheet.row_values(1)
            if not first_row or first_row[0] != "ID":
                _sheet.clear()
                _sheet.insert_row(HEADERS, 1)
        except Exception as e:
            print(f"Error initializing sheet headers: {str(e)}")
            
    return _sheet


def save_booking(data):
    sheet = get_sheet()
    booking_id = uuid.uuid4().hex[:8].upper()
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status = "Pending"
    
    row = [
        booking_id,
        data.name,
        data.phone,
        data.city,
        data.address,
        data.acBrand,
        data.service,
        data.date,
        data.time,
        data.notes or "",
        status,
        created_at
    ]
    sheet.append_row(row)
    return booking_id


def get_all_bookings():
    sheet = get_sheet()
    return sheet.get_all_records()


def update_booking_status(booking_id: str, new_status: str):
    sheet = get_sheet()
    try:
        cell = sheet.find(booking_id)
        if not cell:
            return False
        
        # "Status" column is index 11
        sheet.update_cell(cell.row, 11, new_status)
        return True
    except Exception as e:
        print(f"Error updating status for {booking_id}: {str(e)}")
        return False
