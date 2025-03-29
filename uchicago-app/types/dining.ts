export interface DiningLocation {
  id: string;
  name: string;
  type: "dining" | "cafe";
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    [key: string]: string;
  };
}

export const diningLocations: DiningLocation[] = [
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
  },
  {
    id: "gordon",
    name: "Gordon Café",
    type: "cafe",
    coordinates: { lat: 41.79137565967827, lng: -87.60244741730853 },
    hours: {
      "Monday-Friday": "8:00 AM – 3:00 PM",
    },
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
  },
  {
    id: "peachs",
    name: "Peach's Café",
    type: "cafe",
    coordinates: { lat: 41.79563527357255, lng: -87.60436593702687 },
    hours: {
      "Monday-Friday": "8:30 AM – 6:00 PM",
    },
  },
  {
    id: "quantum",
    name: "Quantum Café",
    type: "cafe",
    coordinates: { lat: 41.791781572703, lng: -87.60163866543611 },
    hours: {
      "Monday-Friday": "8:00 AM – 3:00 PM",
    },
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
  },
  {
    id: "starbucks",
    name: "Starbucks @ Saieh",
    type: "cafe",
    coordinates: { lat: 41.78999971328162, lng: -87.59718146853191 },
    hours: {
      "Monday-Friday": "7:00 AM – 6:00 PM",
    },
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
  },
  {
    id: "cobb",
    name: "Cobb Coffee Shop",
    type: "cafe",
    coordinates: { lat: 41.78895250603872, lng: -87.60086568929977 },
    hours: {
      "Monday-Friday": "9:00 AM – 4:00 PM",
    },
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
  },
];
