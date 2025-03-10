"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

interface Supplier {
  id_supplier: number;
  nama_supplier: string;
  kontak_supplier: string;
  alamat: string;
}

export default function SupplierPage() {
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Supplier>({
    id_supplier: 0,
    nama_supplier: "",
    kontak_supplier: "",
    alamat: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (API_URL) fetchSuppliers();
  }, [API_URL]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get<Supplier[]>(`${API_URL}/api/suppliers`);
      setSupplierData(response.data);
    } catch (error: any) {
      console.error("Error fetching suppliers:", error);
      alert(`Gagal mengambil data supplier: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form yang dikirim:", form);
  
    try {
      if (editing) {
        console.log(`Mengupdate supplier dengan ID: ${form.id_supplier}`);
        await axios.put(`${API_URL}/api/suppliers/${form.id_supplier}`, form);
      } else {
        console.log("Menambahkan supplier baru");
        await axios.post(`${API_URL}/api/suppliers`, form);
      }
      await fetchSuppliers();
      setForm({ id_supplier: 0, nama_supplier: "", kontak_supplier: "", alamat: "" });
      setEditing(false);
    } catch (error: any) {
      console.error("Error saving supplier:", error);
      alert(`Gagal menyimpan supplier: ${error.response?.data?.error || error.message}`);
    }
  };
  

  const handleEdit = (supplier: Supplier) => {
    console.log("Edit Supplier:", supplier);
    setForm({ ...supplier });
    setEditing(true);
  };
  
  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus supplier ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/suppliers/${id}`);
      await fetchSuppliers();
    } catch (error: any) {
      console.error("Error deleting supplier:", error);
      alert(`Gagal menghapus supplier: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Supplier</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Nama Supplier</label>
              <input type="text" name="nama_supplier" value={form.nama_supplier} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Kontak Supplier</label>
              <input type="text" name="kontak_supplier" value={form.kontak_supplier} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Alamat</label>
              <textarea name="alamat" value={form.alamat} onChange={handleChange} className="w-full border p-2 rounded" required></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {editing ? "Update Supplier" : "Tambah Supplier"}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Supplier</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Kontak</th>
                <th className="border px-4 py-2">Alamat</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, index) => (
                <tr key={supplier.id_supplier} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{supplier.nama_supplier}</td>
                  <td className="border px-4 py-2">{supplier.kontak_supplier}</td>
                  <td className="border px-4 py-2">{supplier.alamat}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleEdit(supplier)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(supplier.id_supplier)} className="px-3 py-1 bg-red-500 text-white rounded">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
