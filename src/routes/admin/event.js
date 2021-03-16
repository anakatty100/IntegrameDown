const { json } = require("body-parser");
const express = require("express");
const { route } = require("..");
const router = express.Router();
const cloudinaryHandler = require("../../lib/cloudinary");
const Event = require("../../models/Event");

router.get("/event", async (req, res) => {
    try {
        const result = await Event.find({}).lean();
        const events = result.map((item) => {
            return {
                _id: item._id,
                title: item.title,
                date: item.date,
                hour: item.hour,
                price: item.price,
                location: item.location,
            };
        });

        res.render("admin/events/event_form", { eventScript: true, events });
    } catch (e) {
        console.error(e);
    }
});

router.post("/event/body-image-file", async (req, res) => {
    try {
        const result = await cloudinaryHandler.upload(req.file.path);

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

router.post("/event", async (req, res) => {
    const { form, content } = req.body;
    const title = form[0].value;
    const dateSplited = form[1].value.split("T");
    const date = dateSplited[0];
    const hour = dateSplited[1];
    const price = form[2].value;
    const location = form[3].value;
    const locationLink = form[4].value;
    const bookLink = form[5].value;
    const lookEventLink = form[6].value;

    const newEvent = Event({
        title,
        date,
        hour,
        price,
        location,
        locationLink,
        bookLink,
        lookEventLink,
        content,
    });
    try {
        const dbResponse = await newEvent.save();
        console.log(dbResponse);
    } catch (e) {
        console.error(e);
    }
    res.redirect("/admin/event");
});

router.get("/event/edit/:event_id", async (req, res) => {
    const { event_id } = req.params;
    try {
        const event = await Event.findById(event_id).lean();
        let { content } = event;
        content = JSON.stringify(content);
        res.render("admin/events/event_form_edit", { eventScript: true, event, content });
    } catch (e) {
        console.error(e);
    }
});

router.post("/event/edit/:event_id", async (req, res) => {
    const { event_id } = req.params;
    const { form, content } = req.body;
    const title = form[0].value;
    const dateSplited = form[1].value.split("T");
    const date = dateSplited[0];
    const hour = dateSplited[1];
    const price = form[2].value;
    const location = form[3].value;
    const locationLink = form[4].value;
    const bookLink = form[5].value;
    const lookEventLink = form[6].value;

    try {
        const response = await Event.findByIdAndUpdate(event_id, {
            title,
            date,
            hour,
            price,
            location,
            locationLink,
            bookLink,
            lookEventLink,
            content,
        });
    } catch (e) {
        console.error(e);
    }
    res.redirect("/admin/event");
});

router.get("/event/delete/:event_id", async (req, res) => {
    const { event_id } = req.params;
    try {
        const eventResponse = await Event.findByIdAndDelete(event_id);
        console.log(eventResponse);
        const imagesIds = eventResponse.content
            .blocks.filter(block => block.type === "image").map(block => block.data.file.public_id);

        for (const public_id of imagesIds) {
            const cloudinaryResponse = await cloudinaryHandler.destroy(public_id);
        }
    } catch (e) {
        console.error(e);
    }
    res.redirect("/admin/event");
});

module.exports = router;
