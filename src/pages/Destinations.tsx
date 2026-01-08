import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainLayout from '@/layouts/MainLayout';
import DestinationCard from '@/components/DestinationCard';
import WorldMap from '@/components/WorldMap';
import { destinations } from '@/data';
import heroDestinationsImage from '@/assets/hero-destinations.jpg';
import heroDestinationsVideo from '@/assets/hero-destinations-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const countries = ['All', 'Greece', 'Japan', 'Switzerland', 'Indonesia', 'Argentina', 'Morocco'];
const budgets = ['All', 'Under $2000', '$2000 - $3500', '$3500 - $5000', 'Over $5000'];

// Map region IDs to countries
const regionToCountries: Record<string, string[]> = {
  'europe': ['Greece', 'Switzerland'],
  'asia': ['Japan', 'Indonesia'],
  'africa': ['Morocco'],
  'south-america': ['Argentina'],
};

const Destinations: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Parallax effect on hero video
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-media'), {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  // Filter destinations based on region, search, and country
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || dest.country === selectedCountry;
    
    // If a region is selected, filter by region's countries
    const matchesRegion = !selectedRegion || 
      regionToCountries[selectedRegion]?.includes(dest.country);
    
    return matchesSearch && matchesCountry && matchesRegion;
  });

  const handleRegionSelect = (region: string | null) => {
    setSelectedRegion(region);
    setSelectedCountry('All'); // Reset country filter when region is selected
  };

  return (
    <MainLayout>
      {/* Hero with Video */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge-accent mb-4 inline-block animate-fade-in">Explore</span>
          <h1 className="text-display text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Our Destinations
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From tropical paradises to ancient cities, discover your next adventure.
          </p>
        </div>
      </section>

      {/* Interactive World Map */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-display font-semibold">Explore by Region</h2>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
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
      <section className="py-6 bg-card border-b border-border sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedRegion(null); // Clear region when country is manually selected
                }}
                className="px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="bg-background border-b border-border py-4">
        <div className="container-custom">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> destination{filteredDestinations.length !== 1 ? 's' : ''}
            {selectedRegion && (
              <span> in <span className="text-accent font-medium">{selectedRegion.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></span>
            )}
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display mb-2">No destinations found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCountry('All');
                  setSelectedRegion(null);
                }}
                className="text-accent hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Destinations;
