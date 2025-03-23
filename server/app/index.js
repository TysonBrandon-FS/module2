const express = require("express")
const app = express()
const morgan = require("morgan")
const routeHandler = require("./routes")

app.use(express.json())
app.use(morgan("dev"))

app.get("/",(req,res) => {
    res.status(200).json({
        message: "API is Running",
        success: true
    })
})

app.use("/api/v1", routeHandler);

module.exports = app;