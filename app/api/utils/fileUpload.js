import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbl7mgkip",
  api_key: "896721191625124",
  api_secret: "kWlLNdJcj1DLBo7C9O6jN97fkoE",
  secure: true,
});

const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(new Error("Error uploading image to Cloudinary"));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    file
      .arrayBuffer()
      .then((buffer) => {
        const bufferData = Buffer.from(buffer);
        uploadStream.end(bufferData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default uploadImageToCloudinary;
