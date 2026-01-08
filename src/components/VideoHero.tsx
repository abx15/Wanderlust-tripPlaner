import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  videoSrc?: string;
  imageSrc: string;
  height?: "small" | "medium" | "large";
}

const VideoHero: React.FC<VideoHeroProps> = ({
  title,
  subtitle,
  badge,
  description,
  videoSrc,
  imageSrc,
  height = "medium",
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const heightClasses = {
    small: "h-[50vh] min-h-[400px]",
    medium: "h-[60vh] min-h-[500px]",
    large: "h-[75vh] min-h-[600px]",
  };

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    // Animate content
    gsap.fromTo(
      content.querySelectorAll(".hero-animate"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      }
    );

    // Parallax effect
    const media = hero.querySelector(".hero-media");
    if (media) {
      gsap.to(media, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative ${heightClasses[height]} flex items-center overflow-hidden w-full`}
    >
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-media absolute inset-0 w-full h-[120%] object-cover"
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={imageSrc}
            alt=""
            className="hero-media absolute inset-0 w-full h-[120%] object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
      </div>

      <div ref={contentRef} className="container-custom relative z-10">
        {badge && (
          <span className="badge-accent mb-6 inline-block hero-animate font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-primary-foreground/20">
            {badge.toUpperCase()}
          </span>
        )}
        {subtitle && (
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-foreground/60 mb-3 hero-animate">
            {subtitle}
          </p>
        )}
        <h1 className="text-display md:text-7xl font-bold text-primary-foreground mb-6 hero-animate uppercase tracking-tighter leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl hero-animate font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default VideoHero;
