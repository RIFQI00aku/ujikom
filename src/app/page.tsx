"use client"; // Tambahkan ini untuk menggunakan useRouter di Next.js

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulasi login sederhana
    if (email === "rifqi@gmail.com" && password === "123") {
      router.push("/Home"); // Pindah ke halaman Home
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri - Gambar atau Desain */}
      <div className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-400 flex flex-col justify-between p-10">
        {/* Bagian Atas: Logo dan Judul */}
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="mr-6" />
          <h1 className="text-white text-lg font-bold">
            APLIKASI INVENTORY BARANG BERBASIS WEBSITE
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-white text-3xl font-extrabold mb-10">Selamat Datang Kembali!</h2>
          <p className="text-white text-center mb-10">Kami senang bisa bertemu lagi dengan Anda Masuk untuk melanjutkan mengakses akun Anda..</p>
          </div>
          </div>

      {/* Kanan - Form Login */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-96 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Kata Sandi</label>
              <input
                type="password"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Masukkan kata sandi Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
