const express = require("express")
const userRouter = express.Router()
const { test, registerUser, loginUser } = require('../controllers/authController.js')

userRouter.get('/test', test)
userRouter.post('/register', registerUser )
userRouter.post('/login', loginUser)
// router.get('/profile', getProfile)

module.exports = userRouter





