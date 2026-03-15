require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session') 
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.get('/home' , (req, res ) => {
    res.json({message : 'Welcome to Uplift'})
})

const start = () => {
    console.log(`Server running on port ${PORT}`)
}
app.listen(PORT , start )
