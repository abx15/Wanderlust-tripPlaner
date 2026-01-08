import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainLayout from "@/layouts/MainLayout";
import DestinationCard from "@/components/DestinationCard";
import WorldMap from "@/components/WorldMap";
import { destinations } from "@/data";
import heroDestinationsImage from "@/assets/hero-destinations.jpg";
import heroDestinationsVideo from "@/assets/hero-destinations-video.mp4";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  "All",
  "Greece",
  "Japan",
  "Switzerland",
  "Indonesia",
  "Argentina",
  "Morocco",
];
const budgets = [
  "All",
  "Under $2000",
  "$2000 - $3500",
  "$3500 - $5000",
  "Over $5000",
];

// Map region IDs to countries
const regionToCountries: Record<string, string[]> = {
  europe: ["Greece", "Switzerland"],
  asia: ["Japan", "Indonesia"],
  africa: ["Morocco"],
  "south-america": ["Argentina"],
};

const Destinations: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Parallax effect on hero video
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector(".hero-media"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  // Filter destinations based on region, search, and country
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());

    const matchesCountry =
      selectedCountry === "All" || dest.country === selectedCountry;

    // If a region is selected, filter by region's countries
    const matchesRegion =
      !selectedRegion ||
      regionToCountries[selectedRegion]?.includes(dest.country);

    return matchesSearch && matchesCountry && matchesRegion;
  });

  const handleRegionSelect = (region: string | null) => {
    setSelectedRegion(region);
    setSelectedCountry("All"); // Reset country filter when region is selected
  };

  return (
    <MainLayout>
      {/* Hero with Video */}
      <section
        ref={heroRef}
        className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden w-full"
      >
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="hero-media absolute inset-0 w-full h-[120%] object-cover"
            poster={heroDestinationsImage}
          >
            <source src={heroDestinationsVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge-accent mb-6 inline-block animate-fade-in font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-primary-foreground/20">
            EXPLORE OUR WORLD
          </span>
          <h1
            className="text-display md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in uppercase tracking-tighter"
            style={{ animationDelay: "0.1s" }}
          >
            Our Destinations
          </h1>
          <p
            className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl animate-fade-in font-medium leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            From tropical paradises to ancient cities, discover your next
            adventure in our curated collection.
          </p>
        </div>
      </section>

      {/* Interactive World Map */}
      <section className="py-20 bg-secondary/30 w-full border-b border-border/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight">
                Explore by Region
              </h2>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
            >
              {showMap ? "Hide Map" : "Show Map"}
            </button>
          </div>

          {showMap && (
            <div className="animate-fade-in">
              <WorldMap
                onRegionSelect={handleRegionSelect}
                selectedRegion={selectedRegion}
              />
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card/80 backdrop-blur-xl border-b border-border sticky top-[72px] z-30 w-full">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                size={18}
              />
              <input
                type="text"
                placeholder="SEARCH DESTINATIONS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-bold text-[10px] tracking-widest"
              />
            </div>
            <div className="flex gap-4 flex-wrap w-full lg:w-auto">
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedRegion(null); // Clear region when country is manually selected
                }}
                className="flex-1 lg:flex-none px-6 py-4 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-bold text-[10px] tracking-widest uppercase cursor-pointer"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="flex-1 lg:flex-none px-6 py-4 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-bold text-[10px] tracking-widest uppercase cursor-pointer"
              >
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="bg-background border-b border-border/50 py-6 w-full">
        <div className="container-custom">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Showing{" "}
            <span className="text-foreground">
              {filteredDestinations.length}
            </span>{" "}
            destination{filteredDestinations.length !== 1 ? "s" : ""}
            {selectedRegion && (
              <span>
                {" "}
                in{" "}
                <span className="text-accent">
                  {selectedRegion.replace("-", " ").toUpperCase()}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            ))}
          </div>
          {filteredDestinations.length === 0 && (
            <div className="text-center py-32">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-8">
                <MapPin className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">
                No destinations found
              </h3>
              <p className="text-muted-foreground font-medium mb-10 max-w-md mx-auto">
                We couldn't find any destinations matching your criteria. Try
                adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCountry("All");
                  setSelectedRegion(null);
                }}
                className="btn-hero px-10 py-4 text-[10px] font-bold tracking-widest"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Destinations;
