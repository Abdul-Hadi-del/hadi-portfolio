const CLOUD_NAME = "b94lpfwt";
const UPLOAD_PRESET = "portfolio_uploads";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error("Image upload failed");
  }
  return data.secure_url;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error("File upload failed");
  }
  return data.secure_url;
}

export async function uploadVideo(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error("Video upload failed");
  }
  return data.secure_url;
}