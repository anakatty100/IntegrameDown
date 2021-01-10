const cloudinary = require("cloudinary");
const fs = require("fs-extra");


const cloudinaryHandler = {
    config() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    },
    async upload(path) {
        this.config();
        const result = await cloudinary.v2.uploader.upload(path);
        return result;
    },
    async destroy(publicId) {
        this.config();
        const result = await cloudinary.v2.uploader.destroy(publicId);
        return result;
    },
};

module.exports = cloudinaryHandler;

