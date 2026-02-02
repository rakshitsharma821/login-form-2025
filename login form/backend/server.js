const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();        

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));


app.use("/api/auth", require("./routes/authRoutes"));

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message || err);
    process.exit(1);
  }
};

startServer();
