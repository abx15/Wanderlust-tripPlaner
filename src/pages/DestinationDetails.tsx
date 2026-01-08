import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowRight, Sun, Cloud, Leaf, Snowflake } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import SwiperSlider from '@/components/SwiperSlider';
import { destinations, experiences } from '@/data';

const weatherIcons: Record<string, React.ReactNode> = {
  summer: <Sun className="w-5 h-5 text-accent" />,
  winter: <Snowflake className="w-5 h-5 text-accent" />,
  spring: <Leaf className="w-5 h-5 text-tertiary" />,
  autumn: <Cloud className="w-5 h-5 text-highlight" />,
};

const DestinationDetails: React.FC = () => {
  const { slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Destination Not Found</h1>
            <Link to="/destinations" className="btn-hero">Back to Destinations</Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const relatedExperiences = experiences.filter((e) =>
    e.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-accent mb-4">
              <MapPin size={18} />
              <span className="font-medium">{destination.country}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-primary-foreground mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mb-6">{destination.tagline}</p>
            <div className="flex items-center gap-6 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-semibold">{destination.rating}</span>
                <span className="text-primary-foreground/60">({destination.reviewCount} reviews)</span>
              </div>
              <span>From <span className="text-2xl font-semibold text-accent">${destination.startingPrice}</span></span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-medium mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{destination.longDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-medium mb-6">Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {destination.highlights.map((highlight) => (
                  <span key={highlight} className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-medium mb-6">Attractions</h2>
              <SwiperSlider
                id="attractions"
                items={destination.attractions}
                renderItem={(attraction) => (
                  <div className="bg-card rounded-2xl overflow-hidden shadow-md">
                    <img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="font-display font-medium text-lg mb-2">{attraction.name}</h3>
                      <p className="text-sm text-muted-foreground">{attraction.description}</p>
                    </div>
                  </div>
                )}
                slidesPerView={1}
                breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 } }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="text-lg font-display font-medium mb-4">Best Time to Visit</h3>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-medium">{destination.bestTimeToVisit}</span>
              </div>
              
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Weather</h4>
              <div className="space-y-3 mb-6">
                {Object.entries(destination.weather).map(([season, temp]) => (
                  <div key={season} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {weatherIcons[season]}
                      <span className="capitalize">{season}</span>
                    </div>
                    <span className="text-muted-foreground">{temp}</span>
                  </div>
                ))}
              </div>

              <Link to="/trip-planner" className="btn-hero w-full justify-center">
                Plan Your Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DestinationDetails;
