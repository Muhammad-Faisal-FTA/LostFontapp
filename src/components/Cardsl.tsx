import React, { useEffect, useState } from 'react';
import ItemCard from './ui/ItemCard';

interface Item {
  itemName: string;
  date: string;
  title: string;
  location: string;
  additionalDetails: string;
  contactLink: string;
  imageUrl: string;
}

const Cardsl: React.FC = () => {
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
    // {
    //   itemName: "Black Backpack",
    //   date: "2024-03-01",
    //   title: "Nike Sports Backpack",
    //   location: "Train Station",
    //   additionalDetails: "Contains books, a water bottle, and a laptop charger.",
    //   contactLink: "mailto:lost@example.com",
    //   imageUrl: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
    // },
    {
      itemName: "iPhone 13",
      date: "2024-02-28",
      title: "White iPhone 13",
      location: "Coffee Shop",
      additionalDetails: "Has a cracked screen and a blue case.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?iphone"
    },
    // {
    //   itemName: "Car Keys",
    //   date: "2024-02-25",
    //   title: "Toyota Keychain",
    //   location: "Supermarket Parking Lot",
    //   additionalDetails: "Set of keys with a small blue keychain.",
    //   contactLink: "mailto:lost@example.com",
    //   imageUrl: "https://www.istockphoto.com/photo/bearded-it-specialist-in-glasses-is-working-on-laptop-in-data-center-while-standing-gm1131198385-299447941"
    // },
    {
      itemName: "Gold Necklace",
      date: "2024-02-20",
      title: "18K Gold Chain",
      location: "Beach Boardwalk",
      additionalDetails: "Small pendant with an engraving.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?necklace"
    },
    {
      itemName: "Laptop",
      date: "2024-02-18",
      title: "MacBook Pro",
      location: "University Library",
      additionalDetails: "Silver MacBook Pro with stickers on the cover.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?laptop"
    },
    {
      itemName: "Sunglasses",
      date: "2024-02-15",
      title: "Ray-Ban Aviators",
      location: "Park Bench",
      additionalDetails: "Black and gold frame with a case.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?sunglasses"
    },
    {
      itemName: "Wallet",
      date: "2024-02-12",
      title: "Brown Leather Wallet",
      location: "Gas Station",
      additionalDetails: "Contains ID and credit cards.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?wallet"
    },
    {
      itemName: "Headphones",
      date: "2024-02-10",
      title: "Sony WH-1000XM4",
      location: "Airport Terminal",
      additionalDetails: "Black wireless headphones left on a seat.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?headphones"
    },
    {
      itemName: "Ring",
      date: "2024-02-08",
      title: "Diamond Wedding Ring",
      location: "Hotel Lobby",
      additionalDetails: "Engraved with initials 'A & B'.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?ring"
    },
    {
      itemName: "Jacket",
      date: "2024-02-05",
      title: "Black North Face Jacket",
      location: "Movie Theater",
      additionalDetails: "Has a small tear on the sleeve.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?jacket"
    },
    {
      itemName: "Smartwatch",
      date: "2024-02-02",
      title: "Apple Watch Series 7",
      location: "Gym Locker Room",
      additionalDetails: "Black sports band, last seen near the treadmill.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?smartwatch"
    },
    {
      itemName: "Umbrella",
      date: "2024-01-30",
      title: "Blue Compact Umbrella",
      location: "Train Station Platform",
      additionalDetails: "Foldable and has a silver handle.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?umbrella"
    },
    {
      itemName: "Camera",
      date: "2024-01-25",
      title: "Canon DSLR Camera",
      location: "Tourist Attraction",
      additionalDetails: "Black Canon camera with a zoom lens.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?camera"
    },
    {
      itemName: "Tablet",
      date: "2024-01-22",
      title: "Samsung Galaxy Tab",
      location: "Bus Stop",
      additionalDetails: "Has a stylus attached.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?tablet"
    },
    {
      itemName: "Earbuds",
      date: "2024-01-20",
      title: "AirPods Pro",
      location: "Cafe Table",
      additionalDetails: "White charging case with scratches.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?earbuds"
    },
    {
      itemName: "ID Card",
      date: "2024-01-18",
      title: "University Student ID",
      location: "Public Bus",
      additionalDetails: "Plastic card with a blue lanyard.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?id-card"
    },
    {
      itemName: "Scarf",
      date: "2024-01-15",
      title: "Woolen Scarf",
      location: "Coffee Shop",
      additionalDetails: "Striped red and white scarf found on a chair.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?scarf"
    },
    {
      itemName: "Book",
      date: "2024-01-12",
      title: "Harry Potter and the Sorcerer’s Stone",
      location: "Library",
      additionalDetails: "Hardcover edition with a red bookmark.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?book"
    },
    {
      itemName: "Notebook",
      date: "2024-01-10",
      title: "Black Moleskine Notebook",
      location: "Office Lobby",
      additionalDetails: "Leather cover with handwritten notes inside.",
      contactLink: "mailto:lost@example.com",
      imageUrl: "https://source.unsplash.com/300x200/?notebook"
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

export default Cardsl;