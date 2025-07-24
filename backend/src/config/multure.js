import  multer from "multer"
import { CloudinaryStorage }  from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary";

console.log("upload mutlture")
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });

 
