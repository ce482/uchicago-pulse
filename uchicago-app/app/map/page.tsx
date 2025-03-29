"use client";

import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { diningLocations, DiningLocation } from "../../types/dining";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.7897,
  lng: -87.5997,
};

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<DiningLocation | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold my-6 text-black">
        UChicago Dining Map
      </h1>
      <div className="w-full h-[80vh] relative">
        <LoadScript googleMapsApiKey="AIzaSyAlKrahXvremjpKS-x68Bwx_3evApN97RA">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {diningLocations.map((location) => (
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
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
