export type DiningLocationType = "dining" | "cafe";
export type BusynessLevel = "not busy" | "somewhat busy" | "very busy";

export interface DiningLocation {
  id: string;
  name: string;
  type: DiningLocationType;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    [key: string]: string;
  };
  busyness?: {
    notBusyCount: number;
    somewhatBusyCount: number;
    veryBusyCount: number;
    lastUpdated: string;
  };
  radius?: number; // in meters, for geofencing
}

export let diningLocations: DiningLocation[] = [
  // Dining Commons
  {
    id: "baker",
    name: "Baker Dining Commons",
    type: "dining",
    coordinates: { lat: 41.79484571708271, lng: -87.59908567675234 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 2:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyness: {
      notBusyCount: 10,
      somewhatBusyCount: 20,
      veryBusyCount: 30,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 50,
  },
  {
    id: "cathey",
    name: "Cathey Dining Commons",
    type: "dining",
    coordinates: { lat: 41.785463993599784, lng: -87.60010858996223 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 2:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyness: {
      notBusyCount: 15,
      somewhatBusyCount: 25,
      veryBusyCount: 10,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 50,
  },
  {
    id: "bartlett",
    name: "Bartlett Dining Commons",
    type: "dining",
    coordinates: { lat: 41.792131851073485, lng: -87.59824251722922 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 8:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyness: {
      notBusyCount: 30,
      somewhatBusyCount: 18,
      veryBusyCount: 12,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 50,
  },
  {
    id: "woodlawn",
    name: "Woodlawn Dining Commons",
    type: "dining",
    coordinates: { lat: 41.78491217087956, lng: -87.59721649209658 },
    hours: {
      "Monday-Friday": "7:00 AM – 8:30 PM",
      Saturday: "8:00 AM – 8:30 PM",
      Sunday: "8:00 AM – 8:30 PM",
    },
    busyness: {
      notBusyCount: 12,
      somewhatBusyCount: 22,
      veryBusyCount: 7,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 50,
  },

  // Cafes
  {
    id: "cafe-logan",
    name: "Café Logan",
    type: "cafe",
    coordinates: { lat: 41.78588256797862, lng: -87.60343551545964 },
    hours: {
      "Monday-Friday": "8:00 AM – 8:00 PM",
      Saturday: "12:00 PM – 6:00 PM",
      Sunday: "12:00 PM – 4:00 PM",
    },
    busyness: {
      notBusyCount: 20,
      somewhatBusyCount: 10,
      veryBusyCount: 3,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "gordon",
    name: "Gordon Café",
    type: "cafe",
    coordinates: { lat: 41.79137565967827, lng: -87.60244741730853 },
    hours: {
      "Monday-Friday": "8:00 AM – 3:00 PM",
    },
    busyness: {
      notBusyCount: 3,
      somewhatBusyCount: 7,
      veryBusyCount: 2,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "harris",
    name: "Harris Café",
    type: "cafe",
    coordinates: { lat: 41.785904068830064, lng: -87.59432983265123 },
    hours: {
      "Monday-Thursday": "8:00 AM – 4:00 PM",
      Friday: "8:00 AM – 2:30 PM",
    },
    busyness: {
      notBusyCount: 10,
      somewhatBusyCount: 8,
      veryBusyCount: 2,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "hutchinson",
    name: "Hutchinson Commons",
    type: "cafe",
    coordinates: { lat: 41.79107774933602, lng: -87.59888110566445 },
    hours: {
      "Monday-Thursday": "11:00 AM – 8:00 PM",
      Friday: "11:00 AM – 3:00 PM",
      Saturday: "11:00 AM – 4:00 PM",
    },
    busyness: {
      notBusyCount: 6,
      somewhatBusyCount: 12,
      veryBusyCount: 30,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "peaches",
    name: "Peaches",
    type: "cafe",
    coordinates: { lat: 41.791065292061596, lng: -87.60267307937721 },
    hours: {
      "Monday-Friday": "8:00 AM - 4:00 PM",
      Saturday: "Closed",
      Sunday: "Closed",
    },
    busyness: {
      notBusyCount: 10,
      somewhatBusyCount: 5,
      veryBusyCount: 1,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "quantum",
    name: "Quantum Café",
    type: "cafe",
    coordinates: { lat: 41.791781572703, lng: -87.60163866543611 },
    hours: {
      "Monday-Friday": "8:00 AM – 3:00 PM",
    },
    busyness: {
      notBusyCount: 5,
      somewhatBusyCount: 4,
      veryBusyCount: 1,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "pret",
    name: "Pret A Manger",
    type: "cafe",
    coordinates: { lat: 41.79112949595983, lng: -87.59822996457885 },
    hours: {
      "Monday-Friday": "8:00 AM – 11:00 PM",
      "Saturday-Sunday": "9:00 AM – 11:00 PM",
    },
    busyness: {
      notBusyCount: 10,
      somewhatBusyCount: 15,
      veryBusyCount: 20,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "starbucks",
    name: "Starbucks @ Saieh",
    type: "cafe",
    coordinates: { lat: 41.78999971328162, lng: -87.59718146853191 },
    hours: {
      "Monday-Friday": "7:00 AM – 6:00 PM",
    },
    busyness: {
      notBusyCount: 8,
      somewhatBusyCount: 12,
      veryBusyCount: 20,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "french-press",
    name: "Chicago French Press",
    type: "cafe",
    coordinates: { lat: 41.79074098949526, lng: -87.60144919213627 },
    hours: {
      "Monday-Friday": "8:00 AM – 6:00 PM",
      "Saturday-Sunday": "9:00 AM – 6:00 PM",
    },
    busyness: {
      notBusyCount: 11,
      somewhatBusyCount: 10,
      veryBusyCount: 2,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "cobb",
    name: "Cobb Coffee Shop",
    type: "cafe",
    coordinates: { lat: 41.78895250603872, lng: -87.60086568929977 },
    hours: {
      "Monday-Friday": "9:00 AM – 4:00 PM",
    },
    busyness: {
      notBusyCount: 4,
      somewhatBusyCount: 6,
      veryBusyCount: 1,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "ex-libris",
    name: "Ex-Libris Café",
    type: "cafe",
    coordinates: { lat: 41.79213644602098, lng: -87.59999002922112 },
    hours: {
      "Monday-Thursday": "9:00 AM – 10:30 PM",
      Friday: "9:00 AM – 5:00 PM",
      Saturday: "11:00 AM – 5:00 PM",
      Sunday: "11:00 AM – 10:30 PM",
    },
    busyness: {
      notBusyCount: 6,
      somewhatBusyCount: 9,
      veryBusyCount: 10,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "harper",
    name: "Harper Café",
    type: "cafe",
    coordinates: { lat: 41.787976077347636, lng: -87.59959761100839 },
    hours: {
      "Monday-Thursday": "9:00 AM – 6:00 PM",
      Friday: "8:30 AM – 5:00 PM",
      Saturday: "Closed",
      Sunday: "12:00 PM – 5:00 PM",
    },
    busyness: {
      notBusyCount: 5,
      somewhatBusyCount: 8,
      veryBusyCount: 2,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
  {
    id: "hallowed-grounds",
    name: "Hallowed Grounds",
    type: "cafe",
    coordinates: { lat: 41.79130615162927, lng: -87.59832520314384 },
    hours: {
      "Monday-Tuesday": "9:00 AM – 6:00 PM",
      "Wednesday-Thursday": "9:00 AM – 9:00 PM",
      Friday: "9:00 AM – 8:00 PM",
      Saturday: "12:00 PM – 5:30 PM",
      Sunday: "12:00 PM – 9:00 PM",
    },
    busyness: {
      notBusyCount: 4,
      somewhatBusyCount: 7,
      veryBusyCount: 2,
      lastUpdated: "2023-10-01T12:00:00Z",
    },
    radius: 30,
  },
];

/**
 * Calculates the busyness level for a dining location based on its busyness data.
 * @param busyness - The busyness data of the dining location.
 * @returns The busyness level as a string ("not busy", "somewhat busy", "very busy") or "unknown" if data is missing.
 */
export function getBusynessLevel(busyness?: {
  notBusyCount: number;
  somewhatBusyCount: number;
  veryBusyCount: number;
}): BusynessLevel | "unknown" {
  if (!busyness) return "unknown";

  const { notBusyCount, somewhatBusyCount, veryBusyCount } = busyness;
  const maxCount = Math.max(notBusyCount, somewhatBusyCount, veryBusyCount);

  if (maxCount === notBusyCount) return "not busy";
  if (maxCount === somewhatBusyCount) return "somewhat busy";
  if (maxCount === veryBusyCount) return "very busy";

  return "unknown";
}

/**
 * Logs the busyness level for all dining locations with a visual busy meter.
 */
export function displayBusyMeter() {
  diningLocations.forEach((location) => {
    const busynessLevel = getBusynessLevel(location.busyness);
    const meter = createBusyMeter(location.busyness);
    console.log(
      `${location.name} (${location.type}): ${busynessLevel} ${meter}`
    );
  });
}

/**
 * Creates a visual busy meter based on the busyness data.
 * @param busyness - The busyness data of the dining location.
 * @returns A string representing the busy meter (e.g., "███░░").
 */
function createBusyMeter(busyness?: {
  notBusyCount: number;
  somewhatBusyCount: number;
  veryBusyCount: number;
}): string {
  if (!busyness) return "░░░░░"; // Default empty meter if no data is available.

  const total =
    busyness.notBusyCount + busyness.somewhatBusyCount + busyness.veryBusyCount;
  if (total === 0) return "░░░░░"; // Default empty meter if total is zero.

  const notBusyRatio = Math.round((busyness.notBusyCount / total) * 5);
  const somewhatBusyRatio = Math.round(
    (busyness.somewhatBusyCount / total) * 5
  );
  const veryBusyRatio = Math.round((busyness.veryBusyCount / total) * 5);

  return (
    "█".repeat(notBusyRatio) + // Filled blocks for "not busy"
    "▒".repeat(somewhatBusyRatio) + // Medium blocks for "somewhat busy"
    "░".repeat(veryBusyRatio)
  ) // Light blocks for "very busy"
    .padEnd(5, "░"); // Ensure the meter is always 5 characters long.
}

/**
 * Returns the busyness level and visual busy meter for a dining location.
 * @param location - The dining location.
 * @returns An object containing the busyness level and visual busy meter.
 */
export function getBusyMeterForLocation(location: DiningLocation): {
  level: BusynessLevel | "unknown";
  meter: string;
} {
  const level = getBusynessLevel(location.busyness);
  const meter = createBusyMeter(location.busyness);
  return { level, meter };
}

// Automatically display the busy meter when this module is loaded.
displayBusyMeter();
