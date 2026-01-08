import React, { useState } from 'react';
import { Check, MapPin, Calendar, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import DestinationCard from '@/components/DestinationCard';
import ExperienceCard from '@/components/ExperienceCard';
import { destinations, experiences } from '@/data';
import { Destination, Experience } from '@/types';

const steps = ['Destination', 'Dates', 'Experience', 'Summary'];

const TripPlanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [travelers, setTravelers] = useState(2);

  const canProceed = () => {
    if (currentStep === 0) return selectedDestination !== null;
    if (currentStep === 1) return startDate && endDate;
    if (currentStep === 2) return true;
    return true;
  };

  const filteredExperiences = selectedDestination
    ? experiences.filter((e) => e.destination.toLowerCase().includes(selectedDestination.name.toLowerCase()))
    : experiences;

  return (
    <MainLayout>
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge-accent mb-4 inline-block">Plan Your Journey</span>
          <h1 className="text-display text-primary-foreground">Trip Planner</h1>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-card border-b border-border py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium transition-all ${
                  index <= currentStep ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'
                }`}>
                  {index < currentStep ? <Check size={18} /> : index + 1}
                </div>
                <span className={`ml-2 hidden sm:inline ${index <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-0.5 mx-2 ${index < currentStep ? 'bg-accent' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Step 1: Destination */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-headline mb-8 text-center">Where do you want to go?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest)}
                    className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
                      selectedDestination?.id === dest.id ? 'ring-4 ring-accent scale-[1.02]' : ''
                    }`}
                  >
                    <DestinationCard destination={dest} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Dates */}
          {currentStep === 1 && (
            <div className="max-w-xl mx-auto">
              <h2 className="text-headline mb-8 text-center">When are you traveling?</h2>
              <div className="bg-card rounded-2xl p-8 shadow-md space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-headline mb-8 text-center">Choose an experience (optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.slice(0, 6).map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExperience(selectedExperience?.id === exp.id ? null : exp)}
                    className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
                      selectedExperience?.id === exp.id ? 'ring-4 ring-accent scale-[1.02]' : ''
                    }`}
                  >
                    <ExperienceCard experience={exp} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-headline mb-8 text-center">Your Trip Summary</h2>
              <div className="bg-card rounded-2xl p-8 shadow-lg space-y-6">
                {selectedDestination && (
                  <div className="flex gap-4">
                    <img src={selectedDestination.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <h3 className="text-xl font-display font-medium">{selectedDestination.name}, {selectedDestination.country}</h3>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div><p className="text-sm text-muted-foreground">Dates</p><p className="font-medium">{startDate} - {endDate}</p></div>
                  <div><p className="text-sm text-muted-foreground">Travelers</p><p className="font-medium">{travelers}</p></div>
                </div>
                {selectedExperience && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{selectedExperience.title}</p>
                    <p className="text-accent font-semibold">${selectedExperience.price} per person</p>
                  </div>
                )}
                <button className="btn-hero w-full justify-center mt-6">
                  <Sparkles className="w-4 h-4" /> Confirm & Get Quote
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 max-w-2xl mx-auto">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>
            {currentStep < 3 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TripPlanner;
