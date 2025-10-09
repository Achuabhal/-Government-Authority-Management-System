const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

// ✅ Connect DB once
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1); // stop app if DB fails
  }
};

// Routes
const authRoutes = require("./routes/auth");
const addRoutes = require("./routes/add");
const contentRoutes = require("./routes/content");

app.use("/api", addRoutes);
app.use("/", authRoutes);
app.use("/content", contentRoutes);
app.use("/admin", require("./routes/admin"));
app.use("/leadadmin", require("./routes/leadadmin"));
app.use("/superadmin", require("./routes/superadmin"));

// ✅ Run locally (only after DB connection)
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
