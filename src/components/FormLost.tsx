'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ItemFormInputs {
  name: string;
  item: string;
  location: string;
  date: string;
  description: string;
  photo: FileList;
}

const FormLost = () => {
  const { register, handleSubmit, formState: { errors }, reset  } = useForm<ItemFormInputs>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [itemId, setItemId] = useState<string | null>(null);
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useEffect(() => {
    if (!token) {
      alert('You must be logged in to access this page.');
      router.push('/signin'); // Redirect if not authenticated
    }
  }, [token, router]);

  const onSubmit: SubmitHandler<ItemFormInputs> = async (data) => {
    if (!token) return;

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('item', data.item);
    formData.append('location', data.location);
    formData.append('date', data.date);
    formData.append('description', data.description);
    if (data.photo.length > 0) {
      formData.append('photo', data.photo[0]);
    }
// https://lost-and-found-backend-v9hr.onrender.com/api/v1/lost-items/report-lost-item
    try {
      const response = await axios.post(
        'https://lost-and-found-backend-v9hr.onrender.com/api/v1/lost-items/report-lost-item',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Item posted successfully!');
      setTimeout(()=>{
       setMessage('')
      },5000)
      setItemId(response.data.id); // Adjust if backend returns a different key
      reset(); // <-- thisresets the form
    } catch (error: any) {
      console.error('Upload error:', error);
      setMessage('❌ Failed to post item.');
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!itemId || !token) return;

    setLoading(true);
    setMessage('');

    try {
      await axios.delete(
        `https://lost-and-found-backend-v9hr.onrender.com/api/v1/api/v1/lost-items/delete/${itemId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setMessage('🗑️ Item deleted successfully!');
      setItemId(null);
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('❌ Failed to delete item.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Post a Lost Item</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded-lg"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Item:</label>
          <input
            {...register('item', { required: 'Item name is required' })}
            className="w-full p-2 border rounded-lg"
            placeholder="Item name"
          />
          {errors.item && <p className="text-red-500 text-sm">{errors.item.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Location:</label>
          <input
        type="text"
        {...register('location', { required: 'Location is required' })}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter location"
       />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border rounded-lg"
            placeholder="Item description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Photo:</label>
          <input
            type="file"
            {...register('photo', { required: 'Photo is required' })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Lost Item'}
        </button>
      </form>

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

export default FormLost;
