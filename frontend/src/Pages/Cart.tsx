import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const Cart = () => {
  const [cartitem, setcartitem] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalBill, setTotalBill] = useState(0);
  const [currency, setCurrency] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/getcart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setcartitem(response.data.cart || []);
      setTotalBill(response.data.totalBill || 0);
      setCurrency(response.data.currency || "₹");

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    console.log(
      "Calling updateQuantity with productId:",
      productId,
      "newQuantity:",
      newQuantity
    );

    try {
      const response = await axios.put(
        "http://localhost:3000/users/updatecart",
        {
          productId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Update response:", response.data);
      fetchCart();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-[#FFFFF0]">
      <NavBar />
      <div className="font-mono text-[44px] p-4 text-center">
        Cart
        <div className=" m-5 gap-4">
          {cartitem.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartitem.map((item) => (
              <div key={item.cartItemId} className="border flex p-4 rounded-lg">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={182}
                    height={72}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-600">
                    {item.discountPercentage > 0 && (
                      <>
                        <span className="line-through mr-2">
                          {currency}
                          {item.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-green-600">
                          (-{item.discountPercentage}%)
                        </span>
                      </>
                    )}
                    <div className="mt-2">
                      {currency}
                      {item.discountedPrice.toFixed(2)} x {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cartitem.map(item => (
              <div key={item.cartItemId} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>{currency}{item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>{currency}{totalBill.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button>Check Out</button>
      </div>
      
    </div>
  );
};

export default Cart;
