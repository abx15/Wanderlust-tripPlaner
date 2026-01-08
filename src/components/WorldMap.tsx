import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Region {
  id: string;
  name: string;
  path: string;
  destinations: string[];
}

interface WorldMapProps {
  onRegionSelect: (region: string | null) => void;
  selectedRegion: string | null;
}

const regions: Region[] = [
  {
    id: 'europe',
    name: 'Europe',
    path: 'M 480 120 L 560 100 L 580 120 L 600 110 L 620 130 L 600 160 L 580 180 L 540 200 L 500 190 L 480 170 L 460 150 L 470 130 Z',
    destinations: ['Greece', 'Switzerland'],
  },
  {
    id: 'asia',
    name: 'Asia',
    path: 'M 620 100 L 750 80 L 820 120 L 850 180 L 800 240 L 720 260 L 650 240 L 600 200 L 600 160 L 620 130 Z',
    destinations: ['Japan', 'Indonesia'],
  },
  {
    id: 'africa',
    name: 'Africa',
    path: 'M 460 200 L 520 190 L 560 220 L 580 280 L 560 360 L 500 380 L 440 340 L 420 280 L 440 220 Z',
    destinations: ['Morocco'],
  },
  {
    id: 'north-america',
    name: 'North America',
    path: 'M 100 80 L 200 60 L 280 100 L 300 160 L 280 220 L 220 260 L 160 240 L 100 180 L 80 120 Z',
    destinations: [],
  },
  {
    id: 'south-america',
    name: 'South America',
    path: 'M 200 280 L 260 260 L 300 300 L 320 380 L 280 440 L 220 460 L 180 400 L 170 340 L 180 300 Z',
    destinations: ['Argentina'],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    path: 'M 780 320 L 860 300 L 920 340 L 900 400 L 840 420 L 780 380 Z',
    destinations: [],
  },
];

const WorldMap: React.FC<WorldMapProps> = ({ onRegionSelect, selectedRegion }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const regionsRef = useRef<Map<string, SVGPathElement>>(new Map());

  useEffect(() => {
    // Initial animation
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('.region-path');
      gsap.fromTo(
        paths,
        { opacity: 0, scale: 0.9, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  const handleRegionHover = (regionId: string, isEntering: boolean) => {
    setHoveredRegion(isEntering ? regionId : null);
    
    const path = regionsRef.current.get(regionId);
    if (path) {
      gsap.to(path, {
        scale: isEntering ? 1.05 : 1,
        transformOrigin: 'center center',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleRegionClick = (region: Region) => {
    if (region.destinations.length === 0) return;
    
    if (selectedRegion === region.id) {
      onRegionSelect(null);
    } else {
      onRegionSelect(region.id);
    }

    // Pulse animation
    const path = regionsRef.current.get(region.id);
    if (path) {
      gsap.fromTo(
        path,
        { filter: 'brightness(1.3)' },
        { filter: 'brightness(1)', duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const getRegionColor = (region: Region) => {
    const hasDestinations = region.destinations.length > 0;
    const isSelected = selectedRegion === region.id;
    const isHovered = hoveredRegion === region.id;

    if (!hasDestinations) return 'hsl(var(--muted))';
    if (isSelected) return 'hsl(var(--accent))';
    if (isHovered) return 'hsl(var(--accent) / 0.7)';
    return 'hsl(var(--primary))';
  };

  const getTooltipContent = (region: Region) => {
    if (region.destinations.length === 0) {
      return `${region.name} - Coming Soon`;
    }
    return `${region.name} - ${region.destinations.length} destination${region.destinations.length > 1 ? 's' : ''}`;
  };

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative bg-card rounded-2xl border border-border p-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* SVG Map */}
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="w-full h-auto relative z-10"
          style={{ minHeight: '300px' }}
        >
          {/* Ocean background */}
          <rect x="0" y="0" width="1000" height="500" fill="hsl(var(--secondary))" rx="8" />
          
          {/* Latitude/Longitude lines */}
          <g stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3">
            {[100, 200, 300, 400].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="1000" y2={y} />
            ))}
            {[200, 400, 600, 800].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="500" />
            ))}
          </g>

          {/* Regions */}
          {regions.map((region) => (
            <g key={region.id}>
              <path
                ref={(el) => {
                  if (el) regionsRef.current.set(region.id, el);
                }}
                d={region.path}
                fill={getRegionColor(region)}
                stroke="hsl(var(--background))"
                strokeWidth="2"
                className={`region-path transition-colors duration-300 ${
                  region.destinations.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onMouseEnter={() => handleRegionHover(region.id, true)}
                onMouseLeave={() => handleRegionHover(region.id, false)}
                onClick={() => handleRegionClick(region)}
                style={{
                  filter: selectedRegion === region.id ? 'drop-shadow(0 4px 8px hsl(var(--accent) / 0.4))' : 'none',
                }}
              />
              
              {/* Region Label */}
              <text
                x={region.path.match(/M\s*(\d+)/)?.[1] ? parseInt(region.path.match(/M\s*(\d+)/)?.[1] || '0') + 40 : 0}
                y={region.path.match(/M\s*\d+\s*(\d+)/)?.[1] ? parseInt(region.path.match(/M\s*\d+\s*(\d+)/)?.[1] || '0') + 60 : 0}
                fill="hsl(var(--background))"
                fontSize="12"
                fontWeight="600"
                className="pointer-events-none select-none"
                textAnchor="middle"
              >
                {region.name}
              </text>
            </g>
          ))}

          {/* Destination Markers */}
          {regions.map((region) =>
            region.destinations.length > 0 && (
              <g key={`markers-${region.id}`}>
                <circle
                  cx={parseInt(region.path.match(/M\s*(\d+)/)?.[1] || '0') + 40}
                  cy={parseInt(region.path.match(/M\s*\d+\s*(\d+)/)?.[1] || '0') + 30}
                  r={hoveredRegion === region.id || selectedRegion === region.id ? 8 : 6}
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  className="transition-all duration-300"
                >
                  {(hoveredRegion === region.id || selectedRegion === region.id) && (
                    <animate
                      attributeName="r"
                      values="8;10;8"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              </g>
            )
          )}
        </svg>

        {/* Tooltip */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg z-20">
            <p className="text-sm font-medium">
              {getTooltipContent(regions.find((r) => r.id === hoveredRegion)!)}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent" />
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-muted-foreground">Coming Soon</span>
        </div>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div className="mt-4 p-4 bg-accent/10 rounded-xl border border-accent/20 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Showing destinations in</p>
              <p className="text-lg font-display font-semibold text-accent">
                {regions.find((r) => r.id === selectedRegion)?.name}
              </p>
            </div>
            <button
              onClick={() => onRegionSelect(null)}
              className="px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
