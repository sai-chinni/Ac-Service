import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Container from "../UI/Container/Container";
import SectionHeading from "../UI/sectionHeading/sectionHeading";

import faq from "../../data/FAQ";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50">
            <Container>
                <SectionHeading
                    title="Frequently Asked Questions"
                    subtitle="Find answers to the most common questions about our AC services."
                />

                <div className="max-w-4xl mx-auto mt-12 space-y-5">
                    {faq.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {item.question}
                                </h3>

                                {activeIndex === index ? (
                                    <FaChevronUp className="text-blue-600" />
                                ) : (
                                    <FaChevronDown className="text-blue-600" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 overflow-hidden ${activeIndex === index
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 text-slate-600 leading-7">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FAQ;