"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";

interface Supplier {
  id: string;
  kode: string;
  nama: string;
  alamat: string;
  kontak: string;
  email: string;
}

export default function SupplierPage() {
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Supplier>({
    id: "",
    kode: "",
    nama: "",
    alamat: "",
    kontak: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    kode: "",
    nama: "",
    alamat: "",
    kontak: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Hapus pesan error untuk field yang diubah
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi setiap field apakah sudah terisi
    let newErrors = { ...errors };
    let hasError = false;
    (Object.keys(form) as (keyof Supplier)[]).forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "Field ini wajib diisi";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Jika validasi lolos, tambahkan data supplier ke tabel
    setSupplierData([...supplierData, form]);

    // Reset form dan error
    setForm({
      id: "",
      kode: "",
      nama: "",
      alamat: "",
      kontak: "",
      email: "",
    });
    setErrors({
      id: "",
      kode: "",
      nama: "",
      alamat: "",
      kontak: "",
      email: "",
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Supplier</h1>

        {/* Form Input Supplier */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block font-medium mb-1">
                ID Supplier
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={form.id}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan ID Supplier"
              />
              {errors.id && (
                <p className="text-red-500 text-sm mt-1">{errors.id}</p>
              )}
            </div>
            <div>
              <label htmlFor="kode" className="block font-medium mb-1">
                Kode Supplier
              </label>
              <input
                type="text"
                name="kode"
                id="kode"
                value={form.kode}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Kode Supplier"
              />
              {errors.kode && (
                <p className="text-red-500 text-sm mt-1">{errors.kode}</p>
              )}
            </div>
            <div>
              <label htmlFor="nama" className="block font-medium mb-1">
                Nama Supplier
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Nama Supplier"
              />
              {errors.nama && (
                <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
              )}
            </div>
            <div>
              <label htmlFor="alamat" className="block font-medium mb-1">
                Alamat
              </label>
              <textarea
                name="alamat"
                id="alamat"
                value={form.alamat}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Alamat Supplier"
              />
              {errors.alamat && (
                <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
              )}
            </div>
            <div>
              <label htmlFor="kontak" className="block font-medium mb-1">
                Nomor Kontak
              </label>
              <input
                type="text"
                name="kontak"
                id="kontak"
                value={form.kontak}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Nomor Kontak"
              />
              {errors.kontak && (
                <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Email Supplier"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tambah Supplier
            </button>
          </form>
        </div>

        {/* Tabel Daftar Supplier */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Supplier</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Kode</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Alamat</th>
                <th className="border px-4 py-2">Kontak</th>
                <th className="border px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{supplier.id}</td>
                  <td className="border px-4 py-2">{supplier.kode}</td>
                  <td className="border px-4 py-2">{supplier.nama}</td>
                  <td className="border px-4 py-2">{supplier.alamat}</td>
                  <td className="border px-4 py-2">{supplier.kontak}</td>
                  <td className="border px-4 py-2">{supplier.email}</td>
                </tr>
              ))}
              {supplierData.length === 0 && (
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    Belum ada data supplier.
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
