import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../cart.css"

function Cart() {

  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCartItems(storedCart)
  }, [])

  const removeFromCart = (id) => {

    const updatedCart = cartItems.filter(item => item.flightId !== id)

    setCartItems(updatedCart)

    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.passengers,
      0
    )
  }

  const totalPassengers = cartItems.reduce(
    (total, item) => total + item.passengers,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/flights")}>
          Browse Flights
        </button>
      </div>
    )
  }

  return (
    <div className="cart-page">

      <h1>Flight Summary</h1>

      {cartItems.map(item => (
        <div key={item.flightId} className="flight-card">

          <h3>{item.airline}</h3>

          <p>{item.from} → {item.to}</p>
          <p>{item.departureTime} - {item.arrivalTime}</p>
          <p>{item.duration}</p>

          <p>${item.price}</p>

          <button onClick={() => removeFromCart(item.flightId)}>
            Remove
          </button>

        </div>
      ))}

      <div>
        <h3>Passengers: {totalPassengers}</h3>
        <h3>Total: ${getTotal() + 49}</h3>
      </div>

      <button onClick={() => navigate("/flights")}>
        Change Flight
      </button>

    </div>
  )
}

export default Cart
