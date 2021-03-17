const express = require("express");
const router = express.Router();

const eventController = require("../../controllers/event")

router.get("/event", eventController.getEvent);

router.post("/event/body-image-file", eventController.postEditorJsImage);

router.post("/event", eventController.postEvent);

router.get("/event/edit/:event_id", eventController.getEditEvent);

router.post("/event/edit/:event_id", eventController.postEditEvent);

router.get("/event/delete/:event_id", eventController.deleteEvent);

module.exports = router;
