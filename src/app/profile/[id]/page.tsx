"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import profiles from "../../../../profiles.json"


const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function ProfileDetail() {
  const { id } = useParams();
  const router = useRouter();
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile) {
    return <p className="text-center text-gray-500 font-medium mt-10">Profile not found.</p>;
  }

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        ← Back to Profiles
      </button>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <Image src={profile.photo} alt={profile.name} width={120} height={120} className="w-28 h-28 object-cover rounded-lg" />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-400">{profile.description}</p>

            <div className="mt-3">
              <h3 className="text-lg font-semibold">📍 Address:</h3>
              <p className="text-gray-400">{profile.address.street}, {profile.address.city}, {profile.address.zip}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">📞 Contact:</h3>
              <p className="text-gray-400">📧 {profile.contact.email}</p>
              <p className="text-gray-400">📞 {profile.contact.phone}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">🎯 Interests:</h3>
              <ul className="text-gray-400 list-disc pl-5">
                {profile.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <MapContainer
            center={[profile.address.lat, profile.address.lng]}
            zoom={12}
            className="w-full h-64 rounded-lg"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[profile.address.lat, profile.address.lng]} icon={customIcon}>
              <Popup>
                <strong>{profile.name}</strong><br />
                {profile.address.city}, {profile.address.state}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
