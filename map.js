// ...existing code...

// Initialize the map
const map = L.map("map").setView([41.791, -87.599], 15); // Centered around UChicago

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add markers with popups
const locations = [
  {
    name: "Baker Dining Commons",
    coords: [41.79484571708271, -87.59908567675234],
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
    busyness: "very busy",
  },
  {
    name: "Bartlett Dining Commons",
    coords: [41.792131851073485, -87.59824251722922],
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 8:30 PM\nSunday: 8:00 AM – 8:30 PM",
    busyness: "somewhat busy",
  },
  {
    name: "Cathey Dining Commons",
    coords: [41.785463993599784, -87.60010858996223],
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
    busyness: "somewhat busy",
  },
  {
    name: "Woodlawn Dining Commons",
    coords: [41.78491217087956, -87.59721649209658],
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 8:30 PM\nSunday: 8:00 AM – 8:30 PM",
    busyness: "not busy",
  },
  {
    name: "Café Logan",
    coords: [41.78588256797862, -87.60343551545964],
    hours:
      "Monday to Friday: 8:00 AM – 8:00 PM\nSaturday: 12:00 PM – 6:00 PM\nSunday: 12:00 PM – 4:00 PM",
    busyness: "not busy",
  },
  {
    name: "Pret A Manger",
    coords: [41.79474694143852, -87.59734477633121],
    hours:
      "Monday to Friday: 8:00 AM – 11:00 PM\nSaturday to Sunday: 9:00 AM – 11:00 PM",
    busyness: "very busy",
  },
  {
    name: "Peach's Café",
    coords: [41.79563527357255, -87.60436593702687],
    hours: "Monday to Friday: 8:30 AM – 6:00 PM",
    busyness: "not busy",
  },
  {
    name: "Starbucks @ Saieh",
    coords: [41.78999971328162, -87.59718146853191],
    hours: "Monday to Friday: 7:00 AM – 6:00 PM",
    busyness: "somewhat busy",
  },
  {
    name: "Ex-Libris Café",
    coords: [41.79213644602098, -87.59999002922112],
    hours:
      "Monday to Thursday: 9:00 AM – 10:30 PM\nFriday: 9:00 AM – 5:00 PM\nSaturday: 11:00 AM – 5:00 PM\nSunday: 11:00 AM – 10:30 PM",
    busyness: "very busy",
  },
  {
    name: "Hallowed Grounds",
    coords: [41.79130615162927, -87.59832520314384],
    hours:
      "Monday to Tuesday: 9:00 AM – 6:00 PM\nWednesday to Thursday: 9:00 AM – 9:00 PM\nFriday: 9:00 AM – 8:00 PM\nSaturday: 12:00 PM – 5:30 PM\nSunday: 12:00 PM – 9:00 PM",
    busyness: "somewhat busy",
  },
  // Add more locations as needed
];

locations.forEach((location) => {
  const popupHTML = `
        <b>${location.name}</b><br>
        ${location.hours.replace(/\n/g, "<br>")}
        ${location.busyness ? `<br><b>Busyness:</b> ${location.busyness}` : ""}
    `;

  L.marker(location.coords).addTo(map).bindPopup(popupHTML);
});
