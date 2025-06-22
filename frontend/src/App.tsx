import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Shop from "./Pages/Shop";
import AdminAuthentication from "./Pages/AdminAuthentication";
import AddProducts from "./Pages/AddProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/wishlist";
import Order from "./Pages/Order";
import './index.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Authentication />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<AdminAuthentication /> } />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/cart" element={<Cart /> } />
          <Route path="/wishlist" element={<Wishlist /> } />
          <Route path="/order" element={<Order /> } />
      </Routes>
      <Footer />
      </BrowserRouter>
     
      
    </>
  );
}

export default App;
