import React, { useEffect, useState } from 'react';
import ItemCard from './ui/ItemCard';
import cardDta from '@/data/cardData.json'

interface Item {
  itemName: string;
  date: string;
  title: string;
  location: string;
  additionalDetails: string;
  contactLink: string;
  imageUrl: string;
}

const Cardsf: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your API endpoint
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
// =====================================
const a = [
    {
      itemName: "Lost Wallet",
      date: "2023-10-01",
      title: "Black Leather Wallet",
      location: "Central Park",
      additionalDetails: "Found near the bench close to the fountain. Contains several cards and some cash.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Car Keys",
      date: "2024-02-15",
      title: "Honda Car Keys",
      location: "Downtown Mall",
      additionalDetails: "Black keychain with a red Honda logo.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Smartphone",
      date: "2023-12-20",
      title: "iPhone 12",
      location: "City Library",
      additionalDetails: "Black iPhone 12 with a cracked screen, found near the entrance.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Backpack",
      date: "2024-01-10",
      title: "Blue Adidas Backpack",
      location: "Subway Station",
      additionalDetails: "Contains books and a laptop charger.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Watch",
      date: "2024-02-05",
      title: "Rolex Silver Watch",
      location: "Shopping Mall",
      additionalDetails: "Silver Rolex watch found near the food court.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Laptop",
      date: "2024-02-25",
      title: "Dell XPS 13",
      location: "Coffee Shop",
      additionalDetails: "Black Dell laptop found at a table near the window.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Gloves",
      date: "2024-01-30",
      title: "Leather Gloves",
      location: "Movie Theater",
      additionalDetails: "Pair of black leather gloves found in seat row 5.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Sunglasses",
      date: "2023-11-15",
      title: "Ray-Ban Sunglasses",
      location: "Park",
      additionalDetails: "Brown Ray-Ban sunglasses found on a park bench.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Umbrella",
      date: "2024-02-01",
      title: "Black Folding Umbrella",
      location: "Train Station",
      additionalDetails: "Left on a seat near Platform 3.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Wallet",
      date: "2024-02-08",
      title: "Brown Leather Wallet",
      location: "Bus Stop",
      additionalDetails: "Contains ID and bank cards.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Headphones",
      date: "2024-02-12",
      title: "Sony WH-1000XM4",
      location: "Library",
      additionalDetails: "Black wireless headphones found at the study desk.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Earrings",
      date: "2024-02-14",
      title: "Gold Hoop Earrings",
      location: "Restaurant",
      additionalDetails: "Found on the floor near Table 7.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Water Bottle",
      date: "2024-02-18",
      title: "Metal Flask",
      location: "Gym",
      additionalDetails: "Blue Hydro Flask bottle left in the locker room.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Hat",
      date: "2024-02-22",
      title: "Black Baseball Cap",
      location: "Amusement Park",
      additionalDetails: "Has a red logo on the front.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Book",
      date: "2024-02-24",
      title: "Harry Potter and the Sorcerer’s Stone",
      location: "University Campus",
      additionalDetails: "A hardcover edition found near the cafeteria.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Tablet",
      date: "2024-02-28",
      title: "Samsung Galaxy Tab",
      location: "Office Lobby",
      additionalDetails: "Black tablet with a stylus, found on a chair.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Ring",
      date: "2024-02-29",
      title: "Silver Wedding Ring",
      location: "Hotel Lobby",
      additionalDetails: "Engraved with initials 'J&D'.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Coat",
      date: "2024-03-01",
      title: "Black Winter Coat",
      location: "Airport Lounge",
      additionalDetails: "Large size, found on a sofa.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Camera",
      date: "2024-03-02",
      title: "Canon DSLR Camera",
      location: "Tourist Attraction",
      additionalDetails: "Black Canon camera with a zoom lens.",
      contactLink: "mailto:contact@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    },
    {
      itemName: "Scarf",
      date: "2024-03-03",
      title: "Woolen Scarf",
      location: "Coffee Shop",
      additionalDetails: "Striped red and white scarf found on a chair.",
      contactLink: "mailto:found@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphon/300x200/?iphon"
    }
  ];
  
// =====================================
  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {a.map((item, index) => (
            <ItemCard
              key={index}
              itemName={item.itemName}
              date={item.date}
              title={item.title}
              location={item.location}
              additionalDetails={item.additionalDetails}
              contactLink={item.contactLink}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cardsf;