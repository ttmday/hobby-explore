"use client";

function SectionMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-[#121212] w-full lg:mt-32 duration-200 transition-all">
      {children}
    </div>
  );
}

function FeatureCard({
  imageUrl,
  shouldBeReversed = false,
  title,
  description,
}: {
  imageUrl: string;
  shouldBeReversed?: boolean;
  title: string;
  description: string;
}) {
  return (
    <article
      className={`w-full max-w-[1100px] grid lg:grid-cols-2 py-16 m-auto mt-0 md:mt-8 lg:mt-16  px-8 ${
        shouldBeReversed ? "" : ""
      } gap-8`}
    >
      <div className={`lg:max-w-[500px] ${shouldBeReversed ? "order-1" : ""}`}>
        <h3 className="text-5xl leading-normal dark:text-white">{title}</h3>
        <p className="text-[#1E1E1E]/80 mt-4 text-[18px] dark:text-white/60">
          {description}
        </p>
      </div>
      <img
        className={`w-full rounded-lg shadow-md border md:min-w-[300px] lg:h-72 overflow-hidden mt-4 object-cover mr-auto}`}
        alt="test"
        src={imageUrl}
      />
    </article>
  );
}

export function FeaturesSection() {
  return (
    <section className="w-full relative" id="features">
      <SectionMain>
        <FeatureCard
          title="    Share Who you are with the World"
          description="             Discover exciting pastimes, connect with fellow enthusiasts, and
              grow personally. Welcome to Hobby Explore, your gateway to a
              vibrant world of hobbies and innovation."
          imageUrl="/ss-test.png"
        />
      </SectionMain>
      <FeatureCard
        shouldBeReversed
        title="Discover New Passions"
        description="             Dive into a world of limitless discovery. At Hobby Explore, we
          invite you to explore the unexplored, to find new passions that
          ignite your soul and lead you to exciting adventures. Let
          curiosity be your guide and uncover what truly excites you!"
        imageUrl="/ss-test-2.png"
      />
      <SectionMain>
        <FeatureCard
          title="Let the World Find Your Hobbies"
          description=" Share your interests with the world and let your hobbies shine. At
          Hobby Explore, your community awaits to celebrate your passions
          and connect with fellow enthusiasts. Whether it's a lifelong
          pursuit or a newfound interest, showcase what makes you uniquely
          you!"
          imageUrl="/ss-test-3.png"
        />
      </SectionMain>
    </section>
  );
}

