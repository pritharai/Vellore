// import React from 'react'
// import HeroSection from '../components/HeroSection'
// import HeroCoreStory from '../components/HeroCoreStory'

// const Home = () => {
//     return (
//         <>
//             <HeroSection />
//             <div className='max-w-[1260px]  mx-auto m-12 mt-[100px]'>
//                 <h1 className='text-center font-[200] font-content text-primary' style={{fontSize:"clamp(3rem,4vw,5rem"}}>
//                     <span>Vellor was born out of a need</span> — a need for calm in the chaos of fast fashion.
//                 </h1>
//             </div>
//             <HeroCoreStory />
//         </>
//     )
// }

// export default Home


import React from 'react'
import HeroSection from '../components/HeroSection'
import HeroCoreStory from '../components/HeroCoreStory'
import { Typewriter } from 'react-simple-typewriter'

const Home = () => {
  return (
    <>
      <HeroSection />

      <div className='max-w-[1260px] mx-auto m-12 mt-[100px] text-center'>
        <h1
          className='font-[200] font-content text-primary text-[clamp(2rem,4vw,5rem)]'
        >
          <div className='font-[300]'>Vellor was born out of a need </div>
          <span className='inline-block text-primary'>
            <Typewriter
              words={[
                'a need for calm in the chaos of fast fashion.',
                'a mindful pause in the rush of trends.',
                'a statement of purpose, not just style.',
                'an identity beyond fast trends.',
              ]}
              loop={0} 
            //   cursor
            //   cursorStyle='_'
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
