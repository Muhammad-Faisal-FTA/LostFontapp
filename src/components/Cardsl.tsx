import React, { useEffect, useState } from 'react';
import ItemCard from './ui/ItemCard';

interface Item {
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
// lost item shows hare
const Cardsl: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lost-and-found-backend-eosin.vercel.app/api/v1/lost-items/get-lostitems'); // Replace with your API endpoint
        const result = await response.json();
        setItems(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
// =====================================
  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              itemName={item.name}
              date={item.date.slice(0, 10)}
              title={item.item}
              location={item.location}
              additionalDetails={item.description}
              contactLink={`mailto:someone@example.com`}// contect link for message
              imageUrl={item.photo.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cardsl;