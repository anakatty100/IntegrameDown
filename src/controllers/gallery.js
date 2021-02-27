const CampaignImage = require("../models/CampaignImage");
const Campaign = require("../models/Campaign");
const Image = require("../models/Image");

const cloudinaryHandler = require("../lib/cloudinary");
const util = require("../lib/util");


module.exports.getGallery = async (req, res) => {
    const campaigns = await Campaign.find({}).lean();
    const galleryImages = await CampaignImage.find({}).populate([{
        path: 'campaign',
        model: 'Campaign'
    }, {
        path: 'image',
        model: 'Image'
    }]).lean();

    res.render("admin/gallery/gallery_form", { galleryForm: true, campaigns, galleryImages });
};

module.exports.postGallery = async (req, res) => {
    const result = await cloudinaryHandler.upload(req.file.path);
    const { title, campaign, description } = req.body;
    const newImage = new Image({
        title: title,
        imageURL: result.url,
        public_id: result.public_id,
    });
    const imageSaveResponse = await newImage.save();

    const newImageGallery = new CampaignImage({
        title: title,
        description: description,
        //Campaign
        campaign: campaign,
        image: imageSaveResponse._id,
    });

    const dbResponse = await newImageGallery.save();

    //Delete new file uploaded
    await util.deleteLocalFile(req.file.path);

    res.redirect("/admin/gallery")
};

module.exports.getDeleteImage = async (req, res) => {
    const { image_id } = req.params;
    const campaignImageResponse = await CampaignImage.findByIdAndDelete(image_id);
    const imageResponse = await Image.findByIdAndDelete(campaignImageResponse.image);
    const cloudinaryResponse = await cloudinaryHandler.destroy(imageResponse.public_id);

    res.redirect("/admin/gallery");
};

module.exports.getEditImage = async (req, res) => {
    const { image_id } = req.params;

    const campaignImage = await CampaignImage.findById(image_id).populate([{
        path: 'campaign',
        model: 'Campaign'
    }, {
        path: 'image',
        model: 'Image'
    }]).lean();

    const campaigns = await Campaign.find().lean();

    const individualCamp = campaignImage.campaign;

    res.render("admin/gallery/gallery_form_edit", { campaignImage, individualCamp, campaigns });
};

module.exports.postEditImage = async (req, res) => {
    const { image_id } = req.params;
    const { campaign, title, description } = req.body;

    if (req.file === undefined) {
        // None image was uploaded, there are no changes in the image data
        const campaignImage = await CampaignImage.findByIdAndUpdate(image_id, {
            title: title,
            description: description,
            campaign: campaign,
        });
    } else {
        // A new image was uploaded, there are changes in the image data

        //Find the campaignImage to change
        const campaignImage = await CampaignImage.findById(image_id).populate([{
            path: 'campaign',
            model: 'Campaign'
        }, {
            path: 'image',
            model: 'Image'
        }]).lean();

        console.log("CampaignImage:")
        console.dir(campaignImage);
        //Destroy the old image entity on cloudinary
        await cloudinaryHandler.destroy(campaignImage.image.public_id);
        //Upload the new image entity on claudinary
        const result = await cloudinaryHandler.upload(req.file.path);
        //Save newImage to the database
        const newImage = new Image({
            title: title,
            imageURL: result.url,
            public_id: result.public_id,
        });
        const imageSaveResponse = await newImage.save();

        //Delete new file uploaded
        util.deleteLocalFile(req.file.path);

        //Link new instance of the image Schema to the campaignImage schema
        const newCampaignImage = await CampaignImage.findByIdAndUpdate(image_id, {
            title: title,
            description: description,
            campaign: campaign,
            image: imageSaveResponse._id,
        });
    }

    res.redirect("/admin/gallery");
};