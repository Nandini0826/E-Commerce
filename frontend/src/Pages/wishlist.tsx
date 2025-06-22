import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistitem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("wishlist useEffect running!"); 
  axios.get('http://localhost:3000/users/getwishlist', {
    headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
      console.log("wishlist data:", response.data.wishlist);
      setWishlistitem(response.data.wishlist || []);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching cart:', error);
      setLoading(false);
    });
}, []); 


  if (loading) return <div>Loading...</div>;
  return (
    <div className='wishlist bg-[#FFFFF0]'>
      <NavBar />
      <div className="font-mono text-[44px] p-4 text-center">wishlist</div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 m-5 gap-4">
        {wishlistItems?.map((product) => (
          <div
            className="product-card h-[550px] w-[300px] border-b-[#C28840] p-4 rounded shadow"

            key={product._id}
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[370px] w-full p-3 rounded object-cover"              />
            )}
            <h2>{product.name}</h2>
            <p>{product.details}</p>
            <p>Price: ₹{product.price}</p>
            {product.discount && <p>Discount: {product.discount}%</p>}
            {/* Add to cart or details button here */}
            <div className="p-2 flex flex-row">
              <button className="p-2">Remove from wishlist</button>
              <button className="p-2">Order</button>
                
            </div>
          </div>
         ))}
      </div>
      
    </div> 
    
  )
}

export default Wishlist;