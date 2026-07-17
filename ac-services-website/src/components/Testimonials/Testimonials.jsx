import { FaStar } from "react-icons/fa";
import testimonials from "../../data/testimonials";
import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";
import Card from "../UI/Card/Card";

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <Container>
                <SectionHeading
                    title="What Our Customers Say"
                    subtitle="Trusted by thousands of happy customers."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {testimonials.map((item) => (
                        <Card key={item.id}>
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(item.rating)].map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                            </div>

                            <p className="text-gray-600 leading-7">
                                "{item.review}"
                            </p>

                            <div className="mt-6">
                                <h3 className="font-bold text-lg">
                                    {item.name}
                                </h3>

                                <p className="text-gray-500">
                                    {item.city}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;