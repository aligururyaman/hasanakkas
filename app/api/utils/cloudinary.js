import { v2 as cloudinary } from "cloudinary";

export const cloudConnect = () => {
  cloudinary.config({
    cloud_name: "dbl7mgkip",
    api_key: "896721191625124",
    api_secret: "kWlLNdJcj1DLBo7C9O6jN97fkoE",
    secure: true,
  });
};
