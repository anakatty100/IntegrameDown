const express = require("express");
const router = express.Router();
const cloudinaryHandler = require("../../lib/cloudinary");

/* router.get("/events", (req, res) => {
    res.render("events", { events: true });
});


router.get("/events/:id", (req, res) => {
    res.render("event-details", { eventDetails: true });
}); */

router.get("/event", (req, res) => {
    res.render("admin/events/event_form", { event: true });
});

router.post("/event/body-image-file", async (req, res) => {
    try {
        const result = await cloudinaryHandler.upload(req.file.path);

        // const newImage = new Image({
        //     title: "Content Generic Event Image",
        //     imageURL: result.url,
        //     public_id: result.public_id,
        // });

        res.json({
            "success": 1,
            "file": {
                "url": result.url,
                "public_id": result.public_id
            }
        });
        
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
