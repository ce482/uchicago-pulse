"use client";

import { useState, useEffect } from "react";
import {
  diningLocations,
  DiningLocation,
  BusynessLevel,
} from "../../../types/dining";

interface UserProfileProps {
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
  onRatingSubmit?: (locationId: string, rating: BusynessLevel) => void;
}

interface RatingHistory {
  locationId: string;
  locationName: string;
  rating: BusynessLevel;
  timestamp: string;
}

export default function UserProfile({
  onLocationUpdate,
  onRatingSubmit,
}: UserProfileProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<DiningLocation | null>(
    null
  );
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
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation" as PermissionName,
      });

      if (permissionStatus.state === "denied") {
        setLocationError(
          "Location access is blocked. Please enable location access in your device settings:\n" +
            "iOS: Settings > Privacy > Location Services > Safari\n" +
            "Android: Settings > Privacy > Location > Chrome"
        );
        setIsRequestingLocation(false);
        return;
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setUserLocation(location);
      onLocationUpdate?.(location);
      startLocationTracking();
      setIsRequestingLocation(false);
    } catch (error) {
      handleLocationError(error as GeolocationPositionError);
    }
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    let errorMessage = "Error getting location.";
    if (error.code === 1) {
      errorMessage =
        "Location access was denied. Please follow these steps:\n" +
        "iOS: Settings > Privacy > Location Services > Safari\n" +
        "Android: Settings > Privacy > Location > Chrome\n" +
        "Then reload the page and try again.";
    } else if (error.code === 2) {
      errorMessage =
        "Unable to determine your location. Please check that:\n" +
        "1. Your device's location is turned on\n" +
        "2. You have a clear view of the sky\n" +
        "3. You're not in airplane mode";
    } else if (error.code === 3) {
      errorMessage =
        "Location request timed out. Please check:\n" +
        "1. Your internet connection\n" +
        "2. That you're not in a building blocking GPS signals";
    }
    setLocationError(errorMessage);
    setIsRequestingLocation(false);
    console.error("Location error:", error);
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
          errorMessage =
            "Location access was denied. Please follow these steps:\n" +
            "iOS: Settings > Privacy > Location Services > Safari\n" +
            "Android: Settings > Privacy > Location > Chrome";
        } else if (error.code === 2) {
          errorMessage =
            "Unable to determine your location. Please check that:\n" +
            "1. Your device's location is turned on\n" +
            "2. You have a clear view of the sky\n" +
            "3. You're not in airplane mode";
        } else if (error.code === 3) {
          errorMessage =
            "Location request timed out. Please check:\n" +
            "1. Your internet connection\n" +
            "2. That you're not in a building blocking GPS signals";
        }
        setLocationError(errorMessage);
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Increased timeout for slower mobile connections
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };

  useEffect(() => {
    requestLocationPermission();
    return () => {
      // Cleanup will be handled by startLocationTracking's return function
    };
  }, []); // requestLocationPermission is stable and doesn't need to be in deps

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

  const handleRatingSubmit = (rating: BusynessLevel) => {
    if (currentLocation) {
      const newRating: RatingHistory = {
        locationId: currentLocation.id,
        locationName: currentLocation.name,
        rating: rating,
        timestamp: new Date().toISOString(),
      };
      setRatingHistory([newRating, ...ratingHistory]);
      onRatingSubmit?.(currentLocation.id, rating);
      setShowRatingModal(false);
    }
  };

  const getBusynessColor = (rating: BusynessLevel) => {
    switch (rating) {
      case "not busy":
        return "bg-green-500";
      case "somewhat busy":
        return "bg-yellow-500";
      case "very busy":
        return "bg-red-500";
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
                  {isRequestingLocation
                    ? "Requesting Access..."
                    : "Enable Location Access"}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  If no prompt appears, please check your browser settings by
                  clicking the lock/info icon in the address bar.
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
                  {isRequestingLocation
                    ? "Requesting location access..."
                    : "Getting your location..."}
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
                  {isRequestingLocation
                    ? "Requesting Access..."
                    : "Request Location Access"}
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
                    <span
                      className={`px-2 py-1 rounded text-xs text-white ${getBusynessColor(
                        rating.rating
                      )}`}
                    >
                      {rating.rating}
                    </span>
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
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => handleRatingSubmit("not busy")}
                className="p-4 border rounded-lg hover:bg-green-50 focus:ring-2 focus:ring-green-500 transition-colors"
              >
                <div className="text-green-500 font-semibold mb-2">
                  Not Busy
                </div>
                <div className="text-sm text-gray-600">No wait time</div>
              </button>
              <button
                onClick={() => handleRatingSubmit("somewhat busy")}
                className="p-4 border rounded-lg hover:bg-yellow-50 focus:ring-2 focus:ring-yellow-500 transition-colors"
              >
                <div className="text-yellow-500 font-semibold mb-2">
                  Somewhat Busy
                </div>
                <div className="text-sm text-gray-600">Short wait</div>
              </button>
              <button
                onClick={() => handleRatingSubmit("very busy")}
                className="p-4 border rounded-lg hover:bg-red-50 focus:ring-2 focus:ring-red-500 transition-colors"
              >
                <div className="text-red-500 font-semibold mb-2">Very Busy</div>
                <div className="text-sm text-gray-600">Long wait</div>
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
