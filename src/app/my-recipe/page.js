// /src/app/my-recipes/page.js

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { IoAdd, IoRemove } from 'react-icons/io5';

// 1. Impor komponen Sidebar
import Sidebar from '@/components/Sidebar';
import MyRecipesList from '@/components/MyRecipesList';
import UploadRecipeForm from '@/components/UploadRecipeForm';

export default function MyRecipesPage() {
  const { session, loading } = useAuth();
  const router = useRouter();
  
  // 2. Tambahkan state untuk efek blur, sama seperti di halaman utama
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [blurActive, setBlurActive] = useState(false);

  // useEffect untuk penjaga rute (tidak berubah)
  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/login');
      }
    }
  }, [session, loading, router]);

  // Loading state (tidak berubah)
  if (loading || !session) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading or redirecting...</p>
      </div>
    );
  }

  const handleUploadSuccess = () => {
    setIsFormVisible(false);
  };

  return (
    // 3. Tambahkan div pembungkus utama
    <div className="relative">
      {/* Panggil komponen Sidebar dan kirimkan prop `setBlurActive` */}
      <Sidebar setBlurActive={setBlurActive} />

      {/* Konten utama sekarang memiliki efek blur kondisional */}
      <div 
        className={`md:ml-[80px] p-6 md:p-8 bg-gray-50 min-h-screen transition-all duration-300 ${blurActive ? 'blur-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">My Recipes</h1>
          
          {/* Bagian upload resep (tidak berubah) */}
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="w-full flex justify-between items-center text-left">
              <h2 className="text-2xl font-semibold text-gray-700">{isFormVisible ? 'Close Form' : 'Upload a New Recipe'}</h2>
              <span className="text-2xl text-orange-500">{isFormVisible ? <IoRemove /> : <IoAdd />}</span>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFormVisible ? 'max-h-[2000px] mt-6' : 'max-h-0'}`}>
              <UploadRecipeForm onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>

          {/* Bagian daftar resep (tidak berubah) */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Uploaded Recipes</h2>
            <MyRecipesList />
          </div>
        </div>
      </div>
    </div>
  );
}