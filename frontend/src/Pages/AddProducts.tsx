import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBaradmin';
const AddProducts = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [name, setName] = useState()
  const [details, setDetails] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    setName('');
    setPrice('');
    setDiscount('');
    setDetails('');
    setImage(null);
    setPreview(null);
       
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('details', details);
    formData.append('price', price);
    formData.append('discount', discount);
    try {
      const endpoint = 'http://localhost:3000/products/create';
      const response = await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Important!
        },
      });
      if (response.data.message) {
        setSuccess(response.data.message);
      }
    }
    catch (err) {
        console.log("Full error object:", err); // Log the entire error
        if (err.response) {
          // Backend responded with an error (4xx/5xx)
          setError(err.response.data.error || "Server error");
        } else if (err.request) {
          // Request made, but no response (network issue)
          setError("Network error - check your connection");
        } else {
          // Other errors (e.g., Axios config issues)
          setError("Request setup failed");
        }
      }
    }

  return (
    <div className='bg-[#FFFFF0]'>
      <NavBar />

      <form className='flex flex-col items-center w-[90%] max-w-md mx-auto mt-14 gap-4 text-gray-700' onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
{success && <div className="text-green-500">{success}</div>}

      <input type="file" accept="image/*" placeholder='image' onChange={handleImageChange} className='w-full px-3 py-3 border border-gray-300 rounded-md' required />
        {preview && <img src={preview} alt="Preview" className="w-48 h-48 object-cover" />}
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of the Product' className='w-full px-3 py-3 border border-[#FFC107] bg-[#FFFFF0] rounded-md' required />
        <input type='text' value={details} onChange={(e) => setDetails(e.target.value)} placeholder='Details' className='w-full px-3 py-3 border border-[#FFC107] bg-[#FFFFF0] rounded-md' required />
        <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Prize' className='w-full px-3 py-3 border border-[#FFC107] bg-[#FFFFF0] rounded-md' required />
        <input type='text' value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder='Discount' className='w-full px-3 py-3 border border-[#FFC107] bg-[#FFFFF0] rounded-md'/>
        <button type="submit" className='bg-black text-white font-light py-4 px-20 mt-4 rounded-md hover:bg-[#FF69B4] transition'>Submit</button>
      </form>
    </div>
  )
}

export default AddProducts