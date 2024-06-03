import Multer from "multer";

const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024,
    },
});

export default upload;

