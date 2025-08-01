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
                        Elevate Confidence,<br />
                        Celebrate Identity
                    </h1>
                    <p
                        className="text-lg mb-8"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        At our core, we believe fashion is a reflection of your inner story. Our collections embrace authenticity, style, and diversity. With fast updates and tailored trends, you can rely on us for fashion that feels personal and empowering.
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
