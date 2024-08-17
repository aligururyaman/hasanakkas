import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbl7mgkip",
  api_key: "896721191625124",
  api_secret: "kWlLNdJcj1DLBo7C9O6jN97fkoE",
  secure: true,
});

const deleteImageFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(new Error("Error deleting image from Cloudinary"));
      } else {
        if (result.result === "not found") {
          reject(new Error("Image not found in Cloudinary"));
        } else {
          resolve(result);
        }
      }
    });
  });
};

export default deleteImageFromCloudinary;
