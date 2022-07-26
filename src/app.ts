import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import commentRoute from "./routes/comment";
import likeRoute from "./routes/like";
import path from "path";

const app = express();

dotenv.config();

app.use(
  "/uploads/postPhotos",
  express.static(__dirname + "/uploads/postPhotos")
);
app.use(
  "/uploads/profilePhotos",
  express.static(__dirname + "/uploads/profilePhotos")
);

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../my-app/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../my-app/build/index.html"));
  });
}

const MONGODB_URI = process.env.MONGODB_URI!;
const PORT = process.env.PORT || 5000;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() =>
      app.listen(PORT, () => console.log(`server is listening ${PORT}`))
    )
    .catch((err) => console.log(err.message));
}
