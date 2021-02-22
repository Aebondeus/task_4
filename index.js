import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRoute.js";
import User from "./models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { tableRouter } from "./routes/tableRoute.js";
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename); 

app.use(express.json({ extended: true }));
app.use("/auth/", authRouter);
app.use("/api/", tableRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`App on port number ${port}`));
  } catch (err) {
    console.log("Error", console.log(err));
    process.exit(1);
  }
};

start();

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  })
}