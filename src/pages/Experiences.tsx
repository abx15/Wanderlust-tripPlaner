import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import VideoHero from "@/components/VideoHero";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences } from "@/data";
import { ExperienceCategory } from "@/types";
import heroExperiencesImage from "@/assets/hero-experiences.jpg";

const categories: (ExperienceCategory | "All")[] = [
  "All",
  "Adventure",
  "Luxury",
  "Honeymoon",
  "Family",
  "Solo",
  "Cultural",
];

const Experiences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    ExperienceCategory | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? experiences
      : experiences.filter((e) => e.category === activeCategory);

  return (
    <MainLayout>
      <VideoHero
        title="Experiences"
        badge="Curated"
        description="Handcrafted adventures for every type of traveler."
        imageSrc={heroExperiencesImage}
        height="medium"
      />

      <section className="py-10 bg-card/80 backdrop-blur-xl border-b border-border sticky top-[72px] z-30 w-full overflow-hidden">
        <div className="container-custom">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mask-fade-right">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-bold text-[10px] tracking-widest uppercase transition-all duration-500 whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                    : "bg-background text-muted-foreground border-border hover:border-accent/50 hover:text-foreground shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filtered.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-32">
              <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">
                No experiences found
              </h3>
              <p className="text-muted-foreground font-medium mb-10 max-w-md mx-auto">
                We couldn't find any experiences in this category. Please try
                another one.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="btn-hero px-10 py-4 text-[10px] font-bold tracking-widest"
              >
                SHOW ALL EXPERIENCES
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Experiences;
