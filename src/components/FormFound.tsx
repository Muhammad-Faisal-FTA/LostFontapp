// components/ItemForm.tsx
"use client"
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ItemFormInputs {
  name: string;
  item: string;
  location: string;
  date: string;
  description: string;
  photo: FileList;
}

const FormFound = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ItemFormInputs>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [itemId, setItemId] = useState<string | null>(null);
  
    const onSubmit: SubmitHandler<ItemFormInputs> = async (data) => {
      setLoading(true);
      setMessage('');
      
      // const formData = new FormData();
      // formData.append('name', data.name);
      // formData.append('item', data.item);
      // formData.append('location', data.location);
      // formData.append('date', data.date);
      // formData.append('description', data.description);
      // if (data.photo.length > 0) {
      //   formData.append('photo', data.photo[0]);
      // }
  
      try {
           console.log(data,"QWeqweqwrqwerwet")
        // const response = await axios.post('https://dummyjson.com/posts', formData, {
        //   headers: { 'Content-Type': 'multipart/form-data' },
        // });
        setMessage('Item posted successfully!');
        // setItemId(response.data.id); // Assuming the response contains an ID
      } catch (error) {
        setMessage('Failed to post item.');
      }
      setLoading(false);
    };
  // Delete button
    const handleDelete = async () => {
      if (!itemId) return;
  
      setLoading(true);
      setMessage('');
  
      try {
        await axios.delete(`https://www.somthing.item/${itemId}`);
        setMessage('Item deleted successfully!');
        setItemId(null);
      } catch (error) {
        setMessage('Failed to delete item.');
      }
      setLoading(false);
    };
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Post an Item</h2>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium">Item:</label>
            <input
              {...register('item', { required: 'Item name is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Item name"
            />
            {errors.item && <p className="text-red-500 text-sm">{errors.item.message}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium">Location:</label>
            <select
              {...register('location', { required: 'Location is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select location</option>
              <option value="Location1">Location 1</option>
              <option value="Location2">Location 2</option>
            </select>
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium">Date:</label>
            <input
              type="date"
              {...register('date', { required: 'Date is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium">Item Description:</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Item description"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
  
          <div>
            <label className="block text-sm font-medium">Upload Photo:</label>
            <input
              type="file"
              {...register('photo', { required: 'Photo is required' })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Item'}
          </button>
        </form>
  
  {/* Delete button */}
        {itemId && (
          <button
            onClick={handleDelete}
            className="w-full mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Item'}
          </button>
        )}
      </div>
    );
  };
export default FormFound;