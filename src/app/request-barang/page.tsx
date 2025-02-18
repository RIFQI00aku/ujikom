"use client";

import React, { useState } from 'react';
import Sidebar from '../components/sidebar'; // Mengimpor Sidebar
import { LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type RequestBarang = {
  id: number;
  idKaryawan: number;
  namaKaryawan: string;
  namaBarang: string;
  jumlahBarang: number;
};

export default function RequestBarangPage() {
  const router = useRouter();
  const [permintaan, setPermintaan] = useState<RequestBarang[]>([
    { id: 1, idKaryawan: 1, namaKaryawan: 'John Doe', namaBarang: 'Laptop', jumlahBarang: 2 },
    { id: 2, idKaryawan: 2, namaKaryawan: 'Jane Smith', namaBarang: 'Monitor', jumlahBarang: 1 },
  ]);

  // Fungsi untuk menerima permintaan barang
  const terimaPermintaan = (id: number) => {
    alert(`Permintaan ID ${id} diterima.`);
    setPermintaan(permintaan.filter(p => p.id !== id));
  };

  // Fungsi untuk menolak permintaan barang
  const tolakPermintaan = (id: number) => {
    alert(`Permintaan ID ${id} ditolak.`);
    setPermintaan(permintaan.filter(p => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Permintaan Barang
        </h1>

        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
          <table className="min-w-full text-gray-700 table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID Permintaan</th>
                <th className="py-3 px-6 text-left">ID Karyawan</th>
                <th className="py-3 px-6 text-left">Nama Karyawan</th>
                <th className="py-3 px-6 text-left">Nama Barang</th>
                <th className="py-3 px-6 text-left">Jumlah Barang</th>
                <th className="py-3 px-6 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {permintaan.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <td className="py-4 px-6">{p.id}</td>
                  <td className="py-4 px-6">{p.idKaryawan}</td>
                  <td className="py-4 px-6">{p.namaKaryawan}</td>
                  <td className="py-4 px-6">{p.namaBarang}</td>
                  <td className="py-4 px-6">{p.jumlahBarang}</td>
                  <td className="py-4 px-6 flex gap-4 items-center">
                    <button 
                      onClick={() => terimaPermintaan(p.id)} 
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-110"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      Terima
                    </button>
                    <button 
                      onClick={() => tolakPermintaan(p.id)} 
                      className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-110"
                    >
                      <XCircle size={20} className="mr-2" />
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 text-center">
          </div>
        </div>
      </div>
    </div>
  );
}
