"use client";

import { useState, useEffect } from "react";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

interface Contact {
  email: string;
  phone: string;
}

interface User {
  id: number;
  name: string;
  photo: string;
  description: string;
  address: Address;
  contact: Contact;
  interests: string[];
}

export default function Dashboard() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: Math.random()*100,
    name: "",
    photo: "/profile.jpeg",
    description: "Data Scientist specializing in AI and Machine Learning",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      lat: 0,
      lng: 0,
    },
    contact: {
      email: "default@gmail.com ",
      phone: "1234567890",
    },
    interests: [
        "Machine Learning",
        "Data Science",
        "Reading"
    ],
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const response = await fetch("/api/profiles");
    const data = await response.json();
    setProfiles(data);
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.contact.email || !newUser.address.city) return;

    const response = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      fetchProfiles();
      setNewUser({
        id: 0,
        name: "",
        photo: "/default.jpeg",
        description: "",
        address: { street: "", city: "", state: "", zip: "", lat: 0, lng: 0 },
        contact: { email: "", phone: "" },
        interests: [],
      });
    }
  };

  const handleEdit = (id: number) => {
    const user = profiles.find((profile) => profile.id === id);
    if (user) setEditingUser(user);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    const response = await fetch("/api/profiles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    });

    if (response.ok) {
      fetchProfiles();
      setEditingUser(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const response = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProfiles();
      }
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800 p-6 rounded-md shadow-lg">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-3 rounded-md text-white w-full border border-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.contact.email}
          onChange={(e) => setNewUser({ ...newUser, contact: { ...newUser.contact, email: e.target.value } })}
          className="p-3 rounded-md text-white w-full border border-gray-400"
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, city: e.target.value } })}
          className="p-3 rounded-md text-white w-full border border-gray-400"
        />
        <input
          type="number"
          placeholder="Latitude"
          value={newUser.address.lat}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, lat: parseFloat(e.target.value) } })}
          className="p-3 rounded-md text-white w-full border border-gray-400"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={newUser.address.lng}
          onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, lng: parseFloat(e.target.value) } })}
          className="p-3 rounded-md text-white w-full border border-gray-400"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-md w-full transition">Add User</button>
          <button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md w-full transition">Save User</button>
        </div>
      </div>

      <ul>
        {profiles.map((profile) => (
          <li key={profile.id} className="flex justify-between p-4 bg-gray-800 mb-2 rounded-md">
            {editingUser?.id === profile.id ? (
              <>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="p-2 rounded-md text-black"
                />
                <button onClick={handleSaveEdit} className="bg-blue-600 p-2 rounded-md">
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-around items-center w-full" >
                    <span>{profile.name}</span>
                    <span>{profile.contact.email}</span>
                    <span>{profile.address?.city}</span>
                </div>
                <div className="w-40 " >
                  <button onClick={() => handleEdit(profile.id)} className="bg-yellow-600 p-2 rounded-md">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(profile.id)} className="bg-red-600 p-2 rounded-md ml-2">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}