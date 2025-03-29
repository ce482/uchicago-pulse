"use client";

import DiningMap from "../components/Map/DiningMap";
import UserProfile from "../components/UserProfile/UserProfile";

export default function MapPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold my-6 text-black">
        UChicago Dining Map
      </h1>
      <DiningMap />
      <UserProfile />
    </div>
  );
}
