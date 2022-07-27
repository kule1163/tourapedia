"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const comment_1 = __importDefault(require("./routes/comment"));
const like_1 = __importDefault(require("./routes/like"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(
  "/uploads/postPhotos",
  express_1.default.static(__dirname + "/uploads/postPhotos")
);
app.use(
  "/uploads/profilePhotos",
  express_1.default.static(__dirname + "/uploads/profilePhotos")
);
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
app.use("/posts", posts_1.default);
app.use("/comment", comment_1.default);
app.use("/like", like_1.default);
if (process.env.NODE_ENV === "production") {
  app.use(
    express_1.default.static(path_1.default.join(__dirname, "../my-app/build"))
  );
  app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../my-app/build/index.html"));
  });
}
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
if (MONGODB_URI) {
  mongoose_1.default
    .connect(MONGODB_URI)
    .then(() =>
      app.listen(PORT, () => console.log(`server is listening ${PORT}`))
    )
    .catch((err) => console.log(err.message));
}
