import { diningLocations, getBusynessLevel, createBusyMeter } from "../types/dining";

function initializeMap() {
  // Assume this function initializes your map and returns the map instance.
}

function createMarker(coordinates: { lat: number; lng: number }, options: { title: string }) {
  // Assume this function creates a marker and returns the marker instance.
  const marker = {
    bindPopup: (content: string) => {
      console.log(`Popup bound with content: ${content}`);
    },
    addTo: (map: any) => {
      console.log(`Marker added to map: ${map}`);
    },
  };
  return marker; // Return the marker instance.
}

function renderMap() {
  const map = initializeMap(); // Assume this initializes your map.

  diningLocations.forEach((location) => {
    const busynessLevel = getBusynessLevel(location.busyness);
    const meter = createBusyMeter(location.busyness);

    // Create a marker for the location.
    const marker = createMarker(location.coordinates, {
      title: location.name,
    });

    // Add a popup or label to the marker with the busy meter.
    const popupContent = `
      <div>
        <h3>${location.name}</h3>
        <p>Type: ${location.type}</p>
        <p>Busyness: ${busynessLevel}</p>
        <p>Busy Meter: <span style="font-family: monospace;">${meter}</span></p>
      </div>
    `;
    marker.bindPopup(popupContent); // Assume bindPopup adds a popup to the marker.

    // Add the marker to the map.
    marker.addTo(map);
  });
}

renderMap();