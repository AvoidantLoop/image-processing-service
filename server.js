const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
























app.get("/", (req, res) => {
  res.json({ message: "Image Processing Service 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));