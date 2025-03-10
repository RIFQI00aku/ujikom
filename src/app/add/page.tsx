"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddKaryawanPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    if (!username || !email || !password || !role) {
      setError("Semua field harus diisi!");
      return;
    }

    try {
      setError(null);
      await axios.post(`${apiUrl}/api/register`, {
        username,
        email,
        password,
        role,
      });

      router.push("/karyawan");
      router.refresh();
    } catch (error: any) {
      console.error("Error saat register:", error);
      setError(error.response?.data?.message || "Terjadi kesalahan saat register.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-10 justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 drop-shadow-md">
          Tambah Karyawan
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="karyawan">Karyawan</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 px-6 py-3 rounded-lg text-white font-bold shadow-md hover:bg-green-600 transition transform hover:scale-105"
          >
            Tambah Karyawan
          </button>
        </form>
      </div>
    </div>
  );
}
