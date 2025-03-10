"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../components/sidebar";

type Karyawan = {
  id_user: number;
  username: string;
  email: string;
  role: string;
};

export default function KaryawanPage() {
  const router = useRouter();
  const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await axios.get<Karyawan[]>(`${apiUrl}/api/user`, {
          withCredentials: true,
        });

        console.log("📡 Response dari server:", response.data);

        if (Array.isArray(response.data)) {
          setKaryawan(response.data);
        } else {
          setError("Data yang diterima tidak valid.");
        }
      } catch (err: any) {
        console.error("🔥 Error Fetching Data:", err);
        setError(
          `Gagal mengambil data dari server. Pastikan backend berjalan dan CORS dikonfigurasi dengan benar. Error: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKaryawan();
  }, []);

  const hapusKaryawan = useCallback(async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/api/user/${id}`, { withCredentials: true });
      setKaryawan((prev) => prev.filter((k) => k.id_user !== id));
    } catch (err: any) {
      console.error("🔥 Gagal menghapus karyawan:", err);
      setError(`Gagal menghapus karyawan: ${err.message}`);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          DAFTAR PENGGUNA
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
            <table className="min-w-full text-gray-700 table-auto border border-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left border">No</th>
                  <th className="py-3 px-6 text-left border">Nama</th>
                  <th className="py-3 px-6 text-left border">Email</th>
                  <th className="py-3 px-6 text-left border">Role</th>
                  <th className="py-3 px-6 text-left border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karyawan.map((k, index) => (
                  <tr key={k.id_user} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-6 border">{index + 1}</td>
                    <td className="py-4 px-6 border">{k.username}</td>
                    <td className="py-4 px-6 border">{k.email}</td>
                    <td className="py-4 px-6 border capitalize">
                      {k.role ? k.role.charAt(0).toUpperCase() + k.role.slice(1).toLowerCase() : "Tidak Diketahui"}
                    </td>
                    <td className="py-4 px-6 flex gap-3 border">
                      {k.role.toLowerCase() !== "admin" && (
                        <>
                          <button
                            onClick={() => router.push(`/edit/${k.id_user}`)}
                            className="bg-yellow-400 px-5 py-2 rounded-md hover:bg-yellow-500"
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => hapusKaryawan(k.id_user)}
                            className="bg-red-500 px-5 py-2 rounded-md hover:bg-red-600"
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push("/add")}
                className="bg-green-500 px-8 py-3 rounded-lg hover:bg-green-600"
              >
                Tambah Karyawan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
