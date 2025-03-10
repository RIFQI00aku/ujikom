"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home, UserCog, Box, TruckIcon } from "lucide-react";
import { FaMoneyBill, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    router.push("/"); // Arahkan ke halaman login
  };

  return (
    <div className="w-64 bg-blue-600 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">ADMIN</h2>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link href="/Home" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <Home size={20} /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/supplier" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <TruckIcon size={20} /> Supplier
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/data" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <Box size={20} /> Data Barang
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/pengguna" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <UserCog size={20} /> Data Pengguna
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/stok-barang" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <Box size={20} /> Stok Barang
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/transaksi" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500">
              <FaMoneyBill size={20} /> Transaksi
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 mt-6 bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition duration-200 ease-in-out"
      >
        <FaSignOutAlt size={20} /> <span className="ml-2">Logout</span>
      </button>
    </div>
  );
}
