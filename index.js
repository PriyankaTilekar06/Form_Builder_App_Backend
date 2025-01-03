// const express = require("express")
// const dotenv = require("dotenv")
// const cors = require("cors")
// const {mongoose} = require("mongoose")
// const cookieParser = require("cookie-parser")
// const app = express()

// dotenv.config();

// // app.use(cors({
// //     credentials: true,
// //     origin: 'http://localhost:5173'
// // }));


// // mongoose.connect(process.env.MONGO_URL)
// // .then(() => console.log("Database Connected"))
// // .catch((err) => console.log("Database not Connected", err))

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('Database Connected'))
//   .catch((err) => console.log('Database not connected', err));
// const allowedOrigins = [
//   'https://form-builder-app-frontend-iota.vercel.app'
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, 
//   allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-csrf-token", "X-Requested-With"],
//   methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); 

// app.use(express.json())
// app.use(cookieParser())
// app.use(express.urlencoded({extended: false}))

// app.use('/', require('./routes/authRoutes'))

// const port = 8000
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })





const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();



// const allowedOrigins = [
//     'https://form-builder-app-frontend-iota.vercel.app'
// ];
// const allowedOrigins = ['https://form-builder-app-frontend-two.vercel.app']
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));
// const allowedOrigins = [
//   'https://form-builder-app-frontend-two.vercel.app'
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, 
//   allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-csrf-token", "X-Requested-With"],
//   methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); 

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['https://form-builder-app-frontend-two.vercel.app'];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies and Authorization headers
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

// Handle preflight requests for all routes
app.options('*', cors());

app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
