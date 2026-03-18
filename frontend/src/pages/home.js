import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

const API_URL = process.env.REACT_APP_API_URL

function Home() {

  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_URL}/home`, { withCredentials: true })
      .then(res => setMessage(res.data.message))
      .catch(err => console.error("Failed to load home:", err))
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true })
    } catch (err) {
      console.error("Logout error:", err)
    }
    navigate("/")
  }

  return (
    <div className="page">

      <div className="header">
        <div className="logo">Uplift</div>
        <button className="header-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="content">
        <h1>{message}</h1>
      </div>

    </div>
  )
}

export default Home
