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

  console.log(path.join(__dirname, "../my-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../my-app/build/index.html"));
  });
}

const CONNECTION_URL = process.env.CONNECTION_URL!;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://kule1163:thv8pyyx4z@cluster0.zjlbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`server is listening ${PORT}`))
  )
  .catch((err) => console.log(err.message));
