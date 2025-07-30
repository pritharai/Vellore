import React from 'react'
import HeroSection from '../components/HeroSection'
import HeroCoreStory from '../components/HeroCoreStory'

const Home = () => {
    return (
        <>
            <HeroSection />
            <div className='max-w-[1260px]  mx-auto m-12 mt-[100px]'>
                <h1 className='text-center font-[200] font-content text-primary' style={{fontSize:"clamp(3rem,4vw,5rem"}}>
                    <span>Vellor was born out of a need</span> — a need for calm in the chaos of fast fashion.
                </h1>
            </div>
            <HeroCoreStory />
        </>
    )
}

export default Home