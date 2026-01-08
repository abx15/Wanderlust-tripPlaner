import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import DestinationCard from "@/components/DestinationCard";
import ExperienceCard from "@/components/ExperienceCard";
import { destinations, experiences } from "@/data";
import { Destination, Experience, SavedTrip } from "@/types";
import { saveLocalTrip } from "@/utils/storage";

const steps = ["Destination", "Dates", "Experience", "Summary"];

const TripPlanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [travelers, setTravelers] = useState(2);
  const navigate = useNavigate();

  const handleConfirmTrip = () => {
    if (!selectedDestination || !startDate || !endDate) return;

    const newTrip: SavedTrip = {
      id: Math.random().toString(36).substr(2, 9),
      destination: selectedDestination,
      experience: selectedExperience || undefined,
      startDate,
      endDate,
      status: "upcoming",
      totalCost: (selectedExperience?.price || 0) * travelers || 500,
    };

    saveLocalTrip(newTrip);
    toast.success("Trip planned successfully!", {
      description: `Your journey to ${selectedDestination.name} has been saved.`,
    });
    navigate("/dashboard");
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedDestination !== null;
    if (currentStep === 1) return startDate && endDate;
    if (currentStep === 2) return true;
    return true;
  };

  const filteredExperiences = selectedDestination
    ? experiences.filter((e) =>
        e.destination
          .toLowerCase()
          .includes(selectedDestination.name.toLowerCase())
      )
    : experiences;

  return (
    <MainLayout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <span className="badge-accent mb-6 inline-block font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest border border-primary-foreground/20">
            CRAFT YOUR ADVENTURE
          </span>
          <h1 className="text-display md:text-7xl font-bold text-primary-foreground uppercase tracking-tighter">
            Trip Planner
          </h1>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-card/80 backdrop-blur-xl border-b border-border py-10 sticky top-[72px] z-30 w-full">
        <div className="container-custom">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl font-bold transition-all duration-500 ${
                      index <= currentStep
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {index < currentStep ? <Check size={20} /> : index + 1}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest hidden sm:inline ${
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 md:mx-8 mb-6 transition-colors duration-500 ${
                      index < currentStep ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          {/* Step 1: Destination */}
          {currentStep === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-4xl font-display font-bold mb-12 text-center uppercase tracking-tight">
                Where do you want to go?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {destinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    variant="compact"
                    onClick={setSelectedDestination}
                    isSelected={selectedDestination?.id === dest.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Dates */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-4xl font-display font-bold mb-12 text-center uppercase tracking-tight">
                When are you traveling?
              </h2>
              <div className="bg-card rounded-3xl p-10 shadow-2xl shadow-foreground/5 border border-border/50 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-3 text-muted-foreground">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none font-bold text-[10px] tracking-widest uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-3 text-muted-foreground">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none font-bold text-[10px] tracking-widest uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-3 text-muted-foreground">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-6 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-accent focus:outline-none font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-4xl font-display font-bold mb-12 text-center uppercase tracking-tight">
                Choose an experience (optional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredExperiences.slice(0, 6).map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    onClick={(e) =>
                      setSelectedExperience(
                        selectedExperience?.id === e.id ? null : e
                      )
                    }
                    isSelected={selectedExperience?.id === exp.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-4xl font-display font-bold mb-12 text-center uppercase tracking-tight">
                Your Trip Summary
              </h2>
              <div className="bg-card rounded-3xl p-12 shadow-2xl shadow-foreground/5 border border-border/50 space-y-10">
                {selectedDestination && (
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <img
                      src={selectedDestination.image}
                      alt=""
                      className="w-48 h-48 rounded-3xl object-cover shadow-xl"
                    />
                    <div className="py-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                        Destination
                      </p>
                      <h3 className="text-4xl font-display font-bold uppercase tracking-tight mb-4">
                        {selectedDestination.name},{" "}
                        {selectedDestination.country.toUpperCase()}
                      </h3>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        {selectedDestination.tagline}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-border/50">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Travel Dates
                    </p>
                    <p className="font-bold text-lg">
                      {new Date(startDate).toLocaleDateString()} —{" "}
                      {new Date(endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Travelers
                    </p>
                    <p className="font-bold text-lg px-4 py-1.5 bg-secondary rounded-xl inline-block">
                      {travelers}
                    </p>
                  </div>
                </div>

                {selectedExperience && (
                  <div className="pt-10 border-t border-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                      Selected Experience
                    </p>
                    <div className="bg-secondary/50 p-6 rounded-2xl border border-accent/10">
                      <h4 className="font-bold text-xl mb-4 uppercase tracking-tight">
                        {selectedExperience.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Price per person
                        </span>
                        <span className="text-2xl font-display font-bold text-accent">
                          ${selectedExperience.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-10 border-t border-border/50">
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-xl font-bold uppercase tracking-tight">
                      Estimated Total
                    </span>
                    <span className="text-5xl font-display font-bold text-foreground">
                      $
                      {(selectedExperience?.price || 0) * travelers ||
                        "Contact Us"}
                    </span>
                  </div>
                  <button
                    onClick={handleConfirmTrip}
                    className="btn-hero w-full justify-center py-6 text-xs font-bold tracking-[0.2em]"
                  >
                    <Sparkles className="w-5 h-5" /> CONFIRM & GET QUOTE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-16 max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-border disabled:opacity-30 disabled:cursor-not-allowed font-bold text-[10px] tracking-widest uppercase hover:bg-secondary transition-all duration-500"
            >
              <ArrowLeft size={18} /> BACK
            </button>
            {currentStep < 3 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-all duration-500"
              >
                NEXT <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TripPlanner;
