export const diningLocations = [
  // Dining Commons
  {
    id: "baker",
    name: "Baker Dining Commons",
    type: "dining",
    coordinates: { lat: 41.7897, lng: -87.5997 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 2:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyLevel: 75,
  },
  {
    id: "bartlett",
    name: "Bartlett Dining Commons",
    type: "dining",
    coordinates: { lat: 41.7895, lng: -87.6002 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 8:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyLevel: 65,
  },
  {
    id: "cathey",
    name: "Cathey Dining Commons",
    type: "dining",
    coordinates: { lat: 41.7893, lng: -87.6005 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 2:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyLevel: 70,
  },
  {
    id: "woodlawn",
    name: "Woodlawn Dining Commons",
    type: "dining",
    coordinates: { lat: 41.789, lng: -87.6008 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 8:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyLevel: 60,
  },

  // Cafes
  {
    id: "cafe-logan",
    name: "Café Logan",
    type: "cafe",
    coordinates: { lat: 41.7892, lng: -87.601 },
    hours: {
      "Monday-Friday": "8:00 AM – 8:00 PM",
      Saturday: "12:00 PM – 6:00 PM",
      Sunday: "12:00 PM – 4:00 PM",
    },
    busyLevel: 45,
  },
  // ... rest of the locations remain the same
];
