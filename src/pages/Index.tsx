import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, Headphones, Leaf, ArrowRight, Star } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import DestinationCard from '@/components/DestinationCard';
import ExperienceCard from '@/components/ExperienceCard';
import SwiperSlider from '@/components/SwiperSlider';
import { destinations, experiences, reviews, whyChooseUs } from '@/data';
import heroHomeImage from '@/assets/hero-home.jpg';
import heroHomeVideo from '@/assets/hero-home-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  HeadphonesIcon: <Headphones className="w-8 h-8" />,
  Leaf: <Leaf className="w-8 h-8" />,
};

const Index: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stats on scroll
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-value');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        subtitle="Luxury Travel Experiences"
        title="Discover the World's Most Breathtaking Destinations"
        description="Curated journeys to extraordinary places. Experience travel the way it was meant to be — authentic, immersive, and unforgettable."
        backgroundImage={heroHomeImage}
        video={heroHomeVideo}
        ctaText="Explore Destinations"
        ctaLink="/destinations"
        secondaryCta={{ text: 'Watch Story', link: '#' }}
      />

      {/* Featured Destinations */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Popular Destinations"
            title="Where Will Your Next Adventure Take You?"
            description="From sun-kissed Mediterranean islands to snow-capped Alpine peaks, discover destinations that inspire."
          />
          
          <SwiperSlider
            id="destinations"
            items={destinations.slice(0, 4)}
            renderItem={(destination) => (
              <DestinationCard destination={destination} variant="featured" />
            )}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
            }}
          />
          
          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-hero inline-flex">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <SectionHeading
            badge="Why Wanderlust"
            title="Travel With Confidence"
            description="We're dedicated to creating exceptional travel experiences with uncompromising quality and care."
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{item.title}</h3>
                <p className="text-primary-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Curated Experiences"
            title="Unforgettable Adventures Await"
            description="Handcrafted experiences designed to immerse you in local culture, nature, and adventure."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.slice(0, 3).map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/experiences" className="btn-hero inline-flex">
              Browse All Experiences
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Testimonials"
            title="What Our Travelers Say"
            description="Real stories from travelers who've experienced the Wanderlust difference."
          />
          
          <SwiperSlider
            id="testimonials"
            items={reviews}
            renderItem={(review) => (
              <div className="bg-card rounded-2xl p-8 shadow-md h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? 'text-accent fill-accent' : 'text-muted'}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.destination}</p>
                  </div>
                </div>
              </div>
            )}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-headline text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Let us help you plan the trip of a lifetime. Our travel experts are here to craft your perfect adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/trip-planner" className="btn-hero">
              Plan Your Trip
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-hero-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
