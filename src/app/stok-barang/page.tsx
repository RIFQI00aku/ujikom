"use client";

import React, { useState, ChangeEvent } from "react";
import Sidebar from "../components/sidebar"; // Pastikan path sesuai struktur proyek Anda

interface StokBarang {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  satuan: string;
  jumlahStock: string;
}

export default function StokBarangPage() {
  // Data statis 20 barang berbeda
  const initialData: StokBarang[] = [
    { id: "1", kodeBarang: "KB001", namaBarang: "Barang 1", satuan: "pcs", jumlahStock: "100" },
    { id: "2", kodeBarang: "KB002", namaBarang: "Barang 2", satuan: "pcs", jumlahStock: "150" },
    { id: "3", kodeBarang: "KB003", namaBarang: "Barang 3", satuan: "pcs", jumlahStock: "200" },
    { id: "4", kodeBarang: "KB004", namaBarang: "Barang 4", satuan: "pcs", jumlahStock: "80" },
    { id: "5", kodeBarang: "KB005", namaBarang: "Barang 5", satuan: "pcs", jumlahStock: "120" },
    { id: "6", kodeBarang: "KB006", namaBarang: "Barang 6", satuan: "pcs", jumlahStock: "90" },
    { id: "7", kodeBarang: "KB007", namaBarang: "Barang 7", satuan: "pcs", jumlahStock: "60" },
    { id: "8", kodeBarang: "KB008", namaBarang: "Barang 8", satuan: "pcs", jumlahStock: "110" },
    { id: "9", kodeBarang: "KB009", namaBarang: "Barang 9", satuan: "pcs", jumlahStock: "130" },

    
  ];

  const [stokData, setStokData] = useState<StokBarang[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (index: number) => {
    const newData = stokData.filter((_, i) => i !== index);
    setStokData(newData);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter data berdasarkan searchQuery (kode barang atau nama barang)
  const filteredData = stokData.filter((item) =>
    item.kodeBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Stok Barang</h1>

        {/* Fitur Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari berdasarkan kode atau nama barang..."
            className="w-full border p-2 rounded focus:outline-blue-500"
          />
        </div>

        {/* Tabel Data Stok Barang */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Stok Barang</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Kode Barang</th>
                <th className="border px-4 py-2">Nama Barang</th>
                <th className="border px-4 py-2">Satuan</th>
                <th className="border px-4 py-2">Stok</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.kodeBarang}</td>
                  <td className="border px-4 py-2">{item.namaBarang}</td>
                  <td className="border px-4 py-2">{item.satuan}</td>
                  <td className="border px-4 py-2">{item.jumlahStock}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    Belum ada data stok barang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
