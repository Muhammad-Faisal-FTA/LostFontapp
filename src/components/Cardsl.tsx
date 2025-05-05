import React, { useEffect, useState } from 'react';
import ItemCard from './ui/ItemCard';
import axios from 'axios';

interface Item {
  _id: string;
  name: string;
  item: string;
  location: string;
  date: string;
  description: string;
  userId: string; // ID of the user who posted the item
  photo: {
    url: string;
    public_id: string;
  };
}

const Cardsl: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Decode user from token (basic)
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload?.userId || payload?.id); // Adjust depending on your backend
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://lost-and-found-backend-eosin.vercel.app/api/v1/lost-items/get-lostitems'
        );
        const result = await response.json();
        setItems(result.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("You must be logged in to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoadingId(id);
    try {
      await axios.delete(
        `https://lost-and-found-backend-eosin.vercel.app/api/v1/lost-items/delete-lostitem/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item.");
    }
    setLoadingId(null);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              itemName={item.name}
              date={item.date.slice(0, 10)}
              title={item.item}
              location={item.location}
              additionalDetails={item.description}
              contactLink={`mailto:someone@example.com`}
              imageUrl={item.photo.url}
              onDelete={() => handleDelete(item._id)}
              canDelete={item.userId === currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cardsl;
