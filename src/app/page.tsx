"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix marker icon issue
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const profiles = [
  {
    id: 1,
    name: "Jane Smith",
    photo: "/profile.jpeg",
    description: "Software Engineer with 5 years of experience in React development",
    address: {
      street: "123 Tech Avenue",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      lat: 37.7749,
      lng: -122.4194
    },
    contact: {
      email: "jane.smith@example.com",
      phone: "(415) 555-1234"
    },
    interests: ["Hiking", "Photography", "Web Development"]
  },
  {
    id: 2,
    name: "John Doe",
    photo: "/profile.jpeg",
    description: "Marketing Expert at ABC Corp.",
    address: {
      street: "456 Market Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      lat: 34.0522,
      lng: -118.2437
    },
    contact: {
      email: "john.doe@example.com",
      phone: "(323) 555-5678"
    },
    interests: ["Traveling", "Music", "Digital Marketing"]
  }
];

const ProfileList = () => {
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Panel - Profiles */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Profiles</h1>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setSelectedProfile(profile)}
            >
              <Image
                src={profile.photo}
                alt={profile.name}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-gray-400">{profile.description}</p>
                <p className="text-gray-500 mt-2">{profile.address.city}, {profile.address.state}</p>
              </div>
              <button
                className="bg-blue-600 px-3 py-2 rounded-md text-white hover:bg-blue-700 cursor-po"
              >
                <Link href={`/profile/${profile.id}`} >
                  View Summary
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-1/2 h-full">
        <MapContainer
          center={selectedProfile ? [selectedProfile.address.lat, selectedProfile.address.lng] : [37.7749, -122.4194]}
          zoom={selectedProfile ? 10 : 5}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {profiles.map((profile) => (
            <Marker key={profile.id} position={[profile.address.lat, profile.address.lng]} icon={customIcon}>
              <Popup>
                <strong>{profile.name}</strong><br />
                {profile.address.city}, {profile.address.state}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ProfileList;
