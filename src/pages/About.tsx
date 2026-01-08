import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainLayout from '@/layouts/MainLayout';
import VideoHero from '@/components/VideoHero';
import SectionHeading from '@/components/SectionHeading';
import { teamMembers, statistics } from '@/data';
import heroAboutImage from '@/assets/hero-about.jpg';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-value');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter, { textContent: 0 }, {
          textContent: target, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
          scrollTrigger: { trigger: counter, start: 'top 80%', toggleActions: 'play none none none' },
        });
      });
    }
  }, []);

  return (
    <MainLayout>
      <VideoHero
        title="About Wanderlust"
        badge="Our Story"
        description="Crafting extraordinary journeys since 2009."
        imageSrc={heroAboutImage}
        height="large"
      />

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading badge="Our Mission" title="We Believe Travel Transforms Lives" align="left" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a passion for exploration, Wanderlust has grown from a small travel blog into one of the world's most trusted luxury travel companies. We believe that travel should be more than just a vacation—it should be a journey that changes you.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of travel experts personally vets every destination, hotel, and experience we offer. We work directly with local communities to ensure authentic experiences that benefit both travelers and the places they visit.
              </p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600&h=700&fit=crop" alt="Team" className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-8 -left-8 bg-accent text-accent-foreground p-6 rounded-2xl">
                <div className="text-4xl font-display font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.label}>
                <div className="text-5xl font-display font-bold text-primary-foreground mb-2">
                  <span className="stat-value" data-target={stat.value}>0</span>{stat.suffix}
                </div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading badge="Our Team" title="Meet the Experts" description="The passionate people behind your unforgettable journeys." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-card rounded-2xl overflow-hidden shadow-md group">
                <div className="relative h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-display font-medium">{member.name}</h3>
                  <p className="text-accent text-sm mb-3">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    {member.social.linkedin && <a href={member.social.linkedin} className="text-muted-foreground hover:text-accent"><Linkedin size={18} /></a>}
                    {member.social.twitter && <a href={member.social.twitter} className="text-muted-foreground hover:text-accent"><Twitter size={18} /></a>}
                    {member.social.instagram && <a href={member.social.instagram} className="text-muted-foreground hover:text-accent"><Instagram size={18} /></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
