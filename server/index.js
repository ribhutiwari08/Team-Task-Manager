const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors({
  origin: [
    "https://team-task-manager-rosy-ten.vercel.app",
    "https://team-task-manager-ag6h64wut-ribhutiwari08s-projects.vercel.app"
  ],
  credentials: true
}));


app.options("*", cors());

app.use(express.json());


app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));