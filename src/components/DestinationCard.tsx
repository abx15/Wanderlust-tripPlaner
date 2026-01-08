import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  variant?: "default" | "featured" | "compact";
  onClick?: (destination: Destination) => void;
  isSelected?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
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
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 0.4,
        duration: 0.3,
      });
      gsap.to(card.querySelector(".card-content"), {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector(".card-image"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(card.querySelector(".card-overlay"), {
        opacity: 0.6,
        duration: 0.3,
      });
      gsap.to(card.querySelector(".card-content"), {
        y: 0,
        duration: 0.3,
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

  const CardWrapper = onClick ? "div" : Link;
  const wrapperProps = onClick
    ? {
        onClick: () => onClick(destination),
        className: "w-full cursor-pointer h-full",
      }
    : { to: `/destinations/${destination.slug}`, className: "w-full h-full" };

  if (variant === "featured") {
    return (
      <CardWrapper {...(wrapperProps as any)}>
        <div
          ref={cardRef}
          className={`relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-foreground/5 transition-all duration-500 ${
            isSelected ? "ring-4 ring-accent scale-[0.98]" : ""
          }`}
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          <div className="card-content absolute bottom-0 left-0 right-0 p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 text-accent mb-4">
              <MapPin size={14} className="fill-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {destination.country}
              </span>
            </div>
            <h3 className="text-4xl font-display font-bold text-primary-foreground mb-4 uppercase tracking-tighter">
              {destination.name}
            </h3>
            <p className="text-primary-foreground/90 mb-6 line-clamp-2 font-medium leading-relaxed max-w-xl">
              {destination.tagline}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground/80 font-medium">
                FROM{" "}
                <span className="text-accent font-bold text-xl">
                  ${destination.startingPrice}
                </span>
              </span>
              <span className="flex items-center gap-4 text-accent font-bold uppercase text-xs tracking-widest group-hover:gap-6 transition-all duration-500">
                {onClick ? (isSelected ? "SELECTED" : "SELECT") : "EXPLORE"}{" "}
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </CardWrapper>
    );
  }

  if (variant === "compact") {
    return (
      <CardWrapper {...(wrapperProps as any)}>
        <div
          ref={cardRef}
          className={`relative h-[320px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg shadow-foreground/5 transition-all duration-500 ${
            isSelected ? "ring-4 ring-accent scale-[0.98]" : ""
          }`}
        >
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

          <div className="card-content absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-primary-foreground/70 mb-2">
              <MapPin size={12} className="fill-accent/50" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {destination.country}
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary-foreground uppercase tracking-tight">
              {destination.name}
            </h3>
          </div>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper {...(wrapperProps as any)}>
      <div
        ref={cardRef}
        className={`group relative bg-card rounded-3xl overflow-hidden shadow-xl shadow-foreground/5 border border-border/50 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 ${
          isSelected ? "ring-4 ring-accent scale-[0.98]" : ""
        }`}
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="card-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />

          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-foreground/95 text-primary text-xs font-bold shadow-lg">
              ★ {destination.rating}
            </div>
          </div>
        </div>

        <div className="card-content p-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin size={14} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {destination.country}
            </span>
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors uppercase tracking-tight">
            {destination.name}
          </h3>
          <p className="text-muted-foreground/90 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
            {destination.tagline}
          </p>
          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
              From{" "}
              <span className="text-accent font-bold text-xl ml-1">
                ${destination.startingPrice}
              </span>
            </span>
            <span className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest group-hover:gap-5 transition-all duration-500">
              {onClick ? (isSelected ? "SELECTED" : "SELECT") : "VIEW"}{" "}
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default DestinationCard;
