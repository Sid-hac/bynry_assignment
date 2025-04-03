"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const initialProfiles = [
  {
    id: 1,
    name: "Jane Smith",
    photo: "/profile.jpeg",
    description: "Software Engineer with 5 years of experience in React development",
    city: "San Francisco",
  },
  {
    id: 2,
    name: "John Doe",
    photo: "/profile.jpeg",
    description: "Marketing Expert at ABC Corp.",
    city: "Los Angeles",
  },
];

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [newProfile, setNewProfile] = useState({ name: "", description: "", city: "", photo: "" });
  const router = useRouter();

  const handleAddProfile = () => {
    if (!newProfile.name || !newProfile.description || !newProfile.city) return;
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1, photo: "/profile.jpeg" }]);
    setNewProfile({ name: "", description: "", city: "", photo: "" });
  };

interface Profile {
    id: number;
    name: string;
    photo: string;
    description: string;
    city: string;
}

const handleDeleteProfile = (id: number): void => {
    setProfiles(profiles.filter((profile: Profile) => profile.id !== id));
};

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Profile Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New Profile</h2>
        <input className="w-full mb-2 p-2 bg-gray-700 rounded" type="text" placeholder="Name" value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} />
        <input className="w-full mb-2 p-2 bg-gray-700 rounded" type="text" placeholder="Description" value={newProfile.description} onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })} />
        <input className="w-full mb-2 p-2 bg-gray-700 rounded" type="text" placeholder="City" value={newProfile.city} onChange={(e) => setNewProfile({ ...newProfile, city: e.target.value })} />
        <button onClick={handleAddProfile} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Add Profile</button>
      </div>

      {/* Profiles List */}
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={profile.photo} alt={profile.name} width={50} height={50} className="rounded-md" />
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-gray-400">{profile.description}</p>
                <p className="text-gray-500">{profile.city}</p>
              </div>
            </div>
            <div>
              <button onClick={() => router.push(`/profile/${profile.id}`)} className="bg-green-600 px-3 py-2 rounded mr-2">View</button>
              <button onClick={() => handleDeleteProfile(profile.id)} className="bg-red-600 px-3 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
