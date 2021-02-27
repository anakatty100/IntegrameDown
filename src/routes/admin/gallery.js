const express = require("express");
const router = express.Router();

const galleryController = require("../../controllers/gallery");

/* 
    Gallery RESTful endpoints
*/
router.get("/gallery", galleryController.getGallery);

router.post("/gallery", galleryController.postGallery);

router.get("/gallery/edit/:image_id", galleryController.getEditImage);

router.post("/gallery/edit/:image_id", galleryController.postEditImage);

router.get("/gallery/delete/:image_id", galleryController.getDeleteImage);

module.exports = router;