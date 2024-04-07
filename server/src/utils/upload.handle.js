import cloudinary from "../config/cloudinary.js";

export default async (file, folder) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        folder: folder,
    });

    return res;
};
