import React from 'react'

const HeroSection = () => {
  return (
    <section className='h-[650px] relative mt-0 md:mt-40 text-wrap max-w-[1560px] mx-auto bg-no-repeat bg-[url("/images/hero-section.png")] bg-cover '>
      <div className='h-full flex flex-col gap-4 ml-10 pt-[175px]' >
        {/* <h1 className='text-primary text-9xl font-bold'>VELLOR</h1> */}
        <h1 className='text-primary ml-5 md:ml-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold' style={{ fontFamily: 'Brittany Signature' }}>Vellor</h1>

        <div className='flex gap-5 flex-col md:flex-row '>
          <p className='text-[28px] font-bold text-primary ml-6'>Every Fit Tells A Story</p>
          <button className=' w-fit bg-primary mr-5 px-4 py-4 md:py-0 ml-6 md:ml-0 hover:cursor-pointer hover:-translate-y-[1px] active:scale-[0.99] text-secondary font-bold' onClick={() => window.location.href = '/products'}>Tell Your Story</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection