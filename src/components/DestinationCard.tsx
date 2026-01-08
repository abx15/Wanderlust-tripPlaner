import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  index = 0,
  variant = 'default',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 0.4,
        duration: 0.3,
      });
      gsap.to(card.querySelector('.card-content'), {
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 0.6,
        duration: 0.3,
      });
      gsap.to(card.querySelector('.card-content'), {
        y: 0,
        duration: 0.3,
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

  if (variant === 'featured') {
    return (
      <Link to={`/destinations/${destination.slug}`}>
        <div
          ref={cardRef}
          className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60" />
          
          <div className="card-content absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-2 text-accent mb-3">
              <MapPin size={16} />
              <span className="text-sm font-medium">{destination.country}</span>
            </div>
            <h3 className="text-3xl font-display font-medium text-primary-foreground mb-2">
              {destination.name}
            </h3>
            <p className="text-primary-foreground/80 mb-4 line-clamp-2">
              {destination.tagline}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground/70">
                From <span className="text-accent font-semibold">${destination.startingPrice}</span>
              </span>
              <span className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Explore <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/destinations/${destination.slug}`}>
        <div
          ref={cardRef}
          className="relative h-[280px] rounded-2xl overflow-hidden group cursor-pointer"
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
          
          <div className="card-content absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 text-primary-foreground/70 mb-2">
              <MapPin size={14} />
              <span className="text-xs">{destination.country}</span>
            </div>
            <h3 className="text-xl font-display font-medium text-primary-foreground">
              {destination.name}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/destinations/${destination.slug}`}>
      <div
        ref={cardRef}
        className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image w-full h-full object-cover transition-transform duration-700"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
          
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-foreground/90 text-primary text-sm font-medium">
              ★ {destination.rating}
            </div>
          </div>
        </div>
        
        <div className="card-content p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin size={14} />
            <span className="text-sm">{destination.country}</span>
          </div>
          <h3 className="text-xl font-display font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
            {destination.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {destination.tagline}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              From <span className="text-accent font-semibold text-lg">${destination.startingPrice}</span>
            </span>
            <span className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
              View <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
