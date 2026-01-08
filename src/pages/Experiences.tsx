import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import VideoHero from '@/components/VideoHero';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data';
import { ExperienceCategory } from '@/types';
import heroExperiencesImage from '@/assets/hero-experiences.jpg';

const categories: (ExperienceCategory | 'All')[] = ['All', 'Adventure', 'Luxury', 'Honeymoon', 'Family', 'Solo', 'Cultural'];

const Experiences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory | 'All'>('All');

  const filtered = activeCategory === 'All' 
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

      <section className="py-8 bg-card border-b border-border sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Experiences;
