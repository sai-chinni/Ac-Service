import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaArrowUp,
    FaSnowflake,
} from "react-icons/fa";

import Container from "../UI/Container/Container";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert("Subscribed Successfully!");
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <footer className="relative bg-slate-950 text-slate-400">

                {/* Top Border */}

                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-sky-400"></div>

                <Container className="py-20">

                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                        {/* Company */}

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

                                    <FaSnowflake className="text-white text-xl" />

                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold text-white">
                                        CoolAir
                                    </h2>

                                    <p className="text-sm">
                                        AC Services
                                    </p>

                                </div>

                            </div>

                            <p className="mt-6 leading-7">

                                Professional AC repair, installation,
                                gas filling, deep cleaning, and AMC
                                services with trusted technicians.

                            </p>

                            <div className="flex gap-3 mt-8">

                                {[

                                    FaFacebookF,
                                    FaInstagram,
                                    FaLinkedinIn,
                                    FaWhatsapp,

                                ].map((Icon, index) => (

                                    <a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition duration-300 hover:-translate-y-1"
                                    >

                                        <Icon className="text-white" />

                                    </a>

                                ))}

                            </div>

                        </div>

                        {/* Quick Links */}

                        <div>

                            <h3 className="text-xl font-semibold text-white mb-6">
                                Quick Links
                            </h3>

                            <ul className="space-y-4">

                                <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>

                                <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>

                                <li><a href="#pricing" className="hover:text-blue-400 transition">Pricing</a></li>

                                <li><a href="#faq" className="hover:text-blue-400 transition">FAQ</a></li>

                                <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>

                            </ul>

                        </div>

                        {/* Services */}

                        <div>

                            <h3 className="text-xl font-semibold text-white mb-6">
                                Our Services
                            </h3>

                            <ul className="space-y-4">

                                <li>AC Repair</li>

                                <li>Installation</li>

                                <li>Gas Filling</li>

                                <li>Deep Cleaning</li>

                                <li>AMC Maintenance</li>

                            </ul>

                        </div>

                        {/* Newsletter */}

                        <div>

                            <h3 className="text-xl font-semibold text-white mb-6">
                                Newsletter
                            </h3>

                            <p className="mb-5">

                                Subscribe to receive offers,
                                maintenance tips and exclusive discounts.

                            </p>

                            <form
                                onSubmit={handleSubscribe}
                                className="space-y-4"
                            >

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />

                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                >

                                    Subscribe

                                </button>

                            </form>

                            <div className="mt-6 space-y-3">

                                <div className="flex items-center gap-3">

                                    <FaPhoneAlt className="text-blue-400" />

                                    <span>+91 8790270881</span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <FaEnvelope className="text-blue-400" />

                                    <span>info@coolairacservices.com</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </Container>

                {/* Bottom */}

                <div className="border-t border-slate-800">

                    <Container className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">

                        <p className="text-sm">

                            © {currentYear} CoolAir AC Services. All Rights Reserved.

                        </p>

                        <div className="flex gap-6 text-sm">

                            <a href="#">Privacy Policy</a>

                            <a href="#">Terms & Conditions</a>

                            <a href="#">Sitemap</a>

                        </div>

                    </Container>

                </div>

            </footer>

            {/* Scroll To Top */}

            <button
                onClick={scrollTop}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl text-white flex items-center justify-center transition hover:scale-110 z-50"
            >

                <FaArrowUp />

            </button>

            {/* WhatsApp Button */}

            <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-xl text-white flex items-center justify-center transition hover:scale-110 z-50"
            >

                <FaWhatsapp className="text-2xl" />

            </a>
        </>
    );
};

export default Footer;