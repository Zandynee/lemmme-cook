"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [blurActive, setBlurActive] = useState(false);

  const router = useRouter();

 // Langkah 2: Ubah handleSubmit menjadi fungsi async
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state
    setError('');
    setLoading(true);

    try {
      // Langkah 3: Panggil fungsi signInWithPassword dari Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // Langkah 4: Tangani response dari Supabase
      if (error) {
        setError(error.message); // Tampilkan pesan error dari Supabase
      } else if (data.user) {
        router.push('/'); 
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      // Langkah 5: Hentikan state loading
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
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <button
              type="submit"
              className="w-full bg-[#F47F4B] text-white py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
