import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, Settings, ArrowRight } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import DestinationCard from '@/components/DestinationCard';
import { userProfile, savedTrips, destinations } from '@/data';

const Dashboard: React.FC = () => {
  const savedDestinations = destinations.filter((d) => userProfile.savedDestinations.includes(d.slug));

  return (
    <MainLayout>
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={userProfile.avatar} alt={userProfile.name} className="w-24 h-24 rounded-full border-4 border-accent object-cover" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-display font-semibold text-primary-foreground mb-2">Welcome back, {userProfile.name.split(' ')[0]}!</h1>
              <p className="text-primary-foreground/70">Member since {new Date(userProfile.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="md:ml-auto flex gap-8 text-center">
              <div>
                <div className="text-3xl font-display font-bold text-accent">{userProfile.tripsCompleted}</div>
                <div className="text-primary-foreground/70 text-sm">Trips</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-accent">{userProfile.countriesVisited}</div>
                <div className="text-primary-foreground/70 text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-medium mb-6 flex items-center gap-2">
                  <Calendar className="text-accent" /> Planned Trips
                </h2>
                <div className="space-y-4">
                  {savedTrips.map((trip) => (
                    <div key={trip.id} className="bg-card rounded-2xl p-6 shadow-md flex flex-col md:flex-row gap-6">
                      <img src={trip.destination.image} alt={trip.destination.name} className="w-full md:w-40 h-32 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-display font-medium">{trip.destination.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            trip.status === 'upcoming' ? 'bg-tertiary/10 text-tertiary' :
                            trip.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {trip.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{trip.startDate} - {trip.endDate}</p>
                        {trip.experience && <p className="text-sm">{trip.experience.title}</p>}
                        <p className="text-accent font-semibold mt-2">${trip.totalCost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-medium mb-6 flex items-center gap-2">
                  <Heart className="text-accent" /> Saved Destinations
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {savedDestinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} variant="compact" />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-display font-medium mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/trip-planner" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-accent/10 transition-colors">
                    <span>Plan New Trip</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/destinations" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-accent/10 transition-colors">
                    <span>Browse Destinations</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/contact" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-accent/10 transition-colors">
                    <span>Contact Support</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent to-highlight rounded-2xl p-6 text-accent-foreground">
                <h3 className="text-lg font-display font-medium mb-2">Ready for Adventure?</h3>
                <p className="text-sm opacity-90 mb-4">Start planning your next unforgettable journey today.</p>
                <Link to="/trip-planner" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
