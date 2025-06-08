'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', query);
    // Add search logic here
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white  px-4 py-2 shadow-md w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent text-gray-800"
      />
 
    </form>
  );
}
