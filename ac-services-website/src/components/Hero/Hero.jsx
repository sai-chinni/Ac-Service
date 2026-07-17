import { useEffect, useRef } from "react";
import {
    FaCheckCircle,
    FaPhoneAlt,
    FaStar,
    FaHeadset,
} from "react-icons/fa";
import { animate, stagger } from "animejs";

import Container from "../UI/Container/Container";
import Button from "../UI/Button/Button";
import Badge from "../UI/Badge/Badge";
import StatsCard from "../UI/statsCard/statsCard";

import stats from "../../data/stats";

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        if (!heroRef.current) return;

        // Slide up stagger for text elements, features, buttons, and stats
        animate(heroRef.current.querySelectorAll(".animate-hero-up"), {
            translateY: [40, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: stagger(120, { start: 100 })
        });

        // Zoom/scale in for badges and floating cards
        animate(heroRef.current.querySelectorAll(".animate-hero-zoom"), {
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: "easeOutElastic(1, 0.75)",
            duration: 1400,
            delay: stagger(150, { start: 300 })
        });
    }, []);

    const handleScroll = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section 
            id="home" 
            ref={heroRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50/50 pt-28 pb-16 bg-grid-pattern"
        >

            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/10 w-96 h-96 rounded-full bg-blue-200/35 blur-3xl"></div>
                <div className="absolute bottom-20 right-1/10 w-[500px] h-[500px] rounded-full bg-cyan-200/25 blur-3xl"></div>
            </div>

            <Container className="grid lg:grid-cols-12 gap-16 items-center min-h-[80vh]">

                {/* LEFT (7 Columns) */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="animate-hero-zoom opacity-0">
                        <Badge>
                            ❄️ Fast • Reliable • 24/7 Service
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gradient-dark tracking-tight animate-hero-up opacity-0">
                            Breathe Fresh,<br />
                            Stay <span className="text-gradient-blue">Cool & Comfortable</span>
                        </h1>

                        <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-xl animate-hero-up opacity-0">
                            Chennai's premium AC technicians providing rapid repair, professional installation, refrigerant gas refilling, and reliable annual maintenance.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid sm:grid-cols-3 gap-4 bg-white/40 border border-slate-100/50 backdrop-blur-sm p-4 rounded-2xl max-w-2xl shadow-sm animate-hero-up opacity-0">
                        {[
                            "Same Day Service",
                            "Certified Techs",
                            "Upfront Pricing",
                        ].map((feat) => (
                            <div key={feat} className="flex items-center gap-2.5">
                                <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />
                                <span className="text-sm font-semibold text-slate-700">{feat}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 animate-hero-up opacity-0">
                        <Button onClick={() => handleScroll("#contact")}>
                            Book Service Online
                        </Button>

                        <a 
                            href="tel:+919876543210"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 shadow-sm cursor-pointer"
                        >
                            <FaPhoneAlt />
                            Call +91 98765 43210
                        </a>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-4 max-w-xl animate-hero-up opacity-0">
                        {stats.map((item) => (
                            <StatsCard
                                key={item.id}
                                {...item}
                            />
                        ))}
                    </div>

                    {/* Brands */}
                    <div className="pt-2 border-t border-slate-100 max-w-xl animate-hero-up opacity-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                            Trusted to service all major AC brands
                        </p>
                        <div className="flex flex-wrap gap-x-8 gap-y-2 text-slate-400 font-extrabold text-sm tracking-widest">
                            <span>DAIKIN</span>
                            <span>VOLTAS</span>
                            <span>BLUE STAR</span>
                            <span>HITACHI</span>
                            <span>LG</span>
                            <span>SAMSUNG</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT (5 Columns) */}
                <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0">
                    
                    {/* Glow Backing */}
                    <div className="absolute -inset-10 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow"></div>

                    {/* Image Container with rounded border */}
                    <div className="relative z-10 w-full max-w-md p-3 bg-white/80 border border-slate-100 rounded-[38px] shadow-2xl animate-hero-zoom opacity-0">
                        <img
                            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
                            alt="AC Technician at Work"
                            className="w-full rounded-[28px] object-cover h-[450px]"
                        />
                    </div>

                    {/* Floating Rating Card */}
                    <div className="absolute top-12 -left-8 z-20 rounded-2xl border border-slate-100 bg-white/90 backdrop-blur-md p-4 shadow-xl shadow-blue-500/5 animate-float min-w-[170px] animate-hero-zoom opacity-0">
                        <div className="flex items-center gap-1.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-xs" />
                            ))}
                        </div>
                        <h4 className="mt-2 font-black text-slate-800 text-sm">
                            4.9/5 Rating
                        </h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            2,000+ Happy Clients
                        </p>
                    </div>

                    {/* Floating Support Card */}
                    <div className="absolute bottom-12 -right-6 z-20 rounded-2xl border border-slate-100 bg-white/90 backdrop-blur-md p-4 shadow-xl shadow-blue-500/5 animate-float-delayed min-w-[170px] animate-hero-zoom opacity-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <FaHeadset />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-sm">
                                    24/7 Helpline
                                </h4>
                                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                                    Always Online
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>

        </section>
    );
};

export default Hero;