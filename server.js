const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth")
const imageRoutes = require("./src/routes/images")
const { generalLimiter, authLimiter } = require("./src/middleware/rateLimit");



connectDB();

const app = express();
app.use(express.json());

app.use(generalLimiter)


app.use("/auth/login", authLimiter);

app.use("/auth", authRoutes);
app.use("/images", imageRoutes )




app.get("/", (req, res) => {
  res.json({ message: "Image Processing Service 🚀" });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


