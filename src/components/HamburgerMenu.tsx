import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick, isScrolled }) => {
  const topLineRef = useRef<HTMLSpanElement>(null);
  const middleLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'power2.inOut' } });

    if (isOpen) {
      tl.to(topLineRef.current, { rotate: 45, y: 8 }, 0)
        .to(middleLineRef.current, { opacity: 0, scaleX: 0 }, 0)
        .to(bottomLineRef.current, { rotate: -45, y: -8 }, 0);
    } else {
      tl.to(topLineRef.current, { rotate: 0, y: 0 }, 0)
        .to(middleLineRef.current, { opacity: 1, scaleX: 1 }, 0)
        .to(bottomLineRef.current, { rotate: 0, y: 0 }, 0);
    }
  }, [isOpen]);

  const lineColor = isScrolled ? 'bg-foreground' : 'bg-primary-foreground';

  return (
    <button
      onClick={onClick}
      className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] focus:outline-none group"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        ref={topLineRef}
        className={`block w-6 h-[2px] ${lineColor} rounded-full origin-center transform transition-colors duration-300`}
      />
      <span
        ref={middleLineRef}
        className={`block w-6 h-[2px] ${lineColor} rounded-full origin-center transition-colors duration-300`}
      />
      <span
        ref={bottomLineRef}
        className={`block w-6 h-[2px] ${lineColor} rounded-full origin-center transform transition-colors duration-300`}
      />
      
      {/* Hover effect circle */}
      <span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
    </button>
  );
};

export default HamburgerMenu;
