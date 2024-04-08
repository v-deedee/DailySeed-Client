import cloudinary from "../config/cloudinary.js";

class CloudHanlder {
    constructor() {}

    upload = async (file, folder) => {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder,
        });

        return res;
    };

    remove = async (publicId) => {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    };
}

export default new CloudHanlder();
