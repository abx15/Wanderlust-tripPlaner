import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export const useScrollReveal = <T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T> => {
  const ref = useRef<T>(null);
  
  const {
    delay = 0,
    duration = 1,
    y = 60,
    x = 0,
    scale = 1,
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, {
      opacity: 0,
      y,
      x,
      scale,
    });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, y, x, scale, start, end, scrub]);

  return ref;
};

export const useStaggerReveal = <T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T> => {
  const ref = useRef<T>(null);
  
  const {
    delay = 0,
    duration = 0.8,
    y = 40,
    stagger = 0.1,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    
    gsap.set(children, {
      opacity: 0,
      y,
    });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [delay, duration, y, stagger, start]);

  return ref;
};

export const useParallax = <T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.to(element, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return ref;
};

export const useCountUp = (
  targetValue: number,
  options: { duration?: number; delay?: number } = {}
): [RefObject<HTMLElement>, number] => {
  const ref = useRef<HTMLElement>(null);
  const countRef = useRef({ value: 0 });

  const { duration = 2, delay = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.to(countRef.current, {
      value: targetValue,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = Math.round(countRef.current.value).toString();
      },
    });

    return () => {
      animation.kill();
    };
  }, [targetValue, duration, delay]);

  return [ref, countRef.current.value];
};

export default useScrollReveal;
