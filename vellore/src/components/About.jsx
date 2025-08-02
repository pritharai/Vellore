import React from "react"

const About = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-[1560px] mx-auto flex flex-col md:flex-row items-center justify-around">

                {/* Text Content */}
                <div className="md:w-1/2 mb-10 md:mb-0 text-[#4f0d17]">
                    <h1
                        className="text-5xl font-extrabold leading-tight mb-6"
                        style={{ fontFamily: 'Raleway, sans-serif' }}
                    >
                        Vellor — a need for calm<br/>
                         in the chaos of fast fashion
                    </h1>
                    <p
                        className="text-lg mb-8"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        In a world chasing trends and timelines, Vellor chooses stillness. We create oversized T-shirts that don’t just clothe, but comfort. Each piece is thoughtfully designed with intention — minimal in style, rich in detail, and made to last. We believe fashion should feel good — not just look good. That’s why our fabrics are breathable, our fits are relaxed, and our designs are timeless. No logos shouting for attention. No clutter. Just clean, effortless wear for everyday ease.

                    </p>
                    <a
                        href="#"
                        className="inline-block px-6 py-3 bg-[#4f0d17] text-white rounded-md hover:bg-[#3d0a12] transition-all duration-200 text-lg"
                        style={{ fontFamily: 'Raleway, sans-serif' }}
                    >
                        Learn More →
                    </a>
                </div>

                {/* Image */}
                <div className=" relative">
                    <div className="bg-[#4f0d17] absolute w-[80%] h-[75%] bottom-0 left-[33px] -z-10 rounded-t-full"></div>
                    <img
                        src="/images/about-hero-1.png"
                        alt="Model showcasing neutral-toned fashion collection"
                        className="h-[140%]"
                    />
                </div>

            </div>
        </section>
    );
};

export default About;
