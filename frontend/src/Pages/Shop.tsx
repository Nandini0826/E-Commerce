import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

const authAxios = axios.create({ baseURL: "http://localhost:3000" });
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type JwtPayload = {
  id: string;
  exp: number;
  iat: number;
};

const Shop = () => {
  type Product = {
    _id: string;
    name: string;
    details: string;
    price: number;
    discount?: number;
    imageUrl?: string;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
    const [success, setSuccess] = useState('');
  

const token = localStorage.getItem("token");
  const wishlist = async (productId: string) => {
    console.log("whishlist");
     if (!userId) {
    console.error("User not authenticated");
    return;
    }
    authAxios.post(`/users/wishlist`, { productId })
    .then(() => setSuccess('Added to wishlist!'))
    .catch((err) => console.error("Wishlist error:", err));
  
    
  };
  const cart = async (productId: string) => {
    console.log("cart");
     if (!userId) {
    console.error("User not authenticated");
    return;
    }
    authAxios.post(`/users/cart`, { productId })
    .then(() => setSuccess('Added to cart!'))
    .catch((err) => console.error("Cart error:", err));
  
    
  };
  useEffect(() => {
  if (!token) {
    // Redirect to login if no token
    window.location.href = '/';
    return;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
     if (Date.now() >= decoded.exp * 1000) { 
      throw new Error("Token expired");
    }
    setUserId(decoded.id); // <-- This sets userId state
  } catch (err) {
    // Handle invalid token
    localStorage.removeItem('access');
    window.location.href = '/';
  }

    authAxios
  .get("/products/shop")
  .then((res) => setProducts(res.data.products || []))
  .catch((err) => {
    console.error("Fetch products error:", err);
    setError("Failed to load products");
  })
  .finally(() => setLoading(false));

  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="shop-page bg-[#FFFFF0]">
      <NavBar />
      <div className="font-mono text-[44px] p-4 text-center">Shop</div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 m-5 gap-4">
        {products.map((product) => (
          <div
            className="product-card h-[550px] w-[300px] p-4 border-rounded shadow"
            key={product._id}
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[370px] w-full p-3 border-rouded object-cover"
              />
            )}
            <h2>{product.name}</h2>
            <p>{product.details}</p>
            <p>Price: ₹{product.price}</p>
            {product.discount && <p>Discount: {product.discount}%</p>}
            {/* Add to cart or details button here */}
            <div className="p-2 flex flex-row">
              <button className="p-2" onClick={() => cart(product._id)}>Add to Cart</button>
              <button className="p-2" onClick={() => wishlist(product._id)}>
                whishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
