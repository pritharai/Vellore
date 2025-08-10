import React from 'react'
import HeroSection from '../components/HeroSection'
import HeroCoreStory from '../components/HeroCoreStory'
import { Typewriter } from 'react-simple-typewriter'
import ComingSoon from '../components/ComingSoon'
import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 1, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Home = () => {
    return (
        <>
            <HeroSection />

            {/* Animated Typewriter Section */}
            <motion.div
                className='max-w-[1260px] mx-auto m-12 mt-[100px] text-center'
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
            >
                <h1 className='h-[192px] lg:h-[250px] overflow-hidden font-[300] text-primary text-[clamp(2rem,4vw,3.5rem)]' style={{ fontFamily: 'Lugrasimo' }}>
                    Vellor was born out of a need — <br />
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
            </motion.div>

            {/* Animated HeroCoreStory */}
            <motion.div
    initial={{ y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5 }}
>
    <HeroCoreStory/>
</motion.div>


            {/* Promise section */}
            <motion.section
                className='bg-primary mt-[160px] py-15 max-w-[1560px] mx-auto'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            staggerChildren: 0.3,
                            duration: 0.5,
                        },
                    },
                }}
            >
                <div className='max-w-[1160px] mx-auto gap-[50px] flex flex-col items-center lg:items-start lg:flex-row'>
                    {/* Left - Image */}
                    <motion.div
                        className='max-w-[500px] border border-secondary p-10 rounded-t-full rounded-b-full'
                        variants={fadeUp}
                    >
                        <img src="/images/Promise-hands.jpg" alt="Promise" className='w-full rounded-t-full rounded-b-full' />
                    </motion.div>

                    {/* Right - Text */}
                    <motion.div
                        className='text-secondary flex flex-col gap-10 p-5 lg:mt-25'
                        variants={fadeUp}
                    >
                        <h2 className='text-5xl font-bold'>Our Promise to you</h2>
                        <p className='text-lg' style={{fontFamily: 'var(--font-content)'}}>
                            At Vellor, we promise to deliver more than just oversized T-shirts — we deliver a feeling.
                            Each piece is designed with purpose: minimal, versatile, and timeless. We put comfort first,
                            crafting oversized fits that breathe, move with you, and feel effortlessly at home. Our
                            commitment to quality ensures fabrics that last, so your style never has to chase fleeting
                            trends. Above all, we believe in simplicity — no noise, no clutter, just clean lines and
                            calm energy woven into every stitch.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Animated ComingSoon */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <ComingSoon />
            </motion.div>
        </>
    )
}

export default Home
