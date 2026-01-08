import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  variant?: 'default' | 'featured' | 'horizontal';
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-tertiary/10 text-tertiary',
  Moderate: 'bg-accent/10 text-accent',
  Challenging: 'bg-highlight/10 text-highlight',
  Expert: 'bg-destructive/10 text-destructive',
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index = 0,
  variant = 'default',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (variant === 'horizontal') {
    return (
      <Link to={`/experiences/${experience.slug}`}>
        <div
          ref={cardRef}
          className="group flex flex-col md:flex-row bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
        >
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              className="card-image w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="badge-accent">
                {experience.category}
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-display font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                {experience.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {experience.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-accent" />
                  {experience.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-accent" />
                  Max {experience.maxGroupSize}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[experience.difficulty]}`}>
                  {experience.difficulty}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-muted-foreground text-sm">From</span>
                <span className="text-2xl font-display font-semibold text-accent ml-2">
                  ${experience.price}
                </span>
              </div>
              <span className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                View Details <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/experiences/${experience.slug}`}>
      <div
        ref={cardRef}
        className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="card-image w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="badge-accent">
              {experience.category}
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-foreground/90 text-primary text-sm font-medium">
              ★ {experience.rating}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[experience.difficulty]}`}>
              {experience.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-display font-medium text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {experience.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {experience.destination}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {experience.maxGroupSize}
            </span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-muted-foreground text-sm">
              From <span className="text-accent font-semibold text-lg">${experience.price}</span>
            </span>
            <ArrowRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
