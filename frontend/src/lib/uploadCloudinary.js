import axios from "axios";
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET || "servicehub-system";
const cloud_name = import.meta.env.VITE_CLOUD_NAME || "jackdotb";

/*Uploading files to Cloudinary data storage */
export const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    uploadData
  );

  return data;
};
