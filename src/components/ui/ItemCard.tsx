import React from 'react';
import Image from 'next/image'
import Link from  'next/link';
interface ItemCardProps {
  itemName: string;
  date: string;
  title: string;
  location: string;
  additionalDetails: string;
  contactLink: string;
  imageUrl: string; // New prop for the image URL
}

const ItemCard: React.FC<ItemCardProps> = ({
  itemName,
  date,
  title,
  location,
  additionalDetails,
//   contactLink,
  imageUrl,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 border border-gray-300 flex flex-col h-full">
      {/* Header Section of cards */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center rounded-full font-bold text-lg">
          {itemName?.charAt(0).toUpperCase() || "?"}
        </div>
        <div>
          <p className="font-bold text-gray-900">{itemName}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
  
      {/* Image Section */}
      <div className="w-full h-32 bg-gray-200 flex justify-center items-center">
        <Image className="w-full h-40 object-cover py-3 rounded-md" width={200} height={15} src={imageUrl} alt={itemName} />
      </div>
  
      {/* Content Section */}
      <div className="p-4 flex-grow">
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-gray-700 text-sm mt-3">{additionalDetails}</p>
      </div>
  
      {/* Contact Button (Fixed at Bottom) */}
      <div className="px-4 pb-4 mt-auto">
        <Link
          href={'/chat'}
          className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;