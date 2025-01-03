const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
dotenv.config();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE","OPTIONS"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).send({message:"Hello World!"}); 
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/test-db-connection', async (req, res) => {
  try {
      if (mongoose.connection.readyState === 1) {
          return res.status(200).json({message:"Already connected to MongoDB!"});
      }
      
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      res.send("Connected to MongoDB!");
  } catch (error) {
      res.status(500).send(`Database connection failed: ${error.message}`);
  }
});



// Handling 404 errors (Route not found)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not exists' }); // Respond with a 404 error if no routes match
});

// Generic error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ error: 'Something went wrong!' }); // Respond with a generic error message
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
