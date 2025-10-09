const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
}));

// Healthcheck
app.get("/health", (req, res) => res.json({ ok: true }));

// MongoDB connection (lazy connect)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    throw err;
  }
};

// Routes
const authRoutes = require("./routes/auth");
const addRoutes = require("./routes/add");
const contentRoutes = require("./routes/content");

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api", addRoutes);
app.use("/", authRoutes);
app.use("/content", contentRoutes);
app.use("/admin", require("./routes/admin"));
app.use("/leadadmin", require("./routes/leadadmin"));
app.use("/superadmin", require("./routes/superadmin"));


module.exports = app;
module.exports.handler = serverless(app);
