import React from 'react'

const HeroSection = () => {
  return (
    <section className='h-[650px] relative text-wrap max-w-[1560px] mx-auto bg-no-repeat bg-[url("/images/hero-section.png")] bg-cover '>
        <div className='h-full flex flex-col gap-4 ml-10 pt-[175px]' >
            <h1 className='text-primary text-9xl font-bold'>VELLOR</h1>
            <div className='flex gap-5 '>
            <p className='text-[28px] font-bold text-primary ml-6'>Every Fit Tells A Story</p>
            <button className='border border-primary px-4 hover:cursor-pointer hover:-translate-y-[1px] active:scale-[0.99] '>Shop Now</button>
            </div>
        </div>
    </section>
  )
}

export default HeroSection