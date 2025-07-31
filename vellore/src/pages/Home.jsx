import React from 'react'
import HeroSection from '../components/HeroSection'
import HeroCoreStory from '../components/HeroCoreStory'
import { Typewriter } from 'react-simple-typewriter'

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
        </>
    )
}

export default Home
