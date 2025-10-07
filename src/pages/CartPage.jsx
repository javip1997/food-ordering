import { useSelector, useDispatch } from "react-redux"
import { updateQty, removeItem } from "../redux/cartSlice"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const items = useSelector(s => s.cart.items)
  const profile = useSelector(s => s.profile)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const total = items.reduce((acc,i)=> acc + i.price * i.qty, 0)

  const handleCheckout = () => {
    if (!profile.loggedIn) return nav("/login")
    if (!profile.name || !profile.phone || !profile.address) return nav("/profile")
    nav("/checkout")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center bg-white p-8 rounded shadow">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">₹{item.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => item.qty>1 ? dispatch(updateQty({id:item.id, qty:item.qty-1})) : dispatch(removeItem(item.id))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                  <div className="w-8 text-center">{item.qty}</div>
                  <button onClick={() => dispatch(updateQty({id:item.id, qty:item.qty+1}))} className="px-3 py-1 bg-blue-600 text-white rounded">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2 bg-blue-50 border border-blue-200 p-4 rounded shadow">
              <div className="font-semibold text-blue-800">Total</div>
              <div className="text-2xl font-bold text-blue-900">₹{total}</div>
            </div>

            <div className="w-full md:w-1/2 flex justify-end">
              <button onClick={handleCheckout} className="px-6 py-3 bg-green-600 text-white rounded-lg">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
