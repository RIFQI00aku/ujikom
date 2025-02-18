"use client";

import React from 'react';
import { usePathname } from 'next/navigation'; // Menggunakan usePathname untuk mendapatkan pathname
import Link from 'next/link';
import { Home, UserCog, Box, TruckIcon } from 'lucide-react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname(); // Ambil pathname dengan hook usePathname
  
  // Menentukan kelas aktif dan tidak aktif
  const activeClass = "flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white";
  const inactiveClass = "flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 text-white";

  return (
    <div className="w-64 bg-blue-600 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">ADMIN</h2>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link href="/Home" className={pathname === '/Home' ? activeClass : inactiveClass}>
              <Home size={20} /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/supliyer" className={pathname === '/supliyer' ? activeClass : inactiveClass}>
              <TruckIcon size={20} /> Supliyer
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/data" className={pathname === '/data' ? activeClass : inactiveClass}>
              <Box size={20} /> data barang
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/karyawan" className={pathname === '/karyawan' ? activeClass : inactiveClass}>
              <UserCog size={20} /> Data pengguna
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/stok-barang" className={pathname === '/stok-barang' ? activeClass : inactiveClass}>
              <Box size={20} /> Stok Barang
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/request-barang" className={pathname === '/request-barang' ? activeClass : inactiveClass}>
              <Box size={20} /> Request Barang
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/barang-masuk" className={pathname === '/barang-masuk' ? activeClass : inactiveClass}>
              <FaSignInAlt size={20} /> Barang Masuk
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/barang-keluar" className={pathname === '/barang-keluar' ? activeClass : inactiveClass}>
              <FaSignOutAlt size={20} /> Barang Keluar
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => window.location.href = "/"} // Menggunakan window.location.href untuk navigasi logout
        className="flex items-center gap-3 p-3 mt-6 bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition duration-200 ease-in-out"
      >
        <FaSignOutAlt size={20} /> <span className="ml-2">Logout</span>
      </button>
    </div>
  );
}
