import os
import json
import uuid
from datetime import datetime

import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

HEADERS = [
    "ID",
    "Name",
    "Phone",
    "City",
    "Address",
    "AC Brand",
    "Service",
    "Date",
    "Time",
    "Notes",
    "Status",
    "Created At",
]

_sheet = None


def get_credentials():
    """
    If GOOGLE_CREDENTIALS exists (Render), use it.
    Otherwise use the local credentials.json file.
    """
    google_credentials = os.getenv("GOOGLE_CREDENTIALS")

    if google_credentials:
        try:
            # Parse the raw JSON directly — do NOT pre-replace \n on the whole string.
            # The \n inside private_key are valid JSON escapes; json.loads handles them correctly.
            credentials_info = json.loads(google_credentials)

            return Credentials.from_service_account_info(
                credentials_info,
                scopes=SCOPES
            )
        except Exception as e:
            raise RuntimeError(f"Invalid GOOGLE_CREDENTIALS value: {e}")

    # Fallback to local service account file
    creds_path = "credentials/credentials.json"
    if not os.path.exists(creds_path):
        raise RuntimeError(
            "Google service account credentials not found. Set the environment variable "
            "'GOOGLE_CREDENTIALS' with the JSON content or add the file 'credentials/credentials.json'."
        )

    return Credentials.from_service_account_file(
        creds_path,
        scopes=SCOPES
    )


def get_sheet():
    global _sheet

    if _sheet is None:
        try:
            credentials = get_credentials()
            client = gspread.authorize(credentials)

            _sheet = client.open_by_key(
                "1BstIxenL_PcL2DafF2pZ7kRaMb0HDSiyew2y6XNXcS8"
            ).sheet1

            try:
                first_row = _sheet.row_values(1)
                if not first_row or first_row[0] != "ID":
                    _sheet.clear()
                    _sheet.insert_row(HEADERS, 1)
            except Exception as e:
                print(f"Error initializing sheet headers: {e}")

        except Exception as e:
            raise RuntimeError(f"Failed to access Google Sheet: {e}")

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
        created_at,
    ]

    sheet.append_row(row)

    return booking_id


def get_all_bookings():
    sheet = get_sheet()
    return sheet.get_all_records()


def update_booking_status(booking_id: str, new_status: str):
    """
    Returns True if updated successfully.
    Raises RuntimeError for real errors (auth/API failures) so the API
    layer can return a proper 500 instead of a misleading 404.
    Returns False only when the booking ID genuinely isn't found.
    """
    sheet = get_sheet()  # let real connection errors propagate as RuntimeError

    try:
        cell = sheet.find(booking_id)
    except gspread.exceptions.CellNotFound:
        return False
    except Exception as e:
        # A real API/auth/network error — don't disguise it as "not found"
        raise RuntimeError(f"Error searching for booking {booking_id}: {e}")

    if not cell:
        return False

    try:
        sheet.update_cell(cell.row, 11, new_status)
        return True
    except Exception as e:
        raise RuntimeError(f"Error writing status update for {booking_id}: {e}")