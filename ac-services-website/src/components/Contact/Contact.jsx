import { useState } from "react";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";

import Container from "../UI/Container/Container";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const Contact = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormSubmitted(true);

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    const contactInfo = [
        {
            icon: <FaPhoneAlt />,
            title: "Phone Support",
            value1: "+91 98765 43210",
            value2: "24/7 Emergency Support",
        },
        {
            icon: <FaEnvelope />,
            title: "Email",
            value1: "info@coolairacservices.com",
            value2: "support@coolairacservices.com",
        },
        {
            icon: <FaMapMarkerAlt />,
            title: "Address",
            value1: "123 Cool Breeze Street",
            value2: "Anna Nagar, Chennai",
        },
        {
            icon: <FaClock />,
            title: "Working Hours",
            value1: "Mon - Sat : 8 AM - 8 PM",
            value2: "Sunday : 9 AM - 5 PM",
        },
    ];

    return (
        <section
            id="contact"
            className="py-24 bg-slate-50"
        >
            <Container>

                <div className="text-center max-w-3xl mx-auto mb-16">

                    <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
                        Contact Us
                    </span>

                    <h2 className="text-5xl font-bold mt-6 text-slate-900">
                        Let's Talk About Your AC
                    </h2>

                    <p className="mt-5 text-slate-600 leading-8">
                        Need AC installation, repair, or maintenance?
                        Our technicians are available to help you.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Side */}

                    <div className="space-y-6">

                        {contactInfo.map((item, index) => (

                            <Card key={index} className="flex items-start gap-5">

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg flex items-center justify-center text-white text-xl">

                                    {item.icon}

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-slate-800">

                                        {item.title}

                                    </h3>

                                    <p className="text-slate-600 mt-2">

                                        {item.value1}

                                    </p>

                                    <p className="text-slate-500">

                                        {item.value2}

                                    </p>

                                </div>

                            </Card>

                        ))}

                    </div>

                    {/* Right Side */}

                    <Card hover={false} className="shadow-2xl">

                        {formSubmitted ? (

                            <div className="text-center py-16">

                                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">

                                    <span className="text-5xl">
                                        🎉
                                    </span>

                                </div>

                                <h2 className="text-3xl font-bold mt-6">

                                    Thank You!

                                </h2>

                                <p className="text-slate-600 mt-4">

                                    Your message has been received.
                                    Our team will contact you shortly.

                                </p>

                                <Button
                                    className="mt-8"
                                    onClick={() => setFormSubmitted(false)}
                                >
                                    Send Another Message
                                </Button>

                            </div>

                        ) : (

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                <h3 className="text-3xl font-bold">

                                    Send a Message

                                </h3>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />

                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Write your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                />

                                <Button className="w-full">
                                    Send Message
                                </Button>

                            </form>

                        )}

                    </Card>

                </div>

            </Container>
        </section>
    );
};

export default Contact;
