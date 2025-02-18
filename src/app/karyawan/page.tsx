"use client"; // Tambahkan ini agar bisa menggunakan useRouter

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ganti dari next/router ke next/navigation
import { usePathname } from 'next/navigation'; // Import usePathname untuk mendeteksi pathname
import Sidebar from '../components/sidebar';  // Pastikan path-nya benar

type Jabatan = "admin" | "owner";

type Karyawan = {
  id: number;
  nama: string;
  akun: string;
  password: string;
  jabatan: Jabatan;
};

export default function KaryawanPage() {
  const router = useRouter();
  const pathname = usePathname(); // Menggunakan usePathname untuk mendeteksi path yang aktif

  const [karyawan, setKaryawan] = useState<Karyawan[]>([
    { id: 1, nama: 'John Doe', akun: 'johndoe', password: 'password123', jabatan: "admin" },
    { id: 2, nama: 'Jane Smith', akun: 'janesmith', password: 'password456', jabatan: "owner" },
  ]);

  // Fungsi untuk menambahkan karyawan baru (default jabatan "admin")
  const tambahKaryawan = () => {
    const newKaryawan: Karyawan = {
      id: karyawan.length + 1,
      nama: 'New Karyawan',
      akun: 'newakun',
      password: 'newpassword',
      jabatan: "admin", // Atur default jabatan sebagai admin. Anda bisa menyesuaikannya jika diperlukan.
    };
    setKaryawan([...karyawan, newKaryawan]);
  };

  // Fungsi untuk menghapus karyawan
  const hapusKaryawan = (id: number) => {
    setKaryawan(karyawan.filter(k => k.id !== id));
  };

  // Menentukan class aktif untuk menu yang dipilih (digunakan di Sidebar misalnya)
  const activeClass = "flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-400";
  const inactiveClass = "flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 text-white";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Data Karyawan
        </h1>

        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
          <table className="min-w-full text-gray-700 table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Akun</th>
                <th className="py-3 px-6 text-left">Password</th>
                <th className="py-3 px-6 text-left">Jabatan</th>
                <th className="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {karyawan.map(k => (
                <tr key={k.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <td className="py-4 px-6">{k.id}</td>
                  <td className="py-4 px-6">{k.nama}</td>
                  <td className="py-4 px-6">{k.akun}</td>
                  <td className="py-4 px-6">{k.password}</td>
                  <td className="py-4 px-6 capitalize">{k.jabatan}</td>
                  <td className="py-4 px-6 flex gap-3 items-center">
                    <button className="bg-yellow-400 text-black px-5 py-2 rounded-full shadow-md hover:bg-yellow-500 transition-colors duration-300 ease-in-out transform hover:scale-105">
                      Ubah
                    </button>
                    <button 
                      onClick={() => hapusKaryawan(k.id)} 
                      className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 text-center">
            <button 
              onClick={tambahKaryawan} 
              className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:scale-105 mr-4"
            >
              Tambah Karyawan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
