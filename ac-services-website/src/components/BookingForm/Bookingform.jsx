import { useState } from "react";
import Button from "../UI/Button/Button";
import api from "../../api/api";

const BookingForm = () => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        address: "",
        acBrand: "",
        service: "",
        date: "",
        time: "",
        notes: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // Reset field error when typing
        if (errors[e.target.name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[e.target.name];
                return copy;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Phone number (must be exactly 10 digits)
        const digits = formData.phone.replace(/\D/g, "");
        if (digits.length !== 10) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }

        // 2. Booking date not in the past
        if (formData.date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Format selected date correctly for local timezone comparison
            const [year, month, day] = formData.date.split("-").map(Number);
            const selectedDate = new Date(year, month - 1, day);
            selectedDate.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                newErrors.date = "Booking date cannot be in the past.";
            }
        }

        // 3. Time slot (working hours: 8:00 AM to 8:00 PM)
        if (formData.time) {
            const [hours] = formData.time.split(":").map(Number);
            if (hours < 8 || hours >= 20) {
                newErrors.time = "Service is only available between 08:00 AM and 08:00 PM.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await api.post("/bookings", formData);

            console.log("Booking Placed:", response.data);

            if (response.data.success) {
                setBookingSuccess(true);
            }

        } catch (error) {
            console.error(
                "Booking Error:",
                error.response?.data || error.message
            );

            const serverMsg = error.response?.data?.detail || "Failed to book AC service. Please try again.";
            alert(serverMsg);
        }
    };

    if (bookingSuccess) {
        return (
            <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-sm animate-pulse-slow">
                    ✓
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">Booking Confirmed!</h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                        Your booking has been registered successfully. Our technician will call you shortly at <span className="font-bold text-slate-900">{formData.phone}</span> to confirm the visit time.
                    </p>
                </div>
                <Button
                    type="button"
                    onClick={() => {
                        setBookingSuccess(false);
                        setFormData({
                            name: "",
                            phone: "",
                            city: "",
                            address: "",
                            acBrand: "",
                            service: "",
                            date: "",
                            time: "",
                            notes: "",
                        });
                        setErrors({});
                    }}
                >
                    Book Another AC
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Grid 1: Name and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="E.g., Ravi Kumar"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="E.g., 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-5 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition ${
                            errors.phone ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                        required
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>
                    )}
                </div>
            </div>

            {/* Grid 2: Brand and Service */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">AC Brand</label>
                    <select
                        name="acBrand"
                        value={formData.acBrand}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 outline-none transition cursor-pointer"
                        required
                    >
                        <option value="">Select Brand</option>
                        <option>Daikin</option>
                        <option>Voltas</option>
                        <option>Blue Star</option>
                        <option>Hitachi</option>
                        <option>LG</option>
                        <option>Samsung</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Required Service</label>
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 outline-none transition cursor-pointer"
                        required
                    >
                        <option value="">Select Service Type</option>
                        <option>AC Repair & Diagnosis</option>
                        <option>AC Installation / Uninstallation</option>
                        <option>AC Deep Jet Cleaning</option>
                        <option>Gas Filling / Leak Repair</option>
                        <option>Annual Maintenance (AMC)</option>
                    </select>
                </div>
            </div>

            {/* Grid 3: City and Address */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Chennai"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 outline-none transition"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Installation Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Flat No, Street Name, Locality"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 outline-none transition"
                        required
                    />
                </div>
            </div>

            {/* Grid 4: Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-5 py-3.5 text-slate-800 outline-none transition cursor-pointer ${
                            errors.date ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                        required
                    />
                    {errors.date && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.date}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preferred Slot</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-5 py-3.5 text-slate-800 outline-none transition cursor-pointer ${
                            errors.time ? "border-red-400 bg-red-50/10 focus:border-red-500" : "border-slate-200 bg-slate-50/50"
                        }`}
                        required
                    />
                    {errors.time && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.time}</p>
                    )}
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Additional Instructions (Optional)</label>
                <textarea
                    name="notes"
                    placeholder="Provide any specific details (e.g., AC not cooling, making noise, window unit...)"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-slate-800 outline-none transition resize-none"
                />
            </div>

            <Button className="w-full justify-center">
                Confirm Service Booking
            </Button>
        </form>
    );
};

export default BookingForm;