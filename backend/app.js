const express = require('express')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const connectDB  = require('./config/config')
require("colors");

//configure env
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//rest api
app.get('/',(req,res) => {
    res.send("<h1>Welcome to POS app</h1>")
})

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoute"));

const PORT = process.env.PORT || 8083;
app.listen(PORT, function(){
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})