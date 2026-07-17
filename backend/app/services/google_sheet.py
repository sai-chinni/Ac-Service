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
    If GOOGLE_CREDENTIALS exists (Render),
    use it. Otherwise use the local credentials.json file.
    """

    google_credentials = os.getenv("GOOGLE_CREDENTIALS")

    if google_credentials:
        try:
            credentials_info = json.loads(google_credentials)
            return Credentials.from_service_account_info(
                credentials_info,
                scopes=SCOPES
            )
        except Exception as e:
            raise RuntimeError(f"Invalid GOOGLE_CREDENTIALS value: {e}")

    # Fallback to service account file
    creds_path = "credentials/credentials.json"
    if not os.path.exists(creds_path):
        raise RuntimeError(
            "Google service account credentials not found. Set the environment variable 'GOOGLE_CREDENTIALS' with the JSON content or add the file 'credentials/credentials.json'."
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
            # Provide a clear message that will show up in logs and can help debugging 503s
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
    sheet = get_sheet()

    try:
        cell = sheet.find(booking_id)

        if not cell:
            return False

        sheet.update_cell(cell.row, 11, new_status)

        return True

    except Exception as e:
        print(f"Error updating status for {booking_id}: {e}")
        return False