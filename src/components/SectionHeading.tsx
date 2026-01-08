import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = 'center',
  light = false,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const elements = heading.querySelectorAll('.animate-item');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      ref={headingRef}
      className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignmentClasses[align]}`}
    >
      {badge && (
        <span className={`animate-item badge-accent ${light ? 'bg-primary-foreground/10 text-primary-foreground' : ''}`}>
          {badge}
        </span>
      )}
      <h2 className={`animate-item text-headline max-w-3xl ${light ? 'text-primary-foreground' : 'text-foreground'}`}>
        {title}
      </h2>
      {description && (
        <p className={`animate-item text-body-large max-w-2xl ${light ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
      <div className={`animate-item divider-accent ${align === 'center' ? 'mx-auto' : ''} ${align === 'right' ? 'ml-auto' : ''}`} />
    </div>
  );
};

export default SectionHeading;
