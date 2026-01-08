import { SavedTrip, UserProfile } from '@/types';
import { savedTrips as initialTrips, userProfile as initialProfile } from '@/data';

const TRIPS_KEY = 'wanderlust_trips';
const PROFILE_KEY = 'wanderlust_profile';

export const getLocalTrips = (): SavedTrip[] => {
    const stored = localStorage.getItem(TRIPS_KEY);
    if (!stored) {
        // Initialize with default data if empty
        localStorage.setItem(TRIPS_KEY, JSON.stringify(initialTrips));
        return initialTrips;
    }
    return JSON.parse(stored);
};

export const saveLocalTrip = (trip: SavedTrip) => {
    const trips = getLocalTrips();
    const updatedTrips = [trip, ...trips];
    localStorage.setItem(TRIPS_KEY, JSON.stringify(updatedTrips));
};

export const getLocalProfile = (): UserProfile => {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(initialProfile));
        return initialProfile;
    }
    return JSON.parse(stored);
};

export const updateLocalProfile = (profile: Partial<UserProfile>) => {
    const current = getLocalProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
};
