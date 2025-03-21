const express = require("express")
const app = express()
const morgan = require("morgan")
const router = express.Router()
const teamRoutes = require('./teamRoutes');
const playerRoutes = require('./playerRoutes');


app.use(express.json())
app.use(morgan("dev"))

router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        message: `${req.method} - request made`
    })
})


router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

module.exports = router;