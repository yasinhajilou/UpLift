import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/login"
import Signup from "./pages/signUp"
import Home from "./pages/home"
import ViewFlights from "./pages/viewFlights"
import Cart from "./pages/cart"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flights" element={<ViewFlights />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
