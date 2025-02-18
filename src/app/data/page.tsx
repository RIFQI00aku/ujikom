"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";

interface Barang {
  id: string;
  kode: string;
  nama: string;
  satuan: string;
  kodeSupplier: string;
}

interface Supplier {
  id: string;
  kode: string;
  nama: string;
}

export default function DataBarangPage() {
  const [barangData, setBarangData] = useState<Barang[]>([]);
  const [supplierData, setSupplierData] = useState<Supplier[]>([
    { id: "1", kode: "S001", nama: "Supplier A" },
    { id: "2", kode: "S002", nama: "Supplier B" },
  ]);
  const [form, setForm] = useState<Barang>({
    id: "",
    kode: "",
    nama: "",
    satuan: "",
    kodeSupplier: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    kode: "",
    nama: "",
    satuan: "",
    kodeSupplier: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { ...errors };
    let hasError = false;
    (Object.keys(form) as (keyof Barang)[]).forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "Field ini wajib diisi";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setBarangData([...barangData, form]);

    setForm({
      id: "",
      kode: "",
      nama: "",
      satuan: "",
      kodeSupplier: "",
    });
    setErrors({
      id: "",
      kode: "",
      nama: "",
      satuan: "",
      kodeSupplier: "",
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Data Barang</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block font-medium mb-1">
                ID Barang
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={form.id}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan ID Barang"
              />
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
            </div>
            <div>
              <label htmlFor="kode" className="block font-medium mb-1">
                Kode Barang
              </label>
              <input
                type="text"
                name="kode"
                id="kode"
                value={form.kode}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Kode Barang"
              />
              {errors.kode && <p className="text-red-500 text-sm mt-1">{errors.kode}</p>}
            </div>
            <div>
              <label htmlFor="nama" className="block font-medium mb-1">
                Nama Barang
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Nama Barang"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>
            <div>
              <label htmlFor="satuan" className="block font-medium mb-1">
                Satuan
              </label>
              <input
                type="text"
                name="satuan"
                id="satuan"
                value={form.satuan}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Masukkan Satuan Barang"
              />
              {errors.satuan && <p className="text-red-500 text-sm mt-1">{errors.satuan}</p>}
            </div>
            <div>
              <label htmlFor="kodeSupplier" className="block font-medium mb-1">
                Kode Supplier
              </label>
              <select
                name="kodeSupplier"
                id="kodeSupplier"
                value={form.kodeSupplier}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
              >
                <option value="">Pilih Supplier</option>
                {supplierData.map((supplier) => (
                  <option key={supplier.id} value={supplier.kode}>
                    {supplier.nama} - {supplier.kode}
                  </option>
                ))}
              </select>
              {errors.kodeSupplier && <p className="text-red-500 text-sm mt-1">{errors.kodeSupplier}</p>}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tambah Barang
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Barang</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Kode</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Satuan</th>
                <th className="border px-4 py-2">Kode Supplier</th>
              </tr>
            </thead>
            <tbody>
              {barangData.map((barang, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{barang.id}</td>
                  <td className="border px-4 py-2">{barang.kode}</td>
                  <td className="border px-4 py-2">{barang.nama}</td>
                  <td className="border px-4 py-2">{barang.satuan}</td>
                  <td className="border px-4 py-2">{barang.kodeSupplier}</td>
                </tr>
              ))}
              {barangData.length === 0 && (
                <tr>
                  <td colSpan={5} className="border px-4 py-2 text-center">
                    Belum ada data barang.
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
