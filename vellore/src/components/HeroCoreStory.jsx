import { Link } from "react-router-dom";
import StoryComponent from "./StoryComponent";

const HeroCoreStory = () => {
  const storyOne = {
    title: "Visionary Lie",
    subtitle: "A play on Truth and Deception",
    image: "/images/hero-core-1.jpg",
    description:
      "He trusted the hype, the followers, the flawless lives shown online. But when silence came, so did clarity. He saw how fake smiles masked broken hearts and success was often a rented set. Now, with open eyes, he walks differently—quiet, observant, awake. Because once you see the truth, the lies can never blind you again."
  };

  const storyTwo = {
    title: "Outline of a Legend",
    subtitle: "Raw Lines. Real Stories.",
    image: "/images/hero-core-2.jpg",
    description:
      "He wasn’t born a masterpiece — he was drawn in pieces. One line at a time. Each stroke on the back of this tee captures the chaos, the grind, the glory. This is for the ones who don’t chase the spotlight — they become it. Who let their journey speak before they do. Who wear their hustle like art — raw, rough, and real. This design isn't printed. It’s etched with experience."
  };

  return (
    <section className="relative max-w-[1560px] mx-auto lg:mt-[150px] px-4">
      <div className="mt-20">
        <StoryComponent storyData={storyOne} />
      </div>

      <div className="mt-20 lg:mt-[250px]">
        <StoryComponent storyData={storyTwo} />
      </div>

      {/* Read More Link */}
      <div className="text-center mt-40">
        <Link
          to="/products"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-primary rounded-md shadow-lg hover:bg-primary/80 transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default HeroCoreStory;
