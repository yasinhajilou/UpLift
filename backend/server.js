require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/auth')
const app = express()

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',')
  : ['http://localhost:3000']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use(express.json())

const isProduction = process.env.NODE_ENV === 'production'

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  }
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api', authRoutes);

app.get('/home' , (req, res ) => {
    res.json({message : 'Welcome to Uplift'})
})

const start = () => {
    console.log(`Server running on port ${PORT}`)
}
app.listen(PORT , start )
