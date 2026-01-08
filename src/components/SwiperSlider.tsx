import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

interface SwiperSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean;
  effect?: 'slide' | 'fade' | 'coverflow';
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
  id?: string;
  freeMode?: boolean;
}

function SwiperSlider<T>({
  items,
  renderItem,
  slidesPerView = 1,
  spaceBetween = 24,
  loop = true,
  autoplay = false,
  effect = 'slide',
  showNavigation = true,
  showPagination = false,
  className = '',
  breakpoints,
  id = 'slider',
  freeMode = false,
}: SwiperSliderProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const modules = [Navigation, Pagination];
  if (autoplay) modules.push(Autoplay);
  if (effect === 'fade') modules.push(EffectFade);
  if (effect === 'coverflow') modules.push(EffectCoverflow);
  if (freeMode) modules.push(FreeMode);

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      <Swiper
        modules={modules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplay ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        effect={effect}
        freeMode={freeMode ? { enabled: true, sticky: false, momentum: true, momentumRatio: 0.5 } : false}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={{
          prevEl: `.${id}-prev`,
          nextEl: `.${id}-next`,
        }}
        pagination={showPagination ? { clickable: true, dynamicBullets: true } : false}
        breakpoints={breakpoints}
        className="!overflow-visible"
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        // Improved touch settings for mobile
        grabCursor={true}
        touchRatio={1.2}
        touchAngle={45}
        resistance={true}
        resistanceRatio={0.85}
        speed={400}
        cssMode={false}
        touchStartPreventDefault={false}
        // Better momentum
        longSwipesRatio={0.25}
        shortSwipes={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            className={`${id}-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-background/90 shadow-lg flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-6 disabled:opacity-30 disabled:cursor-not-allowed md:flex hidden`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`${id}-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-background/90 shadow-lg flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 disabled:opacity-30 disabled:cursor-not-allowed md:flex hidden`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Mobile swipe indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ChevronLeft size={14} />
          <span>Swipe to explore</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default SwiperSlider;
