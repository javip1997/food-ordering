import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const authUser = useSelector((s) => s.auth.user);
  const dark = useSelector((s) => s.theme.dark);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleCheckout = () => {
    if (!authUser) {
      alert("Please login before proceeding to checkout!");
      return nav("/auth");
    }
    nav("/checkout");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Subtle transparent background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 rounded-3xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1170&q=80')",
            zIndex: 0,
          }}
        ></div>

        <h1 className="text-4xl font-bold mb-8 relative z-10 text-center md:text-left">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div
            className={`relative z-10 max-w-md mx-auto p-8 rounded-3xl shadow-lg text-center ${
              dark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
            }`}
          >
            <p className="text-xl">Your cart is empty 😔</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-3xl shadow-lg transition-all duration-300 ${
                    dark
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:shadow-2xl"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p
                      className={`text-sm ${
                        dark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {item.category}
                    </p>
                    <p className="mt-2 text-lg font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-center md:flex-col gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() =>
                        item.qty > 1
                          ? dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                          : dispatch(removeItem(item.id))
                      }
                      className={`px-3 py-1 rounded-lg transition-colors duration-300 ${
                        dark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                      }`}
                    >
                      -
                    </button>
                    <div className="w-8 text-center text-lg">{item.qty}</div>
                    <button
                      onClick={() =>
                        dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                      }
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div
              className="lg:w-1/3 mt-8 lg:mt-0 relative lg:sticky lg:top-20 rounded-3xl p-6 shadow-2xl transition-colors duration-300"
              style={{
                backgroundColor: dark
                  ? "rgba(30, 30, 30, 0.9)"
                  : "rgba(255, 255, 255, 0.95)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span>Items ({items.length})</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Delivery</span>
                <span>₹49</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-2">
                <span>Total</span>
                <span>₹{total + 49}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
