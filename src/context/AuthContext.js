"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// 1. Membuat Context
const AuthContext = createContext(null);

// 2. Membuat Provider (komponen yang akan "membungkus" aplikasi)
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi ini dijalankan sekali saat komponen pertama kali dimuat
    
    // Coba dapatkan sesi yang sudah ada saat halaman dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Ini adalah listener utama. Ia akan mendengarkan setiap perubahan status auth.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Jika ada perubahan, kita bisa anggap loading awal selesai
        if (_event !== 'INITIAL_SESSION') {
          setLoading(false);
        }
      }
    );

    // Cleanup function: Hentikan listener saat komponen tidak lagi digunakan
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Array kosong berarti useEffect hanya berjalan sekali

  // Nilai yang akan dibagikan ke semua komponen di bawahnya
  const value = {
    session,
    user: session?.user, // Menyediakan akses mudah ke object user
    loading
  };

  // Jangan render anak-anaknya sebelum loading awal selesai
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Membuat Custom Hook untuk mempermudah penggunaan context
export function useAuth() {
  return useContext(AuthContext);
}