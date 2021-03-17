const CampaignImage = require("../models/CampaignImage.js");
const Campaign = require("../models/Campaign.js");
const Event = require("../models/Event");

const { sortEventDates, dateToEsObj } = require("../lib/formatTime");

module.exports.getIndex = async (req, res) => {
    //Pass a local variable to the view index: true
    const eventsData = await Event.find({}).lean();
    sortEventDates(eventsData);
    let events = eventsData.map((item) => {
        const event = {
            ...item,
            dateTimeFormated: dateToEsObj(item.datetime),
        };
        return event;
    });
    const firstEvent = events[0];
    events = events.slice(1, 4);
    res.render("index", { index: true, events, firstEvent });
}

module.exports.getAbout = (req, res) => {
    //Pass a local variable to the view index: true
    res.render("about", { about: true });
};

module.exports.getServices = (req, res) => {
    res.render("services", { services: true });
};

module.exports.getEvents = async (req, res) => {
    const eventsData = await Event.find({}).lean();
    sortEventDates(eventsData);
    const events = eventsData.map((item) => {
        const event = {
            ...item,
            dateTimeFormated: dateToEsObj(item.datetime),
        };
        return event;
    });
    console.log(events);
    res.render("events", { events });
};

module.exports.getEventId = async (req, res) => {
    const { event_id } = req.params;
    let event = await Event.findById(event_id).lean();
    event.dateTimeFormated = dateToEsObj(event.datetime);
    const content = JSON.stringify(event.content);
    const dateEventDetail = JSON.stringify(event.datetime);
    res.render("event-details", {
        eventDetails: true,
        eventDetailsScript: true,
        event,
        content,
        dateEventDetail
    });
};

module.exports.getGallery = async (req, res) => {
    const galleryImages = await CampaignImage.find().populate([{
        path: 'campaign',
        model: 'Campaign'
    }, {
        path: 'image',
        model: 'Image'
    }]).lean();

    const campaignNames = await Campaign.find({}).lean();

    res.render("gallery", { gallery: true, galleryImages, campaignNames });
};

module.exports.getFaq = (req, res) => {
    res.render("faq", { faq: true });
};

module.exports.getContact = (req, res) => {
    res.render("contact", { contact: true, contactScript: true });
};