import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  videoSrc?: string;
  imageSrc: string;
  height?: 'small' | 'medium' | 'large';
}

const VideoHero: React.FC<VideoHeroProps> = ({
  title,
  subtitle,
  badge,
  description,
  videoSrc,
  imageSrc,
  height = 'medium',
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const heightClasses = {
    small: 'h-[40vh] min-h-[350px]',
    medium: 'h-[50vh] min-h-[400px]',
    large: 'h-[60vh] min-h-[450px]',
  };

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    // Animate content
    gsap.fromTo(
      content.querySelectorAll('.hero-animate'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );

    // Parallax effect
    const media = hero.querySelector('.hero-media');
    if (media) {
      gsap.to(media, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section ref={heroRef} className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}>
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-media absolute inset-0 w-full h-[130%] object-cover"
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={imageSrc}
            alt=""
            className="hero-media absolute inset-0 w-full h-[130%] object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>
      
      <div ref={contentRef} className="container-custom relative z-10">
        {badge && (
          <span className="badge-accent mb-4 inline-block hero-animate">{badge}</span>
        )}
        {subtitle && (
          <p className="text-sm uppercase tracking-widest text-primary-foreground/70 mb-2 hero-animate">{subtitle}</p>
        )}
        <h1 className="text-display text-primary-foreground mb-4 hero-animate">{title}</h1>
        {description && (
          <p className="text-xl text-primary-foreground/80 max-w-2xl hero-animate">{description}</p>
        )}
      </div>
    </section>
  );
};

export default VideoHero;
