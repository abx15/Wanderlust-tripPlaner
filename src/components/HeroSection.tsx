import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import gsap from "gsap";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCta?: {
    text: string;
    link: string;
  };
  overlay?: boolean;
  fullHeight?: boolean;
  video?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText = "Explore Now",
  ctaLink = "/destinations",
  secondaryCta,
  overlay = true,
  fullHeight = true,
  video,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const tl = gsap.timeline();

    // Initial animation
    tl.fromTo(
      content.querySelectorAll(".hero-animate"),
      {
        opacity: 0,
        y: 80,
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      }
    );

    // Parallax effect on scroll
    gsap.to(hero.querySelector(".hero-bg"), {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden ${
        fullHeight ? "min-h-screen" : "min-h-[70vh]"
      } flex items-center`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-bg absolute inset-0 w-full h-[120%] object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={backgroundImage}
            alt=""
            className="hero-bg absolute inset-0 w-full h-[120%] object-cover"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container-custom py-32">
        <div className="max-w-4xl">
          {subtitle && (
            <div className="hero-animate mb-6">
              <span className="badge-accent font-bold">{subtitle}</span>
            </div>
          )}

          <h1 className="hero-animate text-display text-primary-foreground mb-6 font-bold uppercase tracking-tight leading-[1.1]">
            {title}
          </h1>

          {description && (
            <p className="hero-animate text-xl md:text-2xl text-primary-foreground/90 font-medium mb-10 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}

          <div className="hero-animate flex flex-wrap gap-6">
            <Link
              to={ctaLink}
              className="btn-hero group px-10 py-5 text-[10px] font-bold"
            >
              {ctaText.toUpperCase()}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {secondaryCta && (
              <Link
                to={secondaryCta.link}
                className="btn-hero-outline group px-10 py-5 text-[10px] font-bold"
              >
                <Play className="w-4 h-4" />
                {secondaryCta.text.toUpperCase()}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
