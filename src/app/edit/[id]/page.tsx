"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("ID pengguna tidak valid.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const requestUrl = `${apiUrl}/api/user/${id}`;

        const response = await axios.get<User>(requestUrl, { withCredentials: true });

        if (!response.data) throw new Error("Data user tidak ditemukan.");

        setUser(response.data);
      } catch (err: any) {
        console.error("🔥 Gagal mengambil data user:", err);
        setError("Gagal mengambil data user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user) {
      setError("Data tidak valid.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.put(`${apiUrl}/api/user/${id}`, user, { withCredentials: true });

      alert("User berhasil diperbarui!");
      router.push("/karyawan");
    } catch (err: any) {
      console.error("🔥 Gagal mengupdate user:", err);
      setError("Gagal mengupdate user.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-red-500">Data user tidak tersedia.</p>;

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user?.username || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user?.password || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600">
              Simpan
            </button>
            <button
              type="button"
              onClick={() => router.push("/karyawan")}
              className="bg-gray-500 px-4 py-2 text-white rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
