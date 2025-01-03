const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {mongoose} = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()
const authRoutes = require('./routes/authRoutes')
dotenv.config();
const port = process.env.PORT || 8000

const allowedOrigins = [
process.env.FRONTEND_URL,
// 'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-csrf-token", "X-Requested-With"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
//   });
  

app.use('/api/v1/auth', authRoutes)



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

