import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";
import BookingForm from "./Bookingform";
import Card from "../UI/Card/Card";

const BookingSection = () => {
    return (
        <section id="booking" className="py-24 bg-slate-50/30 relative">
            <Container>

                <SectionHeading
                    title="Book Your AC Service"
                    subtitle="Schedule a premium technician visit in minutes. Fill in the details below and we will contact you shortly."
                />

                <div className="max-w-3xl mx-auto">
                    <Card hover={false} className="p-8 md:p-10 shadow-premium bg-white">
                        <BookingForm />
                    </Card>
                </div>

            </Container>
        </section>
    );
};

export default BookingSection;