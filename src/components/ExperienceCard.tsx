import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  variant?: "default" | "featured" | "horizontal";
  onClick?: (experience: Experience) => void;
  isSelected?: boolean;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-tertiary/10 text-tertiary",
  Moderate: "bg-accent/10 text-accent",
  Challenging: "bg-highlight/10 text-highlight",
  Expert: "bg-destructive/10 text-destructive",
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index = 0,
  variant = "default",
  onClick,
  isSelected = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (variant === "horizontal") {
    const horizontalContent = (
      <div
        ref={cardRef}
        className={`group flex flex-col md:flex-row bg-card rounded-3xl overflow-hidden shadow-xl shadow-foreground/5 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 ${
          isSelected ? "ring-4 ring-accent scale-[0.98]" : ""
        }`}
      >
        <div className="relative w-full md:w-2/5 h-72 md:h-auto overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-6 left-6">
            <span className="badge-accent font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest bg-primary-foreground/90 backdrop-blur-sm border border-primary/10">
              {experience.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-4 uppercase tracking-tight group-hover:text-accent transition-colors duration-500">
              {experience.title}
            </h3>
            <p className="text-muted-foreground/90 mb-6 line-clamp-2 font-medium leading-relaxed">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                <Clock size={16} className="text-accent" />
                {experience.duration}
              </span>
              <span className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                <Users size={16} className="text-accent" />
                MAX {experience.maxGroupSize}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  difficultyColors[experience.difficulty]
                }`}
              >
                {experience.difficulty}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-border/50">
            <div>
              <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                Starting At
              </span>
              <span className="text-3xl font-display font-bold text-accent ml-3">
                ${experience.price}
              </span>
            </div>
            <span className="flex items-center gap-3 text-accent font-bold uppercase text-xs tracking-widest group-hover:gap-5 transition-all duration-500">
              {onClick ? (isSelected ? "SELECTED" : "SELECT") : "VIEW DETAILS"}{" "}
              <ArrowRight size={18} />
            </span>
          </div>
        </div>
      </div>
    );

    return onClick ? (
      <div
        onClick={() => onClick(experience)}
        className="w-full cursor-pointer h-full"
      >
        {horizontalContent}
      </div>
    ) : (
      <Link to={`/experiences/${experience.slug}`} className="w-full h-full">
        {horizontalContent}
      </Link>
    );
  }

  const defaultContent = (
    <div
      ref={cardRef}
      className={`group bg-card rounded-3xl overflow-hidden shadow-xl shadow-foreground/5 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 ${
        isSelected ? "ring-4 ring-accent scale-[0.98]" : ""
      }`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />

        <div className="absolute top-6 left-6 flex gap-2">
          <span className="badge-accent font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest bg-primary-foreground/90 backdrop-blur-sm border border-primary/10">
            {experience.category}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-foreground/95 text-primary text-xs font-bold shadow-lg">
            ★ {experience.rating}
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              difficultyColors[experience.difficulty]
            }`}
          >
            {experience.difficulty}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-500 uppercase tracking-tight line-clamp-2">
          {experience.title}
        </h3>
        <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-6">
          {experience.destination}
        </p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
            <Clock size={16} className="text-accent" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
            <Users size={16} className="text-accent" />
            MAX {experience.maxGroupSize}
          </span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
            From{" "}
            <span className="text-accent font-bold text-xl ml-1">
              ${experience.price}
            </span>
          </span>
          <ArrowRight
            size={20}
            className="text-accent group-hover:translate-x-2 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );

  return onClick ? (
    <div
      onClick={() => onClick(experience)}
      className="w-full cursor-pointer h-full"
    >
      {defaultContent}
    </div>
  ) : (
    <Link to={`/experiences/${experience.slug}`} className="w-full h-full">
      {defaultContent}
    </Link>
  );
};

export default ExperienceCard;
