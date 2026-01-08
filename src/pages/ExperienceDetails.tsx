import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Star, Check, X, ArrowRight, MapPin } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import SwiperSlider from '@/components/SwiperSlider';
import { experiences, reviews } from '@/data';

const ExperienceDetails: React.FC = () => {
  const { slug } = useParams();
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Experience Not Found</h1>
            <Link to="/experiences" className="btn-hero">Back to Experiences</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="relative h-[60vh] min-h-[450px]">
        <SwiperSlider
          id="exp-gallery"
          items={[experience.image, ...experience.gallery]}
          renderItem={(img) => (
            <div className="h-[60vh] min-h-[450px]">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          showNavigation
          showPagination
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="badge-accent mb-4 inline-block">{experience.category}</span>
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">{experience.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin size={18} /> <span>{experience.destination}</span>
                <Star className="text-accent fill-accent" size={18} />
                <span>{experience.rating} ({experience.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{experience.longDescription}</p>

            <div>
              <h2 className="text-2xl font-display font-medium mb-4">Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {experience.highlights.map((h) => (
                  <span key={h} className="px-4 py-2 bg-secondary rounded-full text-sm">{h}</span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Check className="text-tertiary" /> Included</h3>
                <ul className="space-y-2">
                  {experience.included.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <Check size={16} className="text-tertiary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><X className="text-destructive" /> Not Included</h3>
                <ul className="space-y-2">
                  {experience.notIncluded.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <X size={16} className="text-destructive" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="text-center mb-6">
                <span className="text-muted-foreground">From</span>
                <div className="text-4xl font-display font-bold text-accent">${experience.price}</div>
                <span className="text-muted-foreground">per person</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="flex items-center gap-2"><Clock size={18} /> Duration</span>
                  <span className="font-medium">{experience.duration}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="flex items-center gap-2"><Users size={18} /> Group Size</span>
                  <span className="font-medium">Max {experience.maxGroupSize}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span>Difficulty</span>
                  <span className="font-medium">{experience.difficulty}</span>
                </div>
              </div>

              <Link to="/trip-planner" className="btn-hero w-full justify-center">
                Plan This Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperienceDetails;
