import React from 'react';
import SearchItems from '@/components/SearchItemslost';

const SearchPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Search 
        lost  Items</h1>
      <SearchItems />
    </main>
  );
};

export default SearchPage;
