import gallery from "../../data/gallery";

import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";

const Gallery = () => {
    return (
        <section className="py-24 bg-slate-50">

            <Container>

                <SectionHeading
                    title="Our Recent Work"
                    subtitle="Quality workmanship you can trust."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

                    {gallery.map((item) => (

                        <div
                            key={item.id}
                            className="group overflow-hidden rounded-3xl shadow-lg"
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="bg-white p-5">

                                <h3 className="font-semibold text-lg">
                                    {item.title}
                                </h3>

                            </div>

                        </div>

                    ))}

                </div>

            </Container>

        </section>
    );
};

export default Gallery;