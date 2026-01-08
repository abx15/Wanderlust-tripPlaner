import React from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Users, Star, Check, X, ArrowRight, MapPin } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import SwiperSlider from "@/components/SwiperSlider";
import { experiences, reviews } from "@/data";

const ExperienceDetails: React.FC = () => {
  const { slug } = useParams();
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Experience Not Found</h1>
            <Link to="/experiences" className="btn-hero">
              Back to Experiences
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="relative h-[70vh] min-h-[500px] w-full">
        <SwiperSlider
          id="exp-gallery"
          items={[experience.image, ...experience.gallery]}
          renderItem={(img) => (
            <div className="h-[70vh] min-h-[500px]">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          showNavigation
          showPagination
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </section>

      <div className="bg-background w-full">
        <div className="container-custom py-24">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-20">
              <div>
                <span className="badge-accent mb-6 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-accent/20">
                  {experience.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase tracking-tight leading-tight">
                  {experience.title}
                </h1>
                <div className="flex flex-wrap items-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-foreground">
                    <MapPin size={16} className="text-accent" />
                    <span>{experience.destination}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-foreground">
                    <Star className="text-accent fill-accent" size={16} />
                    <span>
                      {experience.rating} ({experience.reviewCount} EXPERT
                      REVIEWS)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
                {experience.longDescription}
              </p>

              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-8">
                  Trip Highlights
                </h2>
                <div className="flex flex-wrap gap-4">
                  {experience.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-6 py-3 bg-secondary rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-border/50"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                      <Check size={20} />
                    </div>{" "}
                    Included
                  </h3>
                  <ul className="space-y-4">
                    {experience.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-muted-foreground font-medium"
                      >
                        <Check
                          size={18}
                          className="text-tertiary flex-shrink-0 mt-1"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-xl">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-4 uppercase tracking-tight">
                    <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                      <X size={20} />
                    </div>{" "}
                    Not Included
                  </h3>
                  <ul className="space-y-4">
                    {experience.notIncluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-muted-foreground font-medium"
                      >
                        <X
                          size={18}
                          className="text-destructive flex-shrink-0 mt-1"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-[2.5rem] p-10 shadow-2xl border border-border/50 sticky top-24 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />

                <div className="text-center mb-10 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
                    INVESTMENT
                  </span>
                  <div className="text-6xl font-display font-bold text-accent mb-2 tracking-tight">
                    ${experience.price}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    per explorer
                  </span>
                </div>

                <div className="space-y-4 mb-10 relative z-10">
                  <div className="flex justify-between p-5 bg-secondary/30 rounded-2xl border border-border/20">
                    <span className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Clock size={16} className="text-accent" /> Duration
                    </span>
                    <span className="font-bold text-sm">
                      {experience.duration}
                    </span>
                  </div>
                  <div className="flex justify-between p-5 bg-secondary/30 rounded-2xl border border-border/20">
                    <span className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Users size={16} className="text-accent" /> Group Size
                    </span>
                    <span className="font-bold text-sm">
                      Max {experience.maxGroupSize}
                    </span>
                  </div>
                  <div className="flex justify-between p-5 bg-secondary/30 rounded-2xl border border-border/20">
                    <span className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Star size={16} className="text-accent" /> Difficulty
                    </span>
                    <span className="font-bold text-sm capitalize">
                      {experience.difficulty}
                    </span>
                  </div>
                </div>

                <Link
                  to="/trip-planner"
                  className="btn-hero w-full justify-center py-6 text-[10px] font-bold tracking-[0.3em] uppercase group"
                >
                  ENROLL NOW{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperienceDetails;
