import urllib.parse

def send_whatsapp_customer_confirmation(booking, booking_id: str):
    message = (
        f"Hello {booking.name}! *CoolAir AC Services* has confirmed your service request.\n\n"
        f"❄️ *Booking ID:* {booking_id}\n"
        f"🛠️ *AC Brand:* {booking.acBrand}\n"
        f"📅 *Schedule:* {booking.date} at {booking.time}\n"
        f"📍 *Address:* {booking.address}, {booking.city}\n\n"
        f"Our technician will call you shortly at {booking.phone} to confirm arrival. Thank you!"
    )
    
    # URL encode for click-to-chat
    encoded_text = urllib.parse.quote(message)
    click_to_chat_url = f"https://wa.me/91{booking.phone}?text={encoded_text}"
    
    print("\n=== [SIMULATED WHATSAPP CUSTOMER MESSAGE] ===")
    print(f"To: +91 {booking.phone}")
    print(f"Message: {message.encode('ascii', 'ignore').decode('ascii')}")
    print(f"Link: {click_to_chat_url}")
    print("=============================================\n")
    return click_to_chat_url

def send_whatsapp_admin_alert(booking, booking_id: str):
    message = (
        f"📢 *New CoolAir AC Booking Request!*\n\n"
        f"❄️ *ID:* {booking_id}\n"
        f"👤 *Customer:* {booking.name}\n"
        f"📞 *Phone:* {booking.phone}\n"
        f"🛠️ *Service:* {booking.acBrand} - {booking.service}\n"
        f"📅 *Time:* {booking.date} at {booking.time}\n"
        f"📍 *City:* {booking.city}"
    )
    
    print("\n=== [SIMULATED WHATSAPP ADMIN NOTIFICATION] ===")
    print(f"Message: {message.encode('ascii', 'ignore').decode('ascii')}")
    print("===============================================\n")
    return True
