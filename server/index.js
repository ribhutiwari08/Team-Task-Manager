
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
import cors from "cors";
import authRoutes from "./routes/auth.js";

app.use("/api/auth", authRoutes);
app.use(cors({
  origin: "*"
}));

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();