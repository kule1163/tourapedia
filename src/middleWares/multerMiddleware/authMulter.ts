import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../uploads/profilePhotos"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      uuidv4() + "-" + Date.now() + path.extname(file?.originalname)
    );
  },
});

export const authUpload = multer({
  storage: storage,
});
