"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";

interface Barang {
  id_barang: number;
  nama_barang: string;
  kategori: string;
  total_stok: number;
  id_supplier: number;
}

interface Supplier {
  id_supplier: number;
  nama_supplier: string;
}

export default function DataBarangPage() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [form, setForm] = useState<Partial<Barang>>({
    nama_barang: "",
    kategori: "Unit",
    id_supplier: 0,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBarang();
    fetchSupplier();
  }, []);

  // Ambil data barang dari API
  const fetchBarang = async () => {
    try {
      const res = await axios.get<Barang[]>("http://localhost:5000/api/items");
      setBarang(res.data);
    } catch (error) {
      console.error("Gagal mengambil data barang:", error);
      toast.error("Gagal memuat data barang");
    }
  };

  // Ambil data supplier dari API
  const fetchSupplier = async () => {
    try {
      const res = await axios.get<Supplier[]>("http://localhost:5000/api/suppliers");
      console.log("Data Supplier:", res.data); // Debugging
      setSupplierData(res.data);
    } catch (error) {
      console.error("Gagal mengambil data supplier:", error);
      toast.error("Gagal memuat data supplier");
    }
  };

  // Handle input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle submit tambah atau edit barang
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id_barang) {
        await axios.put(`http://localhost:5000/api/items/${form.id_barang}`, form);
        toast.success("Barang berhasil diperbarui");
      } else {
        await axios.post("http://localhost:5000/api/items", form);
        toast.success("Barang berhasil ditambahkan");
      }
      setOpen(false);
      setForm({ nama_barang: "", kategori: "Unit", id_supplier: 0 });
      fetchBarang();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan barang");
    }
  };

  // Handle edit barang
  const handleEdit = (barang: Barang) => {
    setForm({
      id_barang: barang.id_barang,
      nama_barang: barang.nama_barang,
      kategori: barang.kategori,
      id_supplier: barang.id_supplier,
    });
    setOpen(true);
  };

  // Handle hapus barang
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      toast.success("Barang berhasil dihapus");
      fetchBarang();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus barang");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Data Barang</h1>
        <button 
          onClick={() => setOpen(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
        >
          Tambah Barang
        </button>

        {open && (
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="nama_barang"
                value={form.nama_barang || ""}
                onChange={handleInputChange}
                className="w-full border p-2 rounded focus:outline-blue-500"
                placeholder="Nama Barang"
                required
              />
              <select name="kategori" value={form.kategori || "Unit"} onChange={handleInputChange} className="w-full border p-2 rounded">
                <option value="Unit">Unit</option>
                <option value="Set">Set</option>
                <option value="Buah">Buah</option>
                <option value="Pasang">Pasang</option>
              </select>
              <select 
                name="id_supplier" 
                value={form.id_supplier || 0} 
                onChange={handleInputChange} 
                className="w-full border p-2 rounded" 
                required
              >
                <option value={0}>Pilih Supplier</option>
                {supplierData.map((s) => (
                  <option key={s.id_supplier} value={s.id_supplier}>
                    {s.nama_supplier}
                  </option>
                ))}
              </select>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                {form.id_barang ? "Simpan Perubahan" : "Simpan"}
              </button>
            </form>
          </div>
        )}

        {/* TABEL DATA BARANG */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Barang</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang.map((item, index) => (
                <tr key={item.id_barang} className="border-b">
                  <td>{index + 1}</td>
                  <td>{item.nama_barang}</td>
                  <td>{item.kategori}</td>
                  <td>
                    {supplierData.find((s) => s.id_supplier === item.id_supplier)?.nama_supplier || "-"}
                  </td>
                  <td>{item.total_stok || 0}</td>
                  <td className="flex gap-2 justify-center">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id_barang)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Hapus
                    </button>
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