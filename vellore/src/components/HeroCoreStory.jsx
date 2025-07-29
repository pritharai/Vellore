import React from 'react'

const HeroCoreStory = () => {
  return (
    <section className='relative max-w-[1560px] mx-auto mt-20'>
        <div className='relative mx-auto flex flex-col'>
            <div className='text-primary p-3 rounded absolute bg-secondary right-[20%]'>
                <h3 className='text-4xl font-[200]'>Visionary Lie</h3>
            </div>
            <div className='mx-auto'>
                <img src="/images/hero-core-1.jpg" className='max-w-[760px]' alt="hero-core-1" />
            </div>
            <div className='bg-primary'></div>
        </div>
    </section>
  )
}

export default HeroCoreStory