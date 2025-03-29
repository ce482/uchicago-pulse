"use client";

import { useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "frat" | "academic" | "social";
  description: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Alpha Delta Phi Social",
    date: "2024-03-30",
    time: "9:00 PM",
    location: "Alpha Delta Phi House",
    type: "social",
    description: "Join us for a night of fun and socializing!",
  },
  {
    id: "2",
    title: "Computer Science Study Group",
    date: "2024-03-31",
    time: "2:00 PM",
    location: "Regenstein Library",
    type: "academic",
    description: "Weekly study group for CS majors",
  },
  // Add more mock events as needed
];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredEvents =
    selectedType === "all"
      ? mockEvents
      : mockEvents.filter((event) => event.type === selectedType);

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        Campus Events
      </h1>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-full text-sm sm:text-base ${
              selectedType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedType("academic")}
            className={`px-4 py-2 rounded-full text-sm sm:text-base ${
              selectedType === "academic"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Academic
          </button>
          <button
            onClick={() => setSelectedType("social")}
            className={`px-4 py-2 rounded-full text-sm sm:text-base ${
              selectedType === "social"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Social
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  event.type === "academic"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>📅 {event.date}</p>
              <p>🕒 {event.time}</p>
              <p>📍 {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
