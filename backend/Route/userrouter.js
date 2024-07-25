const express = require("express")
const router = express.Router()
const {Signup, Loginuser} = require("../Controllers/userController")


router.post("/signup", Signup)
router.post("/login", Loginuser)



module.exports = router