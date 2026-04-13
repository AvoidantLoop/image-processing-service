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


//token value cfat_nnKevuQZYuHQOHwDWryTLGVsmeagBw1HYs24Ci3Uab8bb736

// access key id e4afbc41ffd953b19a9230b9425cc957

//secret access key  68a3d2ab8854b717d0746f6b24371193ca4890393df07a5bf4f2d4d1d35f3c06

// image-processing-token

// endpoint url   https://3997ad290387cac816d476fe070b6bf5.r2.cloudflarestorage.com