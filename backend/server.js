require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/auth')
const flightsRoutes = require('./routes/flights')
const User = require('./models/User')
const verifyToken = require('./middleware/auth')
const app = express()

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000']

console.log('CORS allowed origins:', allowedOrigins)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/flights', flightsRoutes);
app.use('/api', authRoutes);

// Protected route - requires valid JWT token
app.get('/api/home', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId)
      if (!user) {
        return res.status(404).json({message : 'User not found'})
      }
      res.json({
        message : 'Welcome back', 
        user: { 
          fullName: user.fullName, 
          email: user.email, 
          userType: user.userType 
        }
      })
    } catch (err) {
      console.error("Error in /api/home:", err)
      res.status(500).json({message : 'Server error', error: err.message})
    }
})

const start = () => {
    console.log(`Server running on port ${PORT}`)
}
app.listen(PORT , start )
