import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Sparkles,
  Headphones,
  Leaf,
  ArrowRight,
  Star,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import DestinationCard from "@/components/DestinationCard";
import ExperienceCard from "@/components/ExperienceCard";
import SwiperSlider from "@/components/SwiperSlider";
import { destinations, experiences, reviews, whyChooseUs } from "@/data";
import heroHomeImage from "@/assets/hero-home.jpg";
import heroHomeVideo from "@/assets/hero-home-video.mp4";

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
      const counters = statsRef.current.querySelectorAll(".stat-value");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none none",
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
        secondaryCta={{ text: "Watch Story", link: "#" }}
      />

      {/* Featured Destinations */}
      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <SectionHeading
            badge="Popular Destinations"
            title="Where Will Your Next Adventure Take You?"
            description="From sun-kissed Mediterranean islands to snow-capped Alpine peaks, discover destinations that inspire."
          />

          <div className="w-full">
            <SwiperSlider
              id="destinations"
              items={destinations.slice(0, 4)}
              renderItem={(destination) => (
                <DestinationCard destination={destination} variant="featured" />
              )}
              slidesPerView={1}
              spaceBetween={32}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 32 },
                1280: { slidesPerView: 2, spaceBetween: 40 },
              }}
            />
          </div>

          <div className="text-center mt-20">
            <Link
              to="/destinations"
              className="btn-hero inline-flex px-12 py-5 text-[10px] font-bold tracking-widest"
            >
              VIEW ALL DESTINATIONS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-primary-foreground w-full">
        <div className="container-custom">
          <SectionHeading
            badge="Why Wanderlust"
            title="Travel With Confidence"
            description="We're dedicated to creating exceptional travel experiences with uncompromising quality and care."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group p-10 rounded-3xl bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent text-accent-foreground mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-accent/20">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="section-padding bg-secondary w-full">
        <div className="container-custom">
          <SectionHeading
            badge="Curated Experiences"
            title="Unforgettable Adventures Await"
            description="Handcrafted experiences designed to immerse you in local culture, nature, and adventure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {experiences.slice(0, 3).map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/experiences"
              className="btn-hero inline-flex px-12 py-5 text-[10px] font-bold tracking-widest"
            >
              BROWSE ALL EXPERIENCES
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <SectionHeading
            badge="Testimonials"
            title="What Our Travelers Say"
            description="Real stories from travelers who've experienced the Wanderlust difference."
          />

          <div className="w-full">
            <SwiperSlider
              id="testimonials"
              items={reviews}
              renderItem={(review) => (
                <div className="bg-card rounded-3xl p-10 shadow-xl shadow-foreground/5 h-full border border-border/50 hover:border-accent/30 transition-colors duration-500">
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-accent fill-accent"
                            : "text-muted"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-lg text-foreground/90 mb-8 font-medium italic leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-5">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-accent/20"
                    />
                    <div>
                      <p className="font-bold text-foreground">
                        {review.author.toUpperCase()}
                      </p>
                      <p className="text-sm text-accent font-bold tracking-wide uppercase">
                        {review.destination}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 32 },
                1280: { slidesPerView: 3, spaceBetween: 40 },
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-48 overflow-hidden w-full">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/60 to-primary/90" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-display md:text-7xl font-bold text-primary-foreground mb-8 uppercase tracking-tighter">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/70 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Let us help you plan the trip of a lifetime. Our travel experts are
            here to craft your perfect adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/trip-planner"
              className="btn-hero px-12 py-5 text-[10px] font-bold tracking-widest"
            >
              PLAN YOUR TRIP
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="btn-hero-outline px-12 py-5 text-[10px] font-bold tracking-widest border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
