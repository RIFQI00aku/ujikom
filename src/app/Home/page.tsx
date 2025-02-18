"use client"; // Tambahkan ini agar bisa menggunakan useRouter

import React from 'react';
import { Home, Box, UserCog, LogOut, OutdentIcon, IndentIcon, GitPullRequestArrow, GitPullRequest, SendIcon, Send, ClipboardList, Inbox, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link'; // Menambahkan import Link untuk navigasi
import Sidebar from '../components/sidebar';  // Pastikan path-nya benar

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">INVENTORY</h1>
        <p className="text-gray-700 text-lg mb-6">Ringkasan informasi terkait APLIKASI INVENTORY BERBASIS WEBSITE</p>

        {/* Konten Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* Data Karyawan */}
          <div className="bg-white p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div>
            <div className="flex justify-center items-center">
            <UserCog size={40} className="text-blue-600 mt-3" />
            </div>
              <h3 className="text-xl text-center font-semibold text-gray-800 mt-4">Data Karyawan</h3>
              <p className="text-center text-gray-500">Lihat dan kelola akun dan data karyawan yang ada.</p>
            </div>
          </div>

          {/* Permintaan Barang */}
          <div className="bg-white p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div>
            <div className="flex justify-center items-center">
            <ClipboardList size={40} className="text-green-600 mt-3" />
          </div>
              <h3 className="text-xl text-center font-semibold text-gray-800 mt-4">Permintaan Barang</h3>
              <p className="text-center text-gray-500">Lihat data permintaan barang dari karyawan.</p>
            </div>
          </div>

          {/* Barang Masuk */}
          <div className="bg-white p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div>
            <div className="flex justify-center items-center">
            <ArrowUpCircle size={40} className="text-blue-600 mt-3" />
            </div>
              <h3 className="text-xl text-center font-semibold text-gray-800 mt-4">Barang Masuk</h3>
              <p className="text-center stext-gray-500">Lihat riwayat barang yang masuk.</p>
            </div>
          </div>

          {/* Barang Keluar */}
          <div className="bg-white p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div>
            <div className="flex justify-center items-center">
  <ArrowDownCircle size={40} className="text-purple-600 mt-3" />
</div>
              <h3 className="text-xl text-center font-semibold text-gray-800 mt-4">Barang Keluar</h3>
              <p className="text-center text-gray-500">Lihat riwayat barang yang keluar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
