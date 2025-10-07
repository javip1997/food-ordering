import { useDispatch, useSelector } from "react-redux"
import { addItem, updateQty, removeItem } from "../redux/cartSlice"

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const cart = useSelector(s => s.cart.items)
  const inCart = cart.find(i => i.id === product.id)

  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col">
      <img src={product.image} alt={product.name} className="h-36 w-full object-cover rounded mb-3"/>
      <h4 className="font-semibold">{product.name}</h4>
      <p className="text-sm text-gray-500">{product.category}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-bold">₹{product.price}</div>
        {!inCart ? (
          <button onClick={() => dispatch(addItem(product))} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        ) : (
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => inCart.qty>1 ? dispatch(updateQty({ id: product.id, qty: inCart.qty -1 })) : dispatch(removeItem(product.id))}>-</button>
            <div className="w-6 text-center">{inCart.qty}</div>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => dispatch(updateQty({ id: product.id, qty: inCart.qty +1 }))}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}
