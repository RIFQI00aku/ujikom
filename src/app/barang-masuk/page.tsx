"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";

interface BarangMasuk {
  id: string;
  kodeBarang: string;
  jumlah: string;
}

interface BarangOption {
  id: string;
  kode: string;
  nama: string;
}

export default function BarangBasukPage() {
  const [barangMasukData, setBarangMasukData] = useState<BarangMasuk[]>([]);
  const [barangOptions] = useState<BarangOption[]>([
    { id: "1", kode: "B001", nama: "Barang A" },
    { id: "2", kode: "B002", nama: "Barang B" },
    { id: "3", kode: "B003", nama: "Barang C" },
  ]);

  const [form, setForm] = useState<BarangMasuk>({
    id: "",
    kodeBarang: "",
    jumlah: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    kodeBarang: "",
    jumlah: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { ...errors };
    let hasError = false;
    (Object.keys(form) as (keyof BarangMasuk)[]).forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "Field ini wajib diisi";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setBarangMasukData([...barangMasukData, form]);

    setForm({
      id: "",
      kodeBarang: "",
      jumlah: "",
    });
    setErrors({
      id: "",
      kodeBarang: "",
      jumlah: "",
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Barang Basuk</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Barang Masuk */}
            <div>
              <label htmlFor="id" className="block font-medium mb-1">
                ID Barang Masuk
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={form.id}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan ID Barang Masuk"
              />
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
            </div>

            {/* Kode Barang (Dropdown) */}
            <div>
              <label htmlFor="kodeBarang" className="block font-medium mb-1">
                Kode Barang
              </label>
              <select
                name="kodeBarang"
                id="kodeBarang"
                value={form.kodeBarang}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
              >
                <option value="">Pilih Barang</option>
                {barangOptions.map((barang) => (
                  <option key={barang.id} value={barang.kode}>
                    {barang.nama} - {barang.kode}
                  </option>
                ))}
              </select>
              {errors.kodeBarang && (
                <p className="text-red-500 text-sm mt-1">{errors.kodeBarang}</p>
              )}
            </div>

            {/* Jumlah */}
            <div>
              <label htmlFor="jumlah" className="block font-medium mb-1">
                Jumlah
              </label>
              <input
                type="number"
                name="jumlah"
                id="jumlah"
                value={form.jumlah}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Jumlah Barang"
              />
              {errors.jumlah && (
                <p className="text-red-500 text-sm mt-1">{errors.jumlah}</p>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tambah Barang Basuk
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Barang Basuk</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID Barang Masuk</th>
                <th className="border px-4 py-2">Kode Barang</th>
                <th className="border px-4 py-2">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {barangMasukData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{data.id}</td>
                  <td className="border px-4 py-2">{data.kodeBarang}</td>
                  <td className="border px-4 py-2">{data.jumlah}</td>
                </tr>
              ))}
              {barangMasukData.length === 0 && (
                <tr>
                  <td colSpan={3} className="border px-4 py-2 text-center">
                    Belum ada data barang basuk.
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
