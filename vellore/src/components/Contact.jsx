import React from 'react';

const Contact = () => {
  return (
    <section className="max-w-[1560px] md:mt-40 py-10 px-6 mx-auto">
      <div className="flex items-center justify-center md:justify-start px-12 text-primary font-bold pb-5">
        <h1 style={{ fontSize: "clamp(1.3rem, 5vw, 3.5rem)" }}>Contact Us</h1>
      </div>

      <div className="max-w-[1350px] p-5 gap-10 md:max-h-[610px] mx-auto flex flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2">
          <div className="relative h-full">
            <img
              src="/images/contact.jpg"
              alt="Contact us"
              className="rounded-md w-full h-full object-cover"
            />
            {/* <p className='absolute bottom-0 text-black font-[200] p-3'>If you have any questions, please feel free to get in touch with us via email or social media</p> */}
          </div>
        </div>
        <div className="flex-1 w-full md:w-1/2 flex items-stretch">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <p className="font-bold text-[18px] text-primary mb-3">First Name</p>
                <input
                  type="text"
                  placeholder="John"
                  className="bg-gray-50 p-4 w-full rounded-2xl"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[18px] text-primary mb-3">Last Name</p>
                <input
                  type="text"
                  placeholder="Doe"
                  className="bg-gray-50 p-4 w-full rounded-2xl"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-[18px] text-primary mb-3">E-mail address</p>
              <input
                type="text"
                placeholder="johndoe@gmail.com"
                className="bg-gray-50 p-4 w-full rounded-2xl"
              />
            </div>
            <div>
              <p className="font-bold text-[18px] text-primary mb-3">Message</p>
              <textarea
                className="bg-gray-50 p-4 w-full resize-none rounded-2xl h-[200px]"
              ></textarea>
            </div>
            <button className="group relative w-full mt-5 py-3 px-6 text-lg rounded-md font-semibold text-white backdrop-blur-md border border-white/30 overflow-hidden shadow-lg shadow-primary/20 transition-all duration-100 ease-in-out active:scale-98 hover:cursor-pointer">
              <span className="relative z-10">Send Message</span>
              <span className="absolute -inset-[200%] bg-gradient-to-r from-primary via-primary-light to-primary blur-3xl group-hover:animate-spin-slow"></span>
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 rotate-12 group-hover:left-[130%] transition-all duration-[1200ms] ease-in-out blur-md"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;