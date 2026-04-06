import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

function ViewFlights() {

  const [flights, setFlights] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setFlights([
      {
        flightId: "f1",
        airline: "Air Canada",
        from: "YYZ",
        to: "LAX",
        departureTime: "08:00",
        arrivalTime: "11:30",
        duration: "5h 30m",
        price: 299
      },
      {
        flightId: "f2",
        airline: "WestJet",
        from: "YYZ",
        to: "NYC",
        departureTime: "10:00",
        arrivalTime: "12:00",
        duration: "2h",
        price: 199
      }
    ])
  }, [])

  const addToCart = (flight) => {

    let cart = JSON.parse(localStorage.getItem("cart")) || []

    cart.push({ ...flight, passengers: 1 })

    localStorage.setItem("cart", JSON.stringify(cart))

    alert("Flight added to cart!")
  }

  return (

    <div className="page">

      <h1>Available Flights</h1>

      {flights.map(flight => (

        <div key={flight.flightId} className="flight-card">

          <h3>{flight.airline}</h3>
          <p>{flight.from} → {flight.to}</p>
          <p>{flight.departureTime} - {flight.arrivalTime}</p>
          <p>{flight.duration}</p>
          <p>${flight.price}</p>

          <button onClick={() => addToCart(flight)}>
            Add to Cart
          </button>

        </div>

      ))}

      <button onClick={() => navigate("/cart")}>
        Go to Cart
      </button>

    </div>

  )
}

export default ViewFlights
