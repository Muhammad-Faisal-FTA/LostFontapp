"use client";
import { useState } from "react";

export default function UpdateInfo() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch("https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/user/edit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      });
      const data = await res.json();
      console.log("Profile info updated:", data);
    } catch (err) {
      console.error("Info update error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Update Profile Info</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Info
      </button>
    </form>
  );
}
