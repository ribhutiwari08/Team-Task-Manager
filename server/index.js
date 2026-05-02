const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

app.use(express.json());
app.use(cors());   // (for now allow all)


app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


app.get("/", (req, res) => {
  res.send("API Running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));