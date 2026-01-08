import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Page transition animations
export const pageEnter = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
  );
};

export const pageExit = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power3.in',
  });
};

// Hero animations
export const heroTextReveal = (elements: NodeListOf<Element> | Element[]) => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    elements,
    { opacity: 0, y: 100, clipPath: 'inset(100% 0% 0% 0%)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    }
  );

  return tl;
};

// Card hover animation
export const cardHover = {
  enter: (element: HTMLElement) => {
    gsap.to(element, {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  },
  leave: (element: HTMLElement) => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      duration: 0.3,
      ease: 'power2.out',
    });
  },
};

// Image reveal animation
export const imageReveal = (element: HTMLElement) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.fromTo(
    element,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      ease: 'power4.out',
    }
  );

  return tl;
};

// Stagger fade animation
export const staggerFade = (
  container: HTMLElement,
  children: string = ':scope > *',
  options: { delay?: number; stagger?: number } = {}
) => {
  const { delay = 0, stagger = 0.1 } = options;
  
  const elements = container.querySelectorAll(children);
  
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Parallax effect
export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  return gsap.to(element, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Text split animation
export const splitTextReveal = (element: HTMLElement) => {
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words
    .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
    .join(' ');

  const spans = element.querySelectorAll('span > span');
  
  return gsap.fromTo(
    spans,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2
) => {
  const counter = { value: 0 };
  
  return gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.textContent = Math.round(counter.value).toLocaleString();
    },
  });
};

// Magnetic effect for buttons
export const magneticEffect = (element: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Timeline reveal for sections
export const sectionReveal = (section: HTMLElement) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  const heading = section.querySelector('h2, h3');
  const content = section.querySelectorAll('p, .reveal-content');
  const cards = section.querySelectorAll('.reveal-card');

  if (heading) {
    tl.fromTo(
      heading,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }

  if (content.length) {
    tl.fromTo(
      content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );
  }

  if (cards.length) {
    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.3'
    );
  }

  return tl;
};

export default {
  pageEnter,
  pageExit,
  heroTextReveal,
  cardHover,
  imageReveal,
  staggerFade,
  parallaxScroll,
  splitTextReveal,
  animateCounter,
  magneticEffect,
  sectionReveal,
};
