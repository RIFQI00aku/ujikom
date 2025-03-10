"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../components/sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface StokBarang {
  id_barang: string;
  nama_barang: string;
  kategori: string;
  jumlah_stok: number;
}

export default function StokBarangPage() {
  const [stokData, setStokData] = useState<StokBarang[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const printAllRef = useRef<HTMLDivElement | null>(null);
  const printItemRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<StokBarang | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setStokData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
    setStokData(stokData.filter((item) => item.id_barang !== id));
  };

  const handlePrintAll = useReactToPrint({
    content: () => printAllRef.current,
  });

  const handlePrintItem = useReactToPrint({
    content: () => printItemRef.current,
  });

  const triggerPrintItem = (item: StokBarang) => {
    setSelectedItem(item);
    setTimeout(() => {
      handlePrintItem();
    }, 500);
  };

  const handleDownloadPDF = () => {
    const input = printAllRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("Stok_Barang.pdf");
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Stok Barang</h1>

        <div className="mb-4 flex justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari barang..."
            className="border p-2 rounded w-3/4 focus:outline-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handlePrintAll}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Cetak Semua
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Download PDF
            </button>
          </div>
        </div>

        <div ref={printAllRef} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daftar Stok Barang</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Barang</th>
                <th className="border px-4 py-2">Satuan</th>
                <th className="border px-4 py-2">Jumlah Stok</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stokData
                .filter((item) =>
                  item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={item.id_barang} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.nama_barang}</td>
                    <td className="border px-4 py-2">{item.kategori}</td>
                    <td className="border px-4 py-2">{item.jumlah_stok}</td>
                    <td className="border px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleDelete(item.id_barang)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => triggerPrintItem(item)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Cetak
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Elemen yang akan dicetak untuk satu item (hidden) */}
        {selectedItem && (
          <div className="hidden">
            <div ref={printItemRef} className="p-6 border">
              <h2 className="text-xl font-semibold">Detail Barang</h2>
              <p>ID Barang: {selectedItem.id_barang}</p>
              <p>Nama Barang: {selectedItem.nama_barang}</p>
              <p>Satuan: {selectedItem.kategori}</p>
              <p>Jumlah Stok: {selectedItem.jumlah_stok}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
