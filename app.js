const express = require('express')
const dotenv = require('dotenv');
const errorHandler = require('./middelwares/errorHandler');  // gerer les erreurs de l'api
const connectDB = require("./config/db")
// routes files
const categoryRouter = require("./routes/categoryRoute");

// load env variables
dotenv.config({path: "./config/config.env"});


// Connect to database
connectDB()

const app = express()



//body parser (middleware)
app.use(express.json())  // analyser le contenu du body 

// mount routers
app.use("/api/v1/categories", categoryRouter)
// global management middleware  error
app.use(errorHandler)



module.exports = app

