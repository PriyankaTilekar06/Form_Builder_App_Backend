const express = require("express")
const userRouter = express.Router()
const { test, registerUser, loginUser, editUserById } = require('../controllers/authController.js')

userRouter.get('/test', test)
userRouter.post('/register', registerUser )
userRouter.post('/login', loginUser)
userRouter.patch('/update', editUserById)
// router.get('/profile', getProfile)

module.exports = userRouter





