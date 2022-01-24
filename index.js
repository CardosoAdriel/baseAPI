//Initial setup, imports and exports to louch of application
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Configure the express to read and respond on JSON format, utilizing middlewares from express
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

// Routes of API
const personRouters = require('./routes/personRoutes')
app.use('/product', personRouters)

// Configure an initial route (endpoint)
app.get('/', (req, res) => {
  res.json({msg: 'API is UP !'})
})

// Configure an port of express provide this application in especific port
// And configure the mongoose, and just Initialize the application, if conection to database is successful
const PORT = process.env.APP_PORT || 3200
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@genericdatabase.bhlx3.mongodb.net/genericDatabaseProjects?retryWrites=true&w=majority`)
  .then(() => {
    console.log('App is running in Port - ' + PORT)
    console.log('we are conected in MongoDB !')
  })
  .catch( err => {
    console.log('Conection to DataBase Fail')
  })

app.listen(PORT)