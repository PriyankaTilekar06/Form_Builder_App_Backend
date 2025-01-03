// const express = require("express")
// const router = express.Router()
// const cors = require('cors')
// const { test, registerUser, loginUser, getProfile } = require('../controllers/authController')

// router.use(
//     cors({
//         credentials: true,
//         // origin: 'http://localhost:5173'
//         origin: 'https://form-builder-app-frontend-iota.vercel.app'
//     })
// )

// router.get('/', test)
// router.post('/register', registerUser )
// router.post('/login', loginUser)
// router.get('/profile', getProfile)

// module.exports = router




const express = require("express");
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');

// router.use(
//     cors({
//         credentials: true,
//         origin: 'https://form-builder-app-frontend-two.vercel.app'
//         // origin: 'http://localhost:5173'
//     })
// );

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

module.exports = router;
