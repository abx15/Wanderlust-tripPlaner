import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = "center",
  light = false,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const elements = heading.querySelectorAll(".animate-item");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      ref={headingRef}
      className={`flex flex-col gap-5 mb-16 md:mb-20 ${alignmentClasses[align]}`}
    >
      {badge && (
        <span
          className={`animate-item badge-accent font-bold px-4 py-1.5 text-[10px] ${
            light
              ? "bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20"
              : ""
          }`}
        >
          {badge.toUpperCase()}
        </span>
      )}
      <h2
        className={`animate-item text-display md:text-5xl lg:text-6xl max-w-4xl font-bold uppercase tracking-tight leading-[1.1] ${
          light ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`animate-item text-lg md:text-xl max-w-2xl font-medium leading-relaxed ${
            light ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`animate-item h-1.5 w-24 bg-accent rounded-full ${
          align === "center" ? "mx-auto" : ""
        } ${align === "right" ? "ml-auto" : ""}`}
      />
    </div>
  );
};

export default SectionHeading;
