import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Heart, Settings, ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data";
import { getLocalTrips, getLocalProfile } from "@/utils/storage";

const Dashboard: React.FC = () => {
  const profile = getLocalProfile();
  const trips = getLocalTrips();
  const savedDestinations = destinations.filter((d) =>
    profile.savedDestinations.includes(d.slug)
  );

  return (
    <MainLayout>
      <section className="bg-primary py-24 w-full">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-accent/20 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full border-4 border-primary flex items-center justify-center text-accent-foreground">
                <Settings size={16} />
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3 block">
                TRAVELER PROFILE
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-3 uppercase tracking-tight">
                Welcome back, {profile.name.split(" ")[0]}!
              </h1>
              <p className="text-primary-foreground/60 font-medium">
                Member since{" "}
                {new Date(profile.memberSince)
                  .toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                  .toUpperCase()}
              </p>
            </div>
            <div className="md:ml-auto flex gap-12 text-center md:text-right">
              <div>
                <div className="text-5xl font-display font-bold text-accent mb-1">
                  {profile.tripsCompleted}
                </div>
                <div className="text-primary-foreground/50 text-[10px] font-bold uppercase tracking-widest">
                  Trips
                </div>
              </div>
              <div className="w-px h-16 bg-primary-foreground/10 hidden md:block" />
              <div>
                <div className="text-5xl font-display font-bold text-accent mb-1">
                  {profile.countriesVisited}
                </div>
                <div className="text-primary-foreground/50 text-[10px] font-bold uppercase tracking-widest">
                  Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background w-full">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-4 uppercase tracking-tight">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Calendar className="text-accent" size={20} />
                  </div>{" "}
                  Planned Trips
                </h2>
                <div className="space-y-6">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="group bg-card rounded-3xl p-6 md:p-8 shadow-xl shadow-foreground/5 border border-border/50 hover:border-accent/30 transition-all duration-500 flex flex-col md:flex-row gap-8"
                    >
                      <div className="relative w-full md:w-48 h-40 overflow-hidden rounded-2xl">
                        <img
                          src={trip.destination.image}
                          alt={trip.destination.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="flex-1 py-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                            {trip.destination.name}
                          </h3>
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              trip.status === "upcoming"
                                ? "bg-tertiary/10 text-tertiary border border-tertiary/20"
                                : trip.status === "completed"
                                ? "bg-muted text-muted-foreground border border-muted-foreground/20"
                                : "bg-destructive/10 text-destructive border border-destructive/20"
                            }`}
                          >
                            {trip.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Calendar size={12} className="text-accent" />{" "}
                          {trip.startDate} - {trip.endDate}
                        </p>
                        {trip.experience && (
                          <div className="bg-secondary/50 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide inline-block mb-4 border border-border/50">
                            {trip.experience.title}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-4 border-t border-border/50 pt-6">
                          <p className="text-2xl font-display font-bold text-foreground">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2">
                              Est. Cost
                            </span>
                            ${trip.totalCost}
                          </p>
                          <button className="flex items-center gap-3 text-accent text-[10px] font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                            DETAILS <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-4 uppercase tracking-tight">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Heart className="text-accent" size={20} />
                  </div>{" "}
                  Saved Destinations
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {savedDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-3xl p-8 shadow-xl shadow-foreground/5 border border-border/50">
                <h3 className="text-xl font-display font-bold mb-6 uppercase tracking-tight">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Link
                    to="/trip-planner"
                    className="group flex items-center justify-between p-5 rounded-2xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Plan New Trip
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                  <Link
                    to="/destinations"
                    className="group flex items-center justify-between p-5 rounded-2xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Browse Destinations
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                  <Link
                    to="/contact"
                    className="group flex items-center justify-between p-5 rounded-2xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Contact Support
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="relative bg-primary rounded-3xl p-10 text-primary-foreground overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-accent/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">
                    Ready for Adventure?
                  </h3>
                  <p className="text-sm opacity-70 mb-8 font-medium leading-relaxed">
                    Your next dream journey is just a few clicks away. Start
                    exploring now.
                  </p>
                  <Link
                    to="/trip-planner"
                    className="inline-flex items-center gap-4 bg-accent text-accent-foreground px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                  >
                    GET STARTED <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
