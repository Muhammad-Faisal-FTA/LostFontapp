

import React, { useEffect, useState } from 'react';
import ItemCard from './ui/ItemCard';
import cardDta from '@/data/cardData.json';
import axios from 'axios';

interface Item {
  userId: string;

  _id: string;
  name: string;
  item: string;
  location: string;
  date: string;
  description: string;
  photo: {
    url: string;
    public_id: string;
  };
}

const Cardsf: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/found-items/get-founditems');
        const result = await response.json();
        setItems(result.data || []);
        if (result.data.length === 0) {
          alert("Successful, but there is no item in the database...");
        }
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
        `https://lost-and-found-backend-v9hr.onrender.com/api/v1/found-items/delete-founditem/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      alert("🗑️ Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item", error);
      alert("❌ Failed to delete item.");
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
              _id={item._id}
              userId={item.userId}
              itemName={item.name}
              date={item.date.slice(0, 10)}
              title={item.item}
              location={item.location}
              additionalDetails={item.description}
              contactLink={`mailto:someone@example.com`}
              imageUrl={item.photo.url}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cardsf;

// interface Item {
//   _id: string;
//   name: string;
//   item: string;
//   location: string;
//   date: string;
//   description: string;
//   photo: {
//     url: string;
//     public_id: string;
//   };
//   createdBy: string;
// }

// import React, { useEffect, useState } from 'react';
// import ItemCard from './ui/ItemCard';

// const Cardsf: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     setUserId(storedUserId);

//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/found-items/get-founditems');
//         const result = await response.json();
//         setItems(result.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id: string) => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) return alert("Unauthorized");

//     try {
//       await fetch(`https://lost-and-found-backend-eosin.vercel.app/api/v1/found-items/delete-founditem/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setItems(prev => prev.filter(item => item._id !== id));
//     } catch (err) {
//       console.error("Failed to delete:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen p-4">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {items.map((item) => (
//             <ItemCard
//               key={item._id}
//               itemName={item.name}
//               date={item.date.slice(0, 10)}
//               title={item.item}
//               location={item.location}
//               additionalDetails={item.description}
//               contactLink="/chat"
//               imageUrl={item.photo.url}
//               onDelete={userId === item.createdBy ? () => handleDelete(item._id) : undefined}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cardsf;
