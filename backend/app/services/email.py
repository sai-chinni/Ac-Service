import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@coolair.com")

def _send_email(to_email: str, subject: str, html_content: str):
    # Logs fallback if SMTP is not configured
    if not all([SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD]):
        print("\n=== [SIMULATED EMAIL NOTIFICATION] ===")
        print(f"To: {to_email}")
        print(f"Subject: {subject.encode('ascii', 'ignore').decode('ascii')}")
        print("Content:")
        print(html_content.encode('ascii', 'ignore').decode('ascii'))
        print("=======================================\n")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = to_email

        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(SMTP_HOST, int(SMTP_PORT)) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Error sending email to {to_email}: {str(e)}")
        return False

def send_customer_confirmation_email(booking, booking_id: str):
    subject = f"CoolAir AC Service Booking Confirmed - ID: {booking_id}"
    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #2563eb; margin-top: 0;">AC Service Booking Confirmed!</h2>
          <p>Dear {booking.name},</p>
          <p>Thank you for choosing <strong>CoolAir AC Services</strong>. We are pleased to confirm your service booking request.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Booking ID:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking_id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">AC Brand:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.acBrand}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service Needed:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Appointment:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.date} at {booking.time}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.address}, {booking.city}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Notes:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.notes or 'None'}</td>
            </tr>
          </table>

          <p>Our certified technician will contact you shortly at <strong>{booking.phone}</strong> to confirm the exact time of arrival.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center;">CoolAir AC Services | 24/7 Helpline: +91 98765 43210</p>
        </div>
      </body>
    </html>
    """
    return _send_email(f"{booking.name}@dummy-email.com", subject, html_content) # Simulating customer email lookup or using booking email field if it existed.

def send_admin_booking_email(booking, booking_id: str):
    subject = f"[ADMIN] New Booking Received - ID: {booking_id}"
    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #dc2626; margin-top: 0;">New AC Service Request</h2>
          <p>A new AC service booking has been placed online. Details below:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Booking ID:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking_id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Customer Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.name}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">AC Details:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.acBrand} - {booking.service}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Scheduled For:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.date} at {booking.time}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.address}, {booking.city}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Notes:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{booking.notes or 'None'}</td>
            </tr>
          </table>
          <p><a href="http://localhost:5173/admin" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px;">Manage in Dashboard</a></p>
        </div>
      </body>
    </html>
    """
    return _send_email(ADMIN_EMAIL, subject, html_content)
