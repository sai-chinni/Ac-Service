import { useState } from "react";
import { FaBars, FaTimes, FaSnowflake } from "react-icons/fa";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "Why Choose Us", href: "#why-choose-us" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ];

    const handleScroll = (href) => {
        setMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full glass-nav z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <a href="#home" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:rotate-180 transition-all duration-500">
                        <FaSnowflake className="animate-pulse-slow" />
                    </div>
                    <span className="text-2xl font-black text-gradient-blue tracking-tight">
                        CoolAir
                    </span>
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 font-semibold text-slate-600 text-sm">
                    {links.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => handleScroll(item.href)}
                                className="relative py-1 cursor-pointer transition hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Book Button */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 hover:scale-102 active:scale-98 transition-all duration-300 text-sm"
                >
                    Book Service
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-slate-800 focus:outline-none p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl py-4 space-y-1">
                    {links.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleScroll(item.href)}
                            className="block w-full text-left px-6 py-3 text-slate-700 font-semibold border-b border-slate-100/50 hover:bg-blue-50/50 hover:text-blue-600 transition"
                        >
                            {item.name}
                        </button>
                    ))}

                    <div className="px-6 pt-4">
                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-md shadow-blue-500/25 active:scale-98 transition"
                        >
                            Book Service
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;