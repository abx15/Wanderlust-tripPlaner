import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Sun,
  Cloud,
  Leaf,
  Snowflake,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import SwiperSlider from "@/components/SwiperSlider";
import { destinations, experiences } from "@/data";

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
            <h1 className="text-4xl font-display mb-4">
              Destination Not Found
            </h1>
            <Link to="/destinations" className="btn-hero">
              Back to Destinations
            </Link>
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
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-20 z-10">
          <div className="container-custom">
            <div className="flex items-center gap-3 text-accent mb-6 font-bold text-[10px] uppercase tracking-[0.3em]">
              <MapPin size={14} />
              <span>{destination.country}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary-foreground mb-6 uppercase tracking-tight leading-tight max-w-4xl">
              {destination.name}
            </h1>
            <p className="text-2xl text-primary-foreground/70 max-w-2xl mb-10 font-medium leading-relaxed italic">
              {destination.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-10 text-primary-foreground">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-2xl font-display font-bold">
                  {destination.rating}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  ({destination.reviewCount} EXPERT REVIEWS)
                </span>
              </div>
              <div className="h-10 w-px bg-primary-foreground/20 hidden md:block" />
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  STARTING AT
                </span>
                <span className="text-4xl font-display font-bold text-accent">
                  ${destination.startingPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-background w-full">
        <div className="container-custom py-24">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-20">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-8">
                  The Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-medium">
                  {destination.longDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-10">
                  Curated Highlights
                </h2>
                <div className="flex flex-wrap gap-4">
                  {destination.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-6 py-3 bg-secondary rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-border/50"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-10">
                  Key Attractions
                </h2>
                <SwiperSlider
                  id="attractions"
                  items={destination.attractions}
                  renderItem={(attraction) => (
                    <div className="group bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-8">
                        <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tight group-hover:text-accent transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                          {attraction.description}
                        </p>
                      </div>
                    </div>
                  )}
                  slidesPerView={1}
                  breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 30 } }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-card rounded-[2.5rem] p-10 shadow-2xl border border-border/50 sticky top-24 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />

                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-8 relative z-10">
                  Travel Logistics
                </h3>

                <div className="space-y-8 relative z-10 mb-10">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      Prime Visitation
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent/10 rounded-lg text-accent">
                        <Calendar size={18} />
                      </div>
                      <span className="font-bold text-lg">
                        {destination.bestTimeToVisit}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      Seasonal Climate
                    </h4>
                    <div className="grid gap-4">
                      {Object.entries(destination.weather).map(
                        ([season, temp]) => (
                          <div
                            key={season}
                            className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              {weatherIcons[season]}
                              <span className="text-[10px] font-bold uppercase tracking-widest">
                                {season}
                              </span>
                            </div>
                            <span className="font-bold text-sm text-foreground">
                              {temp}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  to="/trip-planner"
                  className="btn-hero w-full justify-center py-6 text-[10px] font-bold tracking-[0.3em] uppercase group"
                >
                  PLAN YOUR JOURNEY{" "}
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

export default DestinationDetails;
