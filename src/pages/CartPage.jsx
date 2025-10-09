import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const profile = useSelector((s) => s.profile);
  const authUser = useSelector((s) => s.auth.user);
  const isDark = useSelector((s) => s.theme.dark);
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
      className={`max-w-3xl mx-auto p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div
          className={`text-center p-8 rounded shadow ${
            isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
          }`}
        >
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded shadow transition-colors duration-300 ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <div
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.qty > 1
                        ? dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                        : dispatch(removeItem(item.id))
                    }
                    className={`px-3 py-1 rounded transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                  >
                    -
                  </button>
                  <div className={`w-8 text-center ${isDark ? "text-white" : ""}`}>
                    {item.qty}
                  </div>
                  <button
                    onClick={() =>
                      dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className={`w-full md:w-1/2 p-4 rounded shadow transition-colors duration-300 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-blue-50 border border-blue-200 text-blue-900"
              }`}
            >
              <div className="font-semibold">Total</div>
              <div className="text-2xl font-bold">₹{total}</div>
            </div>

            <div className="w-full md:w-1/2 flex justify-end">
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
