import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-[#f6e1c5] py-16 px-4 mt-25">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#4f0d17] mb-12">
          Testimonials: Hear from Our Fans
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-sm mx-auto text-left">
            <p className="text-gray-700 text-sm leading-relaxed">
              "Don't miss out on the stunning pieces in the spring collection. The
              quality is amazing and I’ve received many compliments. Totally a
              fan!"
            </p>
            <div className="flex items-center mt-5">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Jane C."
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-[#4f0d17] font-semibold text-sm">Jane C.</p>
                <p className="text-gray-500 text-xs">Canada</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-sm mx-auto text-left">
            <p className="text-gray-700 text-sm leading-relaxed">
              "I recently purchased a necklace and I couldn't be happier. The
              quality and minimalistic design are just what I was looking for."
            </p>
            <div className="flex items-center mt-5">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Brandon Y."
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-[#4f0d17] font-semibold text-sm">Brandon Y.</p>
                <p className="text-gray-500 text-xs">New York</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-sm mx-auto text-left">
            <p className="text-gray-700 text-sm leading-relaxed">
              "I was doubtful about the quality of the earrings, but I was
              pleasantly surprised. They’re delicate yet durable and beautifully
              made."
            </p>
            <div className="flex items-center mt-5">
              <img
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt="Alicia K."
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-[#4f0d17] font-semibold text-sm">Alicia K.</p>
                <p className="text-gray-500 text-xs">Spain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
