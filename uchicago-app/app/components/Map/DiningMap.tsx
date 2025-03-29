"use client";

import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Libraries } from "@googlemaps/js-api-loader";
import {
  diningLocations,
  DiningLocation,
  BusynessLevel,
} from "../../../types/dining";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.7897,
  lng: -87.5997,
};

const libraries: Libraries = ["places"];

export default function DiningMap() {
  const handleError = (error: Error) => {
    console.error("Error loading map:", error);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [selectedLocation, setSelectedLocation] =
    useState<DiningLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(diningLocations);

  useEffect(() => {
    const filtered = diningLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const onLoad = (map: google.maps.Map) => {
    // Remove unused map variable if not needed
  };

  const onUnmount = () => {
    // Remove unused map variable if not needed
  };

  const getBusynessLevel = (location: DiningLocation): BusynessLevel | null => {
    if (!location.busyness) return null;

    const { notBusyCount, somewhatBusyCount, veryBusyCount } =
      location.busyness;
    const total = notBusyCount + somewhatBusyCount + veryBusyCount;

    if (total === 0) return null;

    // Find the highest count
    const max = Math.max(notBusyCount, somewhatBusyCount, veryBusyCount);

    if (max === notBusyCount) return "not busy";
    if (max === somewhatBusyCount) return "somewhat busy";
    return "very busy";
  };

  const getBusynessColor = (level: BusynessLevel | null) => {
    switch (level) {
      case "not busy":
        return "text-green-500";
      case "somewhat busy":
        return "text-yellow-500";
      case "very busy":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const formatBusynessStats = (location: DiningLocation): string => {
    if (!location.busyness) return "No ratings yet";

    const { notBusyCount, somewhatBusyCount, veryBusyCount } =
      location.busyness;
    const total = notBusyCount + somewhatBusyCount + veryBusyCount;

    return `${total} rating${total !== 1 ? "s" : ""}`;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Bar - Made more compact on mobile */}
      <div className="w-full px-2 sm:px-4 mb-2 sm:mb-4">
        <input
          type="text"
          placeholder="Search for dining locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
          Found {filteredLocations.length} location
          {filteredLocations.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Map Container - Adjusted height for mobile */}
      <div className="w-full h-[70vh] sm:h-[80vh] relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                onClick={() => setSelectedLocation(location)}
              />
            ))}

            {selectedLocation && (
              <InfoWindow
                position={selectedLocation.coordinates}
                onCloseClick={() => setSelectedLocation(null)}
                options={{
                  pixelOffset: new google.maps.Size(0, -30),
                  maxWidth: window.innerWidth < 640 ? 260 : 320, // Smaller width on mobile
                  minWidth: window.innerWidth < 640 ? 220 : 280,
                }}
              >
                <div className="p-0 bg-white max-w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-black px-2 pt-1">
                    {selectedLocation.name}
                  </h2>

                  {/* Busyness Status - Compact on mobile */}
                  <div className="px-2 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                      Current Status:
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <span
                        className={`text-base sm:text-lg font-medium ${getBusynessColor(
                          getBusynessLevel(selectedLocation)
                        )}`}
                      >
                        {getBusynessLevel(selectedLocation) || "No data"}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {formatBusynessStats(selectedLocation)}
                      </span>
                    </div>
                    {selectedLocation.busyness?.lastUpdated && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated:{" "}
                        {new Date(
                          selectedLocation.busyness.lastUpdated
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Hours - Compact on mobile */}
                  <div className="px-2 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                      Hours:
                    </h3>
                    {Object.entries(selectedLocation.hours).map(
                      ([day, hours]) => (
                        <p
                          key={day}
                          className="text-sm sm:text-base text-gray-700"
                        >
                          <span className="font-medium">{day}:</span> {hours}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-black">Loading map...</div>
          </div>
        )}
      </div>
    </div>
  );
}
