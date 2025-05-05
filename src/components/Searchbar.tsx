// import React, {useState} from 'react'

// const Searchbar = () => {
//     const [searchData, setSearchData] = useState({
//         search : ""
//     });
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // search sending ...
//         if (searchData.search) {
//           console.log("Form submitted");
//           alert("Your Search is:! "+searchData.search);
//           setSearchData({ search: '' }); 
//         }
//       };
//   return (
//     <div className='w-[100%] md:w-[40%'>
//       <form className="max-w-md mx-auto" onSubmit={handleSubmit}>   
//        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//        <div className="relative">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//             </svg>
//         </div>
//         <input type="search" id="search" className="block w-full p-4 ps-10 text-sm 
//         text-gray-900 border border-gray-300 rounded-[1rem] bg-gray-50 focus:ring-blue-500 
//         focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
//         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Search your items..." required 
//         onChange={(e) => {
//             setSearchData({
//             //   ...searchData, // Keep existing values
//             search: e.target.value, // Update the "email" field
//             });
//           }}
//         />
//         <button type="submit"  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700
//          hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
//          text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//     </div>
// </form>
//     </div>
//   )
// }

// export default Searchbar
import React, { useState } from 'react';

interface LostItem {
  _id: string;
  item: string;
  description: string;
  // add any other fields your API returns…
}

const Searchbar: React.FC = () => {
  const [item, setitem] = useState('');
  const [results, setResults] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://lost-and-found-backend-v9hr.onrender.com/api/v1/lost-items/search?item=${encodeURIComponent(
          item
        )}`
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      // assuming your API returns { data: […] }
      setResults(json.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setitem('');
    }
  };

  return (
    <div className="w-[100%] md:w-[40%]">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="search"
            type="search"
            value={item}
            onChange={(e) => setitem(e.target.value)}
            className="block w-full p-4 ps-10 text-sm 
              text-gray-900 border border-gray-300 rounded-[1rem] bg-gray-50 focus:ring-blue-500 
              focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search your items..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700
              hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* feedback */}
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* results */}
      {results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.map((item) => (
            <li key={item._id} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">{item.item}</h3>
              <p className="text-gray-700">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
