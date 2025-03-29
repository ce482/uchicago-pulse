"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-8">
      <h1 className="text-6xl font-bold mb-4 text-black">
        Welcome to UChicago Pulse
      </h1>
      <p className="text-xl mb-16 text-gray-600">
        Your central platform for campus life
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Dining Hall Map
          </h2>
          <p className="text-gray-600">
            Check real-time occupancy at dining halls and cafes across campus
          </p>
          <Link
            href="/map"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            View Map →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-black">Campus Events</h2>
          <p className="text-gray-600">
            Discover upcoming events, parties, and social gatherings
          </p>
          <Link
            href="/events"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            View Events →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-black">Communities</h2>
          <p className="text-gray-600">
            Connect with classmates and join study groups
          </p>
          <Link
            href="/communities"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Join Communities →
          </Link>
        </div>
      </div>
    </div>
  );
}
