import React from 'react'

const StoryComponent = ({storyData}) => {
const {title, subtitle, image, description} = storyData
    return (
        <div className="flex flex-col items-center gap-6 lg:gap-0 relative">

            <div className="w-full lg:w-fit text-secondary py-8 pl-10 pr-20 rounded-sm bg-primary lg:absolute lg:-top-[80px] lg:right-[12%]">
                <h3 className="text-5xl font-[200]">{title}</h3>
                <p className="font-content mt-5 text-xl">{subtitle}</p>
            </div>

            <div className="w-full lg:w-[800px]">
                <img
                    src={image}
                    className="w-full"
                    alt={title}
                />
            </div>

            <div className="w-full lg:w-fit text-secondary py-10 px-12 rounded-sm bg-primary lg:absolute lg:-bottom-[80px] lg:left-[6%]">
                <p className="font-content max-w-[650px] text-justify [word-spacing:0.2rem]">
                    {description}
                </p>
            </div>

        </div>
    )
}

export default StoryComponent