import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import { useNavigate } from "react-router-dom"

export default function CheckoutPage() {
  const items = useSelector(s => s.cart.items)
  const profile = useSelector(s => s.profile)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const total = items.reduce((acc,i)=> acc + i.price * i.qty, 0)

  const placeOrder = () => {
    // static place order
    dispatch(clearCart())
    // in a real app we'd call API; here show confirmation page or alert
    alert("Order placed successfully! Thank you.")
    nav("/")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="font-semibold">Deliver to</div>
        <div>{profile.name}</div>
        <div>{profile.phone}</div>
        <div>{profile.address}</div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        {items.map(it => (
          <div key={it.id} className="flex justify-between py-2 border-b">
            <div>{it.name} x {it.qty}</div>
            <div>₹{it.price * it.qty}</div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4 text-right">
        <div className="text-lg font-bold">Total: ₹{total}</div>
      </div>

      <div className="flex justify-end">
        <button onClick={placeOrder} className="px-6 py-3 bg-green-600 text-white rounded">Place Order</button>
      </div>
    </div>
  )
}
