/**
 * Cloudinary configuration & upload helper.
 *
 * Reusable আকারে বানানো হয়েছে যাতে প্রজেক্টের যে কোনো জায়গা থেকে
 * (product images, profile photos, category banners ইত্যাদি) একই
 * ফাংশন দিয়ে Cloudinary-তে upload করা যায়।
 *
 * Setup: .env.local এ এই দুটো variable বসান —
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET   (Unsigned preset)
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResult {
  url: string; // secure_url — সবসময় এটাই save/use করুন (https)
  publicId: string; // পরে delete/transform করার জন্য দরকার হতে পারে
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * একটা ফাইল Cloudinary-তে upload করে এবং তার তথ্য রিটার্ন করে।
 * ব্যর্থ হলে Error throw করে — caller-কে try/catch দিয়ে handle করতে হবে।
 */
export async function uploadImageToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary কনফিগার করা হয়নি। .env.local এ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME এবং NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET সেট করুন।",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message ||
        `Cloudinary upload failed (${response.status})`,
    );
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
  };
}

/**
 * একাধিক ফাইল একসাথে (parallel) upload করার হেল্পার।
 * কোনো একটা ফেইল করলেও বাকিগুলো চলতে থাকবে —
 * প্রতিটার আলাদা status (fulfilled/rejected) পাবেন।
 */
export async function uploadMultipleImages(
  files: File[],
): Promise<PromiseSettledResult<CloudinaryUploadResult>[]> {
  return Promise.allSettled(files.map((file) => uploadImageToCloudinary(file)));
}
