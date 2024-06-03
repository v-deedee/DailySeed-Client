import cloudinary from "../config/cloudinary.js";

class CloudHanlder {
    constructor() {}

    upload = async (file, folder, name) => {
        console.log(name, 1111)
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder,
            public_id: name
        });

        return res;
    };

    remove = async (publicId) => {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    };
}

export default new CloudHanlder();
