import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multer.diskStorage({
    // File path to store uploaded images
    destination: "product-data/images",
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname); //generate a UUID
    },
  }),
});

export const handleImageUploadMiddleWare = upload.single("image");