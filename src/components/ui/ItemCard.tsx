import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ItemCardProps {
  itemName: string;
  date: string;
  title: string;
  location: string;
  additionalDetails: string;
  contactLink?: string;
  imageUrl: string;
  onDelete?: () => void; // Optional delete function
}

const ItemCard: React.FC<ItemCardProps> = ({
  itemName,
  date,
  title,
  location,
  additionalDetails,
  contactLink,
  imageUrl,
  onDelete,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 border border-gray-300 flex flex-col h-full">
      {/* Header Section */}
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
      <div className="w-full h-[16rem] bg-gray-200 flex justify-center items-center">
        <Image
          className="w-full h-[16rem] object-fill p-2 rounded-md"
          width={200}
          height={150}
          src={imageUrl}
          alt={title}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow">
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-gray-700 text-sm mt-3">{additionalDetails}</p>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 mt-auto space-y-2">
        <Link
          href={contactLink || '/chat'}
          className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Contact
        </Link>

        {onDelete && (
          <button
            onClick={onDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
