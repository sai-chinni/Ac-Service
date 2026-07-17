import howItWorks from "../../data/howItworks";
import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";
import Card from "../UI/Card/Card";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-sky-50/40 relative">
            
            <Container>
                
                <SectionHeading
                    title="Simple 4-Step Process"
                    subtitle="Getting your AC serviced has never been easier. Follow our quick booking and maintenance workflow."
                />

                <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Dotted Connection Line for Large Screens */}
                    <div className="hidden lg:block absolute top-1/3 left-8 right-8 h-0.5 border-t-2 border-dashed border-blue-200 -z-10"></div>

                    {howItWorks.map((item) => (
                        <Card
                            key={item.id}
                            className="relative flex flex-col items-center text-center p-8 bg-white border border-slate-100 hover:border-blue-100/50"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-lg font-black shadow-md shadow-blue-500/20">
                                {item.step}
                            </div>

                            <h3 className="text-xl font-bold mt-6 text-slate-800 tracking-tight">
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

export default HowItWorks;