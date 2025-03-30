"use client";

import Link from "next/link";
import { usePlatform } from "./hooks/usePlatform";

export default function Home() {
  const { isMobile } = usePlatform();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black px-2 py-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-black text-center">
        Welcome to UChicago Pulse
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-gray-600 text-center max-w-3xl">
        Your central platform for campus life
      </p>

      {/* Adjust spacing to move the grid closer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black">
            Dining Hall Map
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Check real-time occupancy at dining halls and cafes across campus
          </p>
          <Link
            href="/map"
            className="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            View Map →
          </Link>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black">
            Campus Events
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Discover upcoming events, parties, and social gatherings
          </p>
          <Link
            href="/events"
            className="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            View Events →
          </Link>
        </div>
      </div>
    </div>
  );
}
