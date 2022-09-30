const express = require('express')
const errorMiddleware = require("./middleware/error")
const dotenv = require("dotenv")
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
var cors = require('cors');

app.use(express.json())
app.use(cors());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({ path: "config/config.env" })

// user route
const users = require("./routes/UserRoutes")
app.use("/api", users)

// error middleware

app.use(errorMiddleware)

module.exports = app