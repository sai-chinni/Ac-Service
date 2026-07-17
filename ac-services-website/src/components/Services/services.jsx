import services from "../../data/services";
import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";
import Card from "../UI/Card/Card";

const Services = () => {
    return (
        <section id="services" className="py-24 bg-slate-50/50">
            <Container>
                
                <SectionHeading
                    title="Our Premium AC Services"
                    subtitle="Certified technicians ready to handle split ACs, window ACs, cassettes, and central cooling systems."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Card
                            key={service.id}
                            className="flex flex-col items-start text-left p-8 group relative overflow-hidden"
                        >
                            {/* Decorative hover gradient corner */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-[100px] group-hover:bg-blue-500/10 transition-all duration-300"></div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-3xl flex items-center justify-center text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mt-6 text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-600 mt-3 leading-relaxed text-sm grow">
                                {service.description}
                            </p>

                            <a 
                                href="#contact"
                                className="mt-6 inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-700 transition"
                            >
                                Book Now
                                <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                            </a>
                        </Card>
                    ))}
                </div>

            </Container>
        </section>
    );
};

export default Services;