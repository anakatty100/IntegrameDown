const express = require("express");
const router = express.Router();

const Event = require("../../models/Event");

const cloudinaryHandler = require("../../lib/cloudinary");
const { dateToInputDate,
    dateToInputTime,
    inputsToDate, sortEventDates } = require("../../lib/formatTime");

router.get("/event", async (req, res) => {
    try {
        const result = await Event.find({}).lean();
        sortEventDates(result);

        const events = result.map((item) => {
            return {
                _id: item._id,
                title: item.title,
                date: dateToInputDate(item.datetime),
                hour: dateToInputTime(item.datetime),
                price: item.price,
                location: item.location,
            };
        });

        res.render("admin/events/event_form", { adminEventScript: true, events });
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
    const date = form[1];
    const time = form[2];
    const price = form[3].value;
    const location = form[4].value;
    const locationLink = form[5].value;
    const bookLink = form[6].value;
    const lookEventLink = form[7].value;

    const datetime = inputsToDate(date.value, time.value);

    const newEvent = Event({
        title,
        datetime,
        price,
        location,
        locationLink,
        bookLink,
        lookEventLink,
        content,
    });
    try {
        const dbResponse = await newEvent.save();
    } catch (e) {
        console.error(e);
    }
    res.redirect("/admin/event");
});

router.get("/event/edit/:event_id", async (req, res) => {
    const { event_id } = req.params;
    try {
        let event = await Event.findById(event_id).lean();
        const content = JSON.stringify(event.content);
        event.date = dateToInputDate(event.datetime);
        event.time = dateToInputTime(event.datetime);
        res.render("admin/events/event_form_edit", { adminEventScript: true, event, content });
    } catch (e) {
        console.error(e);
    }
});

router.post("/event/edit/:event_id", async (req, res) => {
    const { event_id } = req.params;
    const { form, content } = req.body;
    const title = form[0].value;
    const date = form[1].value;
    const time = form[2].value;
    const price = form[3].value;
    const location = form[4].value;
    const locationLink = form[5].value;
    const bookLink = form[6].value;
    const lookEventLink = form[7].value;

    const datetime = inputsToDate(date, time);

    try {
        const response = await Event.findByIdAndUpdate(event_id, {
            title,
            datetime,
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
