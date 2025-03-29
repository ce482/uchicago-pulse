import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { diningLocations, DiningLocation } from "../../../types/dining";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.7897,
  lng: -87.5997,
};

const libraries = ["places"];

export default function DiningMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAlKrahXvremjpKS-x68Bwx_3evApN97RA",
    libraries: libraries as any,
  });

  const [selectedLocation, setSelectedLocation] =
    useState<DiningLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(diningLocations);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const filtered = diningLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Bar */}
      <div className="w-full max-w-2xl px-4 mb-4">
        <input
          type="text"
          placeholder="Search for dining locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        />
        <div className="mt-2 text-sm text-gray-600">
          Found {filteredLocations.length} location
          {filteredLocations.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="w-full h-[80vh] relative">
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
              >
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-bold text-black mb-2">
                    {selectedLocation.name}
                  </h2>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-black mb-1">
                      Hours:
                    </h3>
                    {Object.entries(selectedLocation.hours).map(
                      ([day, hours]) => (
                        <p key={day} className="text-gray-700">
                          <span className="font-medium">{day}:</span> {hours}
                        </p>
                      )
                    )}
                  </div>
                  {selectedLocation.busyness && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-black mb-1">
                        Current Busyness:
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${selectedLocation.busyness.current}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedLocation.busyness.current}% busy
                        {selectedLocation.busyness.totalRatings > 0 &&
                          ` (based on ${selectedLocation.busyness.totalRatings} ratings)`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last updated: {selectedLocation.busyness.lastUpdated}
                      </p>
                    </div>
                  )}
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
