import multer from "multer";

const storage = multer.diskStorage({});

export const postUpload = multer({
  storage: storage,
});
