import whyChooseUs from "../../data/WhyChooseUs";
import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";
import Card from "../UI/Card/Card";

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us" className="py-24 bg-white relative">
            
            <Container>
                
                <SectionHeading
                    title="Why Choose CoolAir?"
                    subtitle="We are committed to providing top-notch HVAC repairs and installations with upfront pricing and warranties."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUs.map((item) => (
                        <Card
                            key={item.id}
                            className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/40 border border-slate-100 hover:border-blue-100/80"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-100/50 flex items-center justify-center text-4xl shadow-inner mb-6">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </Card>
                    ))}
                </div>

            </Container>
        </section>
    );
};

export default WhyChooseUs;