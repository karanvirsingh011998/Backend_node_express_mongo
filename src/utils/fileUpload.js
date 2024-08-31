import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});
const uploadFile = async (filePath) => {
  try {
    if (!filePath) return null;
    //upload file
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("File uploaded", response);

    return response;
  } catch (error) {
    fs.unlinkSync(filePath); //remove the file from local
    return null;
  }
};

export { uploadFile };
