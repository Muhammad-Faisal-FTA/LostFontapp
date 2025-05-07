
'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/ui/ItemCard';

interface Item {
  _id: string;
  name: string;
  item: string;
  location: string;
  date: string;
  description: string;
  contactLink?: string;
  photo: {
    url: string;
    public_id: string;
  };
}

const SearchItems = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Load tokens on mount
  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    setAccessToken(access);
    setRefreshToken(refresh);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://lost-and-found-backend-v9hr.onrender.com/api/v1/found-items/search?item=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 401) {
        // Optional: Try refresh token flow here
        throw new Error('Unauthorized: Access token expired');
      }

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();

      const mappedItems = (data.data || []).map((item: any) => ({
        _id: item._id,
        name: item.name,
        item: item.item,
        location: item.location,
        date: item.date,
        description: item.description,
        contactLink: item.contactLink || 'mailto:someone@example.com',
        photo: {
          url: item.photo?.url || '',
          public_id: item.photo?.public_id || '',
        },
      }));

      setItems(mappedItems);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (_id: string) => {
    alert('Delete function not implemented.');
  };

  return (
    <div className="w-full px-4 py-6 max-w-5xl mx-auto">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search items by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {/* Loading/Error */}
      {loading && <p className="text-center">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            itemName={item.name}
            date={item.date.slice(0, 10)}
            title={item.item}
            location={item.location}
            additionalDetails={item.description}
            contactLink={item.contactLink}
            imageUrl={item.photo.url}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchItems;
