import React from 'react'
import HeroSection from '../components/HeroSection'
import HeroCoreStory from '../components/HeroCoreStory'
import { Typewriter } from 'react-simple-typewriter'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import ProductBanner from '../components/ProductsBanner'
import Products from '../components/Product'

const Home = () => {
    return (
        <>
            <HeroSection />

            <div className='max-w-[1260px] mx-auto m-12 mt-[100px] text-center'>
                <h1 className='h-[192px] lg:h-[250px] overflow-hidden font-[300] font-content text-primary text-[clamp(2rem,4vw,3.5rem)]'>
                    Vellor was born out of a need —{' '}
                    <br />
                    <span className='inline-block'>
                        <Typewriter
                            words={[
                                'a need for calm in the chaos of fast fashion.',
                                'a mindful pause in the rush of trends.',
                                'a statement of purpose, not just style.',
                                'an identity beyond fast trends.',
                            ]}
                            loop={0}
                            typeSpeed={50}
                            deleteSpeed={30}
                            delaySpeed={2000}
                        />
                    </span>
                </h1>
            </div>
            <HeroCoreStory />

            {/* Promise section */}
            <section className='bg-primary mt-[160px] py-15'>
            <div className='max-w-[1160px] mx-auto gap-[50px] flex flex-col items-center lg:items-start lg:flex-row'>
                {/* Left */}
                <div className='max-w-[500px] border border-secondary p-10 rounded-t-full rounded-b-full'>
                    <img src="/images/Promise-hands.jpg" alt="Promise" className='w-full rounded-t-full rounded-b-full' />
                </div>

                {/* right */}
                <div className='text-secondary flex flex-col gap-10 p-5 lg:mt-25'>
                    <h2 className='text-5xl font-[200]'>Our Promise to you</h2>
                    <p className='text-lg'>At Vellor, we promise to deliver more than just oversized T-shirts — we deliver a feeling. Each piece is designed with purpose: minimal, versatile, and timeless. We put comfort first, crafting oversized fits that breathe, move with you, and feel effortlessly at home. Our commitment to quality ensures fabrics that last, so your style never has to chase fleeting trends. Above all, we believe in simplicity — no noise, no clutter, just clean lines and calm energy woven into every stitch.
                    </p>
                </div>
            </div>
            </section>
            <About/>
            <Testimonials/>
            <ProductBanner/>
            <Products/>
        </>
    )
}

export default Home
