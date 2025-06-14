'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Select from 'react-select'; // Pastikan import ini ada

export default function UploadRecipeForm() {
  const { user } = useAuth();
  const router = useRouter();

  // State untuk form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState(30);
  const [imageFile, setImageFile] = useState(null);
  
  // State untuk kategori
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Semua fungsi logic Anda (useEffect, handleSubmit, dll.) ada di sini
  // ... (Kita asumsikan semua fungsi ini sudah benar seperti sebelumnya)
  useEffect(() => { const fetchCategories = async () => { const { data, error } = await supabase.from('categories').select('*').order('category_name', { ascending: true }); if (!error) { setAllCategories(data); } }; fetchCategories(); }, []);
  const handleImageChange = (e) => { if (e.target.files && e.target.files[0]) { setImageFile(e.target.files[0]); } };
  const handleSubmit = async (e) => { e.preventDefault(); if (!title || !instructions || !imageFile) { setError('Please fill in the title, instructions, and upload an image.'); return; } setLoading(true); try { const fileExt = imageFile.name.split('.').pop(); const fileName = `${user.id}-${Date.now()}.${fileExt}`; const filePath = `public/${fileName}`; const { error: uploadError } = await supabase.storage.from('recipe-photos').upload(filePath, imageFile); if (uploadError) throw uploadError; const { data: { publicUrl } } = supabase.storage.from('recipe-photos').getPublicUrl(filePath); const { data: newRecipe, error: insertError } = await supabase.from('recipes').insert({ user_id: user.id, title, description, instructions, cook_time_minutes: cookTime, photo_url: publicUrl }).select().single(); if (insertError) throw insertError; if (!newRecipe) throw new Error("Failed to create recipe."); if (selectedCategories && selectedCategories.length > 0) { const categoryLinks = selectedCategories.map(option => ({ recipe_id: newRecipe.id, category_id: option.value, })); const { error: categoryError } = await supabase.from('recipe_category').insert(categoryLinks); if (categoryError) throw categoryError; } alert('Recipe uploaded successfully!'); router.refresh(); e.target.reset(); setTitle(''); setDescription(''); setInstructions(''); setCookTime(30); setImageFile(null); setSelectedCategories([]); } catch (error) { setError(error.message); console.error(error); } finally { setLoading(false); } };
  const formattedCategories = allCategories.map(category => ({ value: category.id, label: category.category_name }));

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {error && <p className="text-red-500 text-center p-2 bg-red-50 rounded-md">{error}</p>}
      
      {/* ========================================================= */}
      {/* PASTIKAN SEMUA BLOK INPUT DI BAWAH INI ADA DI FILE ANDA */}
      {/* ========================================================= */}

      <div>
        <label htmlFor="title" className="block font-medium text-gray-700">Recipe Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded-md" required />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium text-gray-700">Ingredients</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-2 border rounded-md" rows="3"></textarea>
      </div>

      <div>
        <label htmlFor="instructions" className="block font-medium text-gray-700">Instructions</label>
        <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} className="w-full mt-1 p-2 border rounded-md" rows="6" required></textarea>
      </div>

      <div>
        <label htmlFor="cookTime" className="block font-medium text-gray-700">Cook Time (minutes)</label>
        <input type="number" id="cookTime" value={cookTime} onChange={(e) => setCookTime(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Recipe Photo</label>
        <div className="mt-1 flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <label 
            htmlFor="image-upload" 
            className="cursor-pointer bg-orange-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 transition-colors"
          >
            <span>Choose File</span>
          </label>
          <input 
            id="image-upload" 
            name="image-upload" 
            type="file" 
            className="sr-only"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <span className="text-sm text-gray-500 truncate">
            {imageFile ? imageFile.name : 'No file selected.'}
          </span>
        </div>
      </div>
      
      {/* ========================================================= */}
      {/* BAGIAN KATEGORI DIMULAI DI SINI */}
      {/* ========================================================= */}

      <div>
        <label htmlFor="categories-select" className="block font-medium text-gray-700 mb-2">Categories</label>
        <Select
          id="categories-select"
          isMulti
          options={formattedCategories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          className="basic-multi-select text-gray-800"
          classNamePrefix="select"
          placeholder="Search and select categories..."
          isLoading={allCategories.length === 0}
          isClearable
          isSearchable
        />
      </div>
      
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400">
        {loading ? 'Uploading...' : 'Upload Recipe'}
      </button>
    </form>
  );
}