import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/services";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../components/HowItWorks/howItworks";
import BookingSection from "../components/BookingForm/BookingSection";
import Testimonials from "../components/Testimonials/Testimonials";
import Gallery from "../components/Gallery/Gallery";
import Pricing from "../components/Pricing/Pricing";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <WhyChooseUs />
            <HowItWorks />
            <BookingSection />
            <Testimonials />
            <Gallery />
            <Pricing />
            <FAQ />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;