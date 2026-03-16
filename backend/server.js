require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session') 
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/auth')
const app = express()

app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
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
