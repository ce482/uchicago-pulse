"use client";

import { useState, useEffect } from "react";
import { diningLocations, DiningLocation } from "../../../types/dining";

interface UserProfileProps {
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

interface RatingHistory {
  locationId: string;
  locationName: string;
  rating: number;
  timestamp: string;
}

export default function UserProfile({ onLocationUpdate }: UserProfileProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<DiningLocation | null>(
    null
  );
  const [busynessRating, setBusynessRating] = useState(50);
  const [showProfile, setShowProfile] = useState(false);
  const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const requestLocationPermission = async () => {
    setIsRequestingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsRequestingLocation(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      setUserLocation(location);
      onLocationUpdate?.(location);
      startLocationTracking();
      setIsRequestingLocation(false);
    } catch (error: any) {
      let errorMessage = "Error getting location.";
      if (error.code === 1) { // PERMISSION_DENIED
        errorMessage = "Location access was denied. Please enable location access in your browser settings and try again.";
      } else if (error.code === 2) { // POSITION_UNAVAILABLE
        errorMessage = "Location information is unavailable. Please check your device's location settings.";
      } else if (error.code === 3) { // TIMEOUT
        errorMessage = "Location request timed out. Please try again.";
      }
      setLocationError(errorMessage);
      setIsRequestingLocation(false);
      console.error("Location error:", error);
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setLocationError(null);
        onLocationUpdate?.(location);
        checkNearbyLocations(location);
      },
      (error) => {
        let errorMessage = "Error tracking location.";
        if (error.code === 1) {
          errorMessage = "Location access was denied. Please enable location access in your browser settings.";
        } else if (error.code === 2) {
          errorMessage = "Location information is unavailable.";
        } else if (error.code === 3) {
          errorMessage = "Location request timed out.";
        }
        setLocationError(errorMessage);
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };

  useEffect(() => {
    // Request location permission immediately when component mounts
    requestLocationPermission();

    // Cleanup function
    return () => {
      // The cleanup will be handled by startLocationTracking's return function
    };
  }, []); // Empty dependency array means this runs once on mount

  const checkNearbyLocations = (location: { lat: number; lng: number }) => {
    diningLocations.forEach((diningLocation) => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        diningLocation.coordinates.lat,
        diningLocation.coordinates.lng
      );

      // If user is within 50 meters of a location
      if (distance <= 0.05) {
        setCurrentLocation(diningLocation);
        setShowRatingModal(true);
      }
    });
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleRatingSubmit = () => {
    if (currentLocation) {
      const newRating: RatingHistory = {
        locationId: currentLocation.id,
        locationName: currentLocation.name,
        rating: busynessRating,
        timestamp: new Date().toISOString(),
      };
      setRatingHistory([newRating, ...ratingHistory]);
      setShowRatingModal(false);
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      {/* Profile Button */}
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {/* Profile Panel */}
      {showProfile && (
        <div className="absolute right-0 top-16 w-80 bg-white rounded-lg shadow-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-semibold">
                {userLocation ? "U" : "?"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-black">
                UChicago Student
              </h3>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-2 text-black">Your Location</h4>
            {locationError ? (
              <div className="text-sm">
                <p className="text-red-600 mb-2">{locationError}</p>
                <button
                  onClick={requestLocationPermission}
                  disabled={isRequestingLocation}
                  className={`w-full px-4 py-2 rounded text-white transition-colors ${
                    isRequestingLocation
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isRequestingLocation ? "Requesting Access..." : "Enable Location Access"}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  If no prompt appears, please check your browser settings by clicking the lock/info icon in the address bar.
                </p>
              </div>
            ) : userLocation ? (
              <div className="text-sm text-gray-600">
                <p>Latitude: {userLocation.lat.toFixed(6)}</p>
                <p>Longitude: {userLocation.lng.toFixed(6)}</p>
              </div>
            ) : (
              <div className="text-sm">
                <p className="text-gray-600 mb-2">
                  {isRequestingLocation ? "Requesting location access..." : "Getting your location..."}
                </p>
                <button
                  onClick={requestLocationPermission}
                  disabled={isRequestingLocation}
                  className={`w-full px-4 py-2 rounded text-white transition-colors ${
                    isRequestingLocation
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isRequestingLocation ? "Requesting Access..." : "Request Location Access"}
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-semibold mb-2 text-black">Recent Ratings</h4>
            {ratingHistory.length > 0 ? (
              <div className="space-y-3">
                {ratingHistory.map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {rating.locationName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(rating.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${rating.rating}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No ratings yet</p>
            )}
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && currentLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              How busy is {currentLocation.name}?
            </h3>
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={busynessRating}
                onChange={(e) => setBusynessRating(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Not Busy</span>
                <span>Very Busy</span>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
