import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainLayout from "@/layouts/MainLayout";
import VideoHero from "@/components/VideoHero";
import SectionHeading from "@/components/SectionHeading";
import { teamMembers, statistics } from "@/data";
import heroAboutImage from "@/assets/hero-about.jpg";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <VideoHero
        title="About Wanderlust"
        badge="Our Story"
        description="Crafting extraordinary journeys since 2009."
        imageSrc={heroAboutImage}
        height="large"
      />

      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading
                badge="OUR MISSION"
                title="TRAVEL TRANSFORMS LIVES"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                Founded with a passion for exploration, Wanderlust has grown
                from a small travel blog into one of the world's most trusted
                luxury travel companies. We believe that travel should be more
                than just a vacation—it should be a journey that changes you.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our team of travel experts personally vets every destination,
                hotel, and experience we offer. We work directly with local
                communities to ensure authentic experiences that benefit both
                travelers and the places they visit.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-accent/10 rounded-[2rem] blur-2xl group-hover:bg-accent/20 transition-all duration-700" />
              <img
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&h=1000&fit=crop"
                alt="Team"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
              />
              <div className="absolute -bottom-10 -left-10 bg-accent text-accent-foreground p-10 rounded-3xl shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-500">
                <div className="text-6xl font-display font-bold mb-2">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="py-32 bg-primary w-full overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {statistics.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-6xl md:text-7xl font-display font-bold text-accent mb-4 transition-transform duration-500 group-hover:scale-110">
                  <span className="stat-value" data-target={stat.value}>
                    0
                  </span>
                  {stat.suffix}
                </div>
                <div className="text-primary-foreground/50 text-[10px] font-bold uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary w-full">
        <div className="container-custom">
          <SectionHeading
            badge="OUR TEAM"
            title="MEET THE EXPERTS"
            description="The passionate people behind your unforgettable luxury journeys."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-xl border border-border/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                    <div className="flex gap-4">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {member.role}
                  </p>
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
