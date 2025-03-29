"use client";

import { useState } from "react";

interface Community {
  id: string;
  name: string;
  type: "class" | "club" | "interest";
  members: number;
  description: string;
  lastActive: string;
}

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "CS 151 - Introduction to Computer Science",
    type: "class",
    members: 120,
    description: "Discussion group for CS 151 students",
    lastActive: "2 minutes ago",
  },
  {
    id: "2",
    name: "UChicago Chess Club",
    type: "club",
    members: 45,
    description: "Join us for weekly chess matches and tournaments",
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Photography Enthusiasts",
    type: "interest",
    members: 78,
    description: "Share your photos and learn from others",
    lastActive: "3 hours ago",
  },
];

export default function CommunitiesPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesType =
      selectedType === "all" || community.type === selectedType;
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Communities</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search communities..."
          className="w-full p-2 border rounded-lg mb-4 text-gray-800 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType("class")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "class"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Classes
          </button>
          <button
            onClick={() => setSelectedType("club")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "club"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Clubs
          </button>
          <button
            onClick={() => setSelectedType("interest")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "interest"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Interest Groups
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {community.name}
                </h2>
                <p className="text-gray-600 mt-1">{community.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  community.type === "class"
                    ? "bg-blue-100 text-blue-800"
                    : community.type === "club"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {community.type.charAt(0).toUpperCase() +
                  community.type.slice(1)}
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-500 flex justify-between">
              <p>👥 {community.members} members</p>
              <p>🕒 Last active {community.lastActive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
