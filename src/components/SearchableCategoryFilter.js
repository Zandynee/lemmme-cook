'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Select from 'react-select'; // Gunakan lagi react-select

export default function SearchableCategoryFilter({ selectedOption, onCategoryChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('id, category_name')
        .order('category_name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        // Ubah format data agar sesuai dengan react-select: { value, label }
        const formattedOptions = data.map(cat => ({
          value: cat.id,
          label: cat.category_name
        }));
        
        // Tambahkan opsi "All Categories" di paling atas
        setOptions([
          { value: 'all', label: 'All Categories' },
          ...formattedOptions
        ]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <Select
      instanceId="category-filter-select"
      options={options}
      value={selectedOption}
      onChange={onCategoryChange}
      isLoading={loading}
      isClearable={true}
      placeholder="Filter by category..."
      className="text-left"
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '0.75rem', // rounded-lg
          padding: '0.25rem',
        }),
      }}
    />
  );
}