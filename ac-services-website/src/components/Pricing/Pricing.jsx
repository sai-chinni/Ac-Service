import pricing from "../../data/pricing";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-white relative">
            <Container>
                
                <SectionHeading
                    title="Affordable AC Packages"
                    subtitle="Upfront transparent service charges. Pay only for the services you receive - no hidden costs."
                />

                <div className="grid md:grid-cols-3 gap-8 mt-12 items-center">
                    {pricing.map((plan) => {
                        const isPopular = plan.title === "AC Repair";
                        return (
                            <Card 
                                key={plan.id} 
                                className={`relative flex flex-col p-8 md:p-10 ${
                                    isPopular 
                                        ? "border-2 border-blue-500 shadow-xl lg:scale-105 bg-white" 
                                        : "border border-slate-100 bg-slate-50/30"
                                }`}
                                hover={true}
                            >
                                {/* Most Popular Badge */}
                                {isPopular && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md shadow-blue-500/20">
                                        Best Choice
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    {plan.title}
                                </h3>

                                <div className="flex items-baseline gap-1 mt-5">
                                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500 text-sm font-semibold">/ unit</span>
                                </div>

                                <ul className="space-y-4 my-8 text-sm font-medium text-slate-600 grow">
                                    {plan.features.map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                                                ✓
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#contact"
                                    className="w-full"
                                >
                                    <Button 
                                        variant={isPopular ? "primary" : "outline"} 
                                        className="w-full"
                                    >
                                        Book Service
                                    </Button>
                                </a>
                            </Card>
                        );
                    })}
                </div>

            </Container>
        </section>
    );
};

export default Pricing;