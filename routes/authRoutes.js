const express = require("express")
const router = express.Router()
const { test, registerUser, loginUser } = require('../controllers/authController')

router.get('/', test)
router.post('/register', registerUser )
router.post('/login', loginUser)
// router.get('/profile', getProfile)

module.exports = router





