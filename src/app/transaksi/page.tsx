"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Sidebar from "../components/sidebar";

interface Barang {
  id_barang: number;
  nama_barang: string;
  jumlah_stok: number;
}

interface Supplier {
  id_supplier: number;
  nama_supplier: string;
}

interface Transaction {
  id_transaksi: number;
  nama_barang: string;
  tipe_transaksi: string;
  jumlah: number;
  nama_supplier?: string;
  konsumen?: string;
  tanggal: string;
}

export default function TransactionsPage() {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState({
    id_barang: "",
    tipe_transaksi: "Masuk",
    jumlah: 1,
    id_supplier: "",
    konsumen: "",
  });

  // Ambil data barang dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setBarangList(data))
      .catch((err) => console.error("Error fetching items:", err));

    fetch("http://localhost:5000/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSupplierList(data))
      .catch((err) => console.error("Error fetching suppliers:", err));

    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // Update form input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit transaksi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Transaksi berhasil!");
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  };

  // Cek stok barang untuk validasi tombol "Keluar"
  const selectedBarang = barangList.find((b) => b.id_barang === Number(formData.id_barang));
  const isKeluarDisabled = formData.tipe_transaksi === "Keluar" && (!selectedBarang || selectedBarang.jumlah_stok === 0);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Transaksi Barang</h1>

        {/* Form Transaksi */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Input Transaksi</h2>

          <div className="mb-4">
            <label className="block font-medium">Nama Barang:</label>
            <select
              name="id_barang"
              value={formData.id_barang}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Pilih Barang</option>
              {barangList.map((barang) => (
                <option key={barang.id_barang} value={barang.id_barang}>
                  {barang.nama_barang} (Stok: {barang.jumlah_stok})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Tipe Transaksi:</label>
            <select
              name="tipe_transaksi"
              value={formData.tipe_transaksi}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="Masuk">Masuk</option>
              <option value="Keluar">Keluar</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Jumlah:</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              min="1"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Jika tipe transaksi "Masuk", tampilkan pilihan supplier */}
          {formData.tipe_transaksi === "Masuk" && (
            <div className="mb-4">
              <label className="block font-medium">Supplier:</label>
              <select
                name="id_supplier"
                value={formData.id_supplier}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Pilih Supplier</option>
                {supplierList.map((supplier) => (
                  <option key={supplier.id_supplier} value={supplier.id_supplier}>
                    {supplier.nama_supplier}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Jika tipe transaksi "Keluar", tampilkan input konsumen */}
          {formData.tipe_transaksi === "Keluar" && (
            <div className="mb-4">
              <label className="block font-medium">Konsumen:</label>
              <input
                type="text"
                name="konsumen"
                value={formData.konsumen}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Masukkan nama konsumen"
              />
            </div>
          )}

          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${isKeluarDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isKeluarDisabled}
          >
            Tambah Transaksi
          </button>
        </form>

        {/* Daftar Transaksi */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Barang</th>
                <th className="border px-4 py-2">Tipe</th>
                <th className="border px-4 py-2">Jumlah</th>
                <th className="border px-4 py-2">Supplier/Konsumen</th>
                <th className="border px-4 py-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={trx.id_transaksi} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{trx.nama_barang}</td>
                  <td className="border px-4 py-2">{trx.tipe_transaksi}</td>
                  <td className="border px-4 py-2">{trx.jumlah}</td>
                  <td className="border px-4 py-2">{trx.nama_supplier || trx.konsumen || "-"}</td>
                  <td className="border px-4 py-2">{new Date(trx.tanggal).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
