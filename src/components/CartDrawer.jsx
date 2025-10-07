import { useSelector, useDispatch } from "react-redux"
import { removeItem, updateQty, clearCart } from "../redux/cartSlice"

export default function CartDrawer({ onClose }) {
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-5 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>

      {items.length === 0 && <p className="text-gray-500">Cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                item.qty > 1
                  ? dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                  : dispatch(removeItem(item.id))
              }
              className="px-2 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
              className="px-2 bg-blue-600 text-white rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="mt-4">
          <p className="font-bold text-lg">Total: ₹{total}</p>
          <button
            onClick={() => {
              dispatch(clearCart())
              onClose()
            }}
            className="w-full bg-green-600 text-white py-2 mt-3 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}
