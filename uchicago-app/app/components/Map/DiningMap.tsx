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
import { usePlatform } from "../../hooks/usePlatform";
import { getPlatformStyles } from "../../styles/platform";

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
  const { platform, isMobile } = usePlatform();
  const platformStyles = getPlatformStyles(platform);

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
        return "text-green-600";
      case "somewhat busy":
        return "text-yellow-600";
      case "very busy":
        return "text-red-600";
      default:
        return "text-gray-600";
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
      {/* Search Bar */}
      <div
        className={`w-full px-${isMobile ? "2" : "4"} mb-${
          isMobile ? "2" : "4"
        }`}
      >
        <input
          type="text"
          placeholder="Search for dining locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black
            ${isMobile ? "p-2 text-sm" : "p-3 text-base"}`}
          style={platformStyles.input}
        />
        <div
          className={`mt-${isMobile ? "1" : "2"} text-${
            isMobile ? "xs" : "sm"
          } text-gray-600`}
        >
          Found {filteredLocations.length} location
          {filteredLocations.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ ...platformStyles.map, width: "100%" }}>
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
                  maxWidth: isMobile ? 300 : 320,
                  minWidth: isMobile ? 280 : 300,
                }}
              >
                <div
                  className="bg-white w-full overflow-y-auto"
                  style={{
                    ...platformStyles.modal,
                    maxHeight: isMobile ? "60vh" : "70vh",
                  }}
                >
                  <h2
                    className={`font-bold text-black mb-2 ${
                      isMobile ? "text-lg" : "text-xl"
                    }`}
                  >
                    {selectedLocation.name}
                  </h2>

                  {/* Busyness Status */}
                  <div className="mb-3">
                    <h3
                      className={`font-semibold text-black mb-1 ${
                        isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      Current Status:
                    </h3>
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`${
                          isMobile ? "text-sm" : "text-base"
                        } font-medium ${getBusynessColor(
                          getBusynessLevel(selectedLocation)
                        )}`}
                      >
                        {getBusynessLevel(selectedLocation) || "No data"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatBusynessStats(selectedLocation)}
                      </span>
                      {selectedLocation.busyness?.lastUpdated && (
                        <p className="text-xs text-gray-500">
                          Last updated:{" "}
                          {new Date(
                            selectedLocation.busyness.lastUpdated
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3
                      className={`font-semibold text-black mb-1 ${
                        isMobile ? "text-sm" : "text-base"
                      }`}
                    >
                      Hours:
                    </h3>
                    <div className="space-y-1">
                      {Object.entries(selectedLocation.hours).map(
                        ([day, hours]) => (
                          <p
                            key={day}
                            className="text-xs sm:text-sm text-gray-700"
                          >
                            <span className="font-medium">{day}:</span> {hours}
                          </p>
                        )
                      )}
                    </div>
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
