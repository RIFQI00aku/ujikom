"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id_user: number;
  role: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect jika token sudah ada
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/Home");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      // Pastikan URL backend sudah benar
      const url = process.env.NEXT_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_URL}/api/login`
        : "/api/login"; // Fallback jika .env tidak ada

      const res = await axios.post<LoginResponse>(
        url,
        { email, password },
        { withCredentials: true }
      );

      const { token } = res.data;
      if (token) {
        try {
          // Decode token dengan aman
          const decoded: TokenPayload = jwtDecode<TokenPayload>(token);

          // Simpan token hanya jika user role valid
          if (decoded.role === "A  dmin") {
            localStorage.setItem("token", token);
            router.push("/Home");
          } else {
            setError("Akses ditolak! Role tidak dikenali.");
          }
        } catch (decodeError) {
          console.error("Gagal mendekode token:", decodeError);
          setError("Token tidak valid. Silakan login ulang.");
        }
      } else {
        setError("Login gagal. Token tidak diterima.");
      }
    } catch (error: any) {
      console.error("Error saat login:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Login gagal. Periksa kembali email dan password Anda."
      );
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Bagian kiri: Branding */}
      <div className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-400 flex flex-col justify-between p-10">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mr-6"
          />
          <h1 className="text-white text-lg font-bold">
            APLIKASI INVENTORY BARANG BERBASIS WEBSITE
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-white text-3xl font-extrabold mb-10">
            Selamat Datang Kembali!
          </h2>
          <p className="text-white text-center mb-10">
            Kami senang bisa bertemu lagi dengan Anda. Masuk untuk melanjutkan
            mengakses akun Anda.
          </p>
        </div>
      </div>

      {/* Bagian kanan: Form Login */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-lg w-96 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
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
};

export default LoginPage;
