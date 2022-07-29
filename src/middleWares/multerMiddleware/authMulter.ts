import multer from "multer";

const storage = multer.diskStorage({});

export const authUpload = multer({
  storage: storage,
});
