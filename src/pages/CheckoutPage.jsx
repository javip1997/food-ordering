import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { updateAddress, saveProfile } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const items = useSelector((s) => s.cart.items);
  const profile = useSelector((s) => s.profile);
  const authUser = useSelector((s) => s.auth.user); 
  const isDark = useSelector((s) => s.theme.dark);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const [address, setAddress] = useState(profile.address || profile.location || "");

  // Sync profile from auth.user if missing
  useEffect(() => {
    if (authUser) {
      if (!profile.name || !profile.phone || !profile.address) {
        dispatch(
          saveProfile({
            name: authUser.name || profile.name,
            email: authUser.email || profile.email,
            phone: authUser.phone || profile.phone,
            address: authUser.address || profile.address,
            location: authUser.location || profile.location,
          })
        );
      }
    }
  }, [authUser]);

  useEffect(() => {
    setAddress(profile.address || profile.location || "");
  }, [profile.address, profile.location]);

  const placeOrder = () => {
    if (!authUser) {
      alert("Please login before placing an order!");
      nav("/auth");
      return;
    }

    dispatch(clearCart());
    alert("Order placed successfully! Thank you.");
    nav("/");
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Order Summary</h1>

      {/* Deliver to */}
      <div
        className={`p-4 rounded shadow mb-4 transition-colors duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="font-semibold mb-1">Deliver to</div>
        <div>{profile.name || "Name not provided"}</div>
        <div>{profile.phone || "Phone not provided"}</div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className={`mt-2 px-3 py-2 w-full border rounded transition-colors duration-300 ${
            isDark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div>

      {/* Cart Items */}
      <div
        className={`p-4 rounded shadow mb-4 transition-colors duration-300 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {items.length === 0 ? (
          <div className="text-center py-4">Your cart is empty</div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex justify-between py-2 border-b last:border-b-0">
              <div>
                {it.name} x {it.qty}
              </div>
              <div>₹{it.price * it.qty}</div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div
        className={`border p-4 rounded mb-4 text-right transition-colors duration-300 ${
          isDark
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-blue-50 border-blue-200 text-gray-900"
        }`}
      >
        <div className="text-lg font-bold">Total: ₹{total}</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={placeOrder}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
