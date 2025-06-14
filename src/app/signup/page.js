"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Sidebar from '@/components/Sidebar';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [blurActive, setBlurActive] = useState(false);


  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Langkah 3: Panggil fungsi signUp dari Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          // Data tambahan ini akan disimpan di `raw_user_meta_data`
          // dan akan digunakan oleh trigger SQL Anda untuk mengisi tabel `public.users`
          data: {
            username: username,
            // Jika Anda punya input full_name, tambahkan di sini
            // full_name: fullName 
          }
        }
      });

      // Langkah 4: Tangani response dari Supabase
      if (error) {
        setError(error.message); // Tampilkan pesan error dari Supabase
      } else if (data.user) {
        alert('Registration successful! Please check your email to confirm your account.');
        router.push('/login');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      // Menangani error tak terduga
      setError('An unexpected error occurred. Please try again.');
    } finally {
      // Langkah 5: Hentikan state loading, baik sukses maupun gagal
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar setBlurActive={setBlurActive} />

      {/* Main content */}
      <div className={`flex-1 flex items-center justify-center transition duration-300 ${blurActive ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47F4B]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47F4B]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47F4B]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47F4B]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F47F4B] text-white py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
