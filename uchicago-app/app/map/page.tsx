"use client";

import DiningMap from "../components/Map/DiningMap";
import UserProfile from "../components/UserProfile/UserProfile";

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold my-4 sm:my-6 text-black px-4 sm:px-6">
        UChicago Dining Map
      </h1>
      <DiningMap />
      <UserProfile />
    </div>
  );
}
