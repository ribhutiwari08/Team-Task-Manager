const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

// Middleware
app.use(express.json());

// ✅ Better CORS config
app.use(cors({
  origin: [
    "https://team-task-manager-rosy-ten.vercel.app",
    "http://localhost:5173"   // local testing ke liye
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Preflight fix (important)
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch(err => {
    console.error("❌ DB error:", err);
    process.exit(1);
  });

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));