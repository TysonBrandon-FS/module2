const express = require("express")
const app = express()
const morgan = require("morgan")
const router = express.Router()
const networkRoutes = require('./networkRoutes');
const showRoutes = require('./showRoutes');


app.use(express.json())
app.use(morgan("dev"))

router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        message: `${req.method} - request made`
    })
})


router.use('/networks', networkRoutes);
router.use('/shows', showRoutes);

module.exports = router;