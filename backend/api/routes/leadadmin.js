// routes/leadAdmin.js
const express = require('express');
const router = express.Router();
const LeadAdminToggle = require('../leadadminmodal/button'); 
const LeadAdminGallery = require('../leadadminmodal/content'); 
const LeadAdminNews = require('../leadadminmodal/news'); 
const LeadAdminBanner = require('../leadadminmodal/img'); 
const authMiddleware = require("../controler/lead"); 
const SuperAdminToggle = require('../superadmin/button'); 
const SuperAdminGallery = require('../superadmin/content'); 
const SuperAdminNews = require('../superadmin/news'); 
const SuperAdminBanner = require('../superadmin/img'); 
const User = require("../models/User");
const { sendToMultiple } = require("../controler/mailer");

// Normal collections for restore
const Gallery = require('../models/content');
const News = require('../models/news');
const Toggle = require('../models/button');
const Galleryy = require('../models/img');

// Logger
const logger = require('../controler/logger');

// ------------------ ROUTES ------------------

// PUT /gallery
router.put('/gallery', authMiddleware, async (req, res) => {
  try {
    const galleryImages = req.body.galleryImages; 
    if (!Array.isArray(galleryImages)) return res.status(400).json({ error: "galleryImages must be an array" });

    let gallery = await LeadAdminGallery.findOne();
    if (gallery) {
      gallery.galleryImages = galleryImages;
      await gallery.save();
      logger.info({ action: 'UPDATE_GALLERY', performedBy: req.user?.email || 'unknown', data: galleryImages, timestamp: new Date() });
    } else {
      gallery = new LeadAdminGallery({ galleryImages });
      await gallery.save();
      logger.info({ action: 'CREATE_GALLERY', performedBy: req.user?.email || 'unknown', data: galleryImages, timestamp: new Date() });
    }

    res.json({ message: "Gallery updated successfully", gallery });
  } catch (err) {
    logger.error({ action: 'PUT_GALLERY_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /news
router.put('/news', authMiddleware, async (req, res) => {
  try {
    const newsItems = req.body.newsItems; 
    if (!Array.isArray(newsItems)) return res.status(400).json({ error: "newsItems must be an array" });

    let newsDoc = await LeadAdminNews.findOne();
    if (newsDoc) {
      newsDoc.newsItems = [...(newsDoc.newsItems || []), ...newsItems];
      await newsDoc.save();
      logger.info({ action: 'UPDATE_NEWS', performedBy: req.user?.email || 'unknown', data: newsItems, timestamp: new Date() });
    } else {
      newsDoc = new LeadAdminNews({ newsItems });
      await newsDoc.save();
      logger.info({ action: 'CREATE_NEWS', performedBy: req.user?.email || 'unknown', data: newsItems, timestamp: new Date() });
    }

    res.json({ message: "News updated successfully", news: newsDoc });
  } catch (err) {
    logger.error({ action: 'PUT_NEWS_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ error: "Server error" });
  }
});

// GET /news
router.get('/news', async (req, res) => {
  try {
    const newsDoc = await LeadAdminNews.findOne();
    const items = newsDoc ? newsDoc.newsItems : [];
    res.json({ newsItems: items });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /news/:id
router.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsDoc = await LeadAdminNews.findOne();
    if (!newsDoc || !Array.isArray(newsDoc.newsItems)) return res.status(404).json({ message: 'No news found' });

    const item = newsDoc.newsItems.find((n) => n && (n._id?.toString?.() === id || n.id === id));
    if (!item) return res.status(404).json({ message: 'News item not found' });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /all-content
router.get('/all-content', async (req, res) => {
  try {
    const newsDoc = await LeadAdminNews.findOne();
    const galleryDoc = await LeadAdminGallery.findOne();
    const toggle = await LeadAdminToggle.findOne();
    const banner = await LeadAdminBanner.findOne();

    res.json({
      newsItems: newsDoc ? newsDoc.newsItems : [],
      galleryImages: galleryDoc ? galleryDoc.galleryImages : [],
      banner: banner ? banner.images : [],
      toggle: toggle ? toggle.isActive : false
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching content' });
  }
});

// GET /gallery
router.get('/gallery', authMiddleware, async (req, res) => {
  try {
    let gallery = await LeadAdminGallery.findOne();
    if (!gallery) {
      gallery = new LeadAdminGallery({ galleryImages: [] });
      await gallery.save();
    }
    res.json({ galleryImages: gallery.galleryImages, _id: gallery._id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /banner
router.put('/banner', authMiddleware, async (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) return res.status(400).json({ message: 'Images should be an array' });

    let banner = await LeadAdminBanner.findOne();
    if (!banner) {
      banner = new LeadAdminBanner({ images });
    } else {
      banner.images = images;
    }

    await banner.save();
    logger.info({ action: 'UPDATE_BANNER', performedBy: req.user?.email || 'unknown', data: images, timestamp: new Date() });
    res.json(banner);
  } catch (err) {
    logger.error({ action: 'PUT_BANNER_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /banner
router.get('/banner', authMiddleware, async (req, res) => {
  try {
    const banner = await LeadAdminBanner.findOne();
    if (!banner) return res.status(404).json({ message: 'No banner found' });
    res.json(banner);
  } catch (err) {
    logger.error({ action: 'GET_BANNER_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /restore
router.put('/restore', async (req, res) => {
  try {
    const galleryData = await Gallery.find();
    const newsData = await News.find();
    const toggleData = await Toggle.find();
    const bannerData = await Galleryy.find();

    await LeadAdminGallery.deleteMany();
    await LeadAdminGallery.insertMany(galleryData);

    await LeadAdminNews.deleteMany();
    await LeadAdminNews.insertMany(newsData);

    await LeadAdminToggle.deleteMany();
    await LeadAdminToggle.insertMany(toggleData);

    await LeadAdminBanner.deleteMany();
    await LeadAdminBanner.insertMany(bannerData);

    logger.info({ action: 'RESTORE_LEAD_ADMIN', performedBy: req.user?.email || 'unknown', timestamp: new Date() });
    res.status(200).json({ message: 'Lead admin data restored successfully' });
  } catch (error) {
    logger.error({ action: 'RESTORE_ERROR', error: error, timestamp: new Date() });
    res.status(500).json({ error: 'Failed to restore lead admin data' });
  }
});

// PUT /forward
router.put('/forward', authMiddleware, async (req, res) => {
  try {
    const leadAdminGalleryData = await LeadAdminGallery.find();
    const leadAdminNewsData = await LeadAdminNews.find();
    const leadAdminToggleData = await LeadAdminToggle.find();
    const leadAdminBannerData = await LeadAdminBanner.find();

    await SuperAdminGallery.deleteMany();
    await SuperAdminGallery.insertMany(leadAdminGalleryData);

    await SuperAdminNews.deleteMany();
    await SuperAdminNews.insertMany(leadAdminNewsData);

    await SuperAdminToggle.deleteMany();
    await SuperAdminToggle.insertMany(leadAdminToggleData);

    await SuperAdminBanner.deleteMany();
    await SuperAdminBanner.insertMany(leadAdminBannerData);

    logger.info({
      action: 'FORWARD_LEAD_TO_SUPER',
      performedBy: req.user?.email || 'unknown',
      timestamp: new Date(),
      forwardedData: { gallery: leadAdminGalleryData, news: leadAdminNewsData, toggle: leadAdminToggleData, banner: leadAdminBannerData }
    });

    res.status(200).json({ message: 'Super admin data restored from lead admin collections successfully' });
  } catch (error) {
    logger.error({ action: 'FORWARD_ERROR', error: error, timestamp: new Date() });
    res.status(500).json({ error: 'Failed to restore super admin data' });
  }
});

// POST /remove
router.post("/remove", async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "News item ID is required" });

  try {
    const result = await LeadAdminNews.updateOne({}, { $pull: { newsItems: { _id: id } } });
    if (result.modifiedCount === 0) return res.status(404).json({ message: "News item not found" });

    logger.info({ action: 'DELETE_NEWS_ITEM', performedBy: req.user?.email || 'unknown', newsItemId: id, timestamp: new Date() });
    res.status(200).json({ message: "News item deleted successfully" });
  } catch (err) {
    logger.error({ action: 'REMOVE_NEWS_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /reject
router.put('/reject', authMiddleware, async (req, res) => {
  try {
    const newsDoc = await LeadAdminNews.findOne();
    const galleryDoc = await LeadAdminGallery.findOne();
    const toggle = await LeadAdminToggle.findOne();
    const banner = await LeadAdminBanner.findOne();

    const admins = await User.find({ role: 'admin' }).select('email');
    const emails = admins.map(admin => admin.email);

    if (emails.length > 0) {
      const subject = 'Content Rejected';
      const text = `Lead admin content rejected.\n\nPrevious content:\nNews: ${JSON.stringify(newsDoc?.newsItems || [])}\nGallery: ${JSON.stringify(galleryDoc?.galleryImages || [])}\nToggle: ${toggle?.isActive || false}\nBanner: ${JSON.stringify(banner?.images || [])}`;
      await sendToMultiple(emails, subject, text);
    }

    await LeadAdminGallery.deleteMany();
    await LeadAdminNews.deleteMany();
    await LeadAdminToggle.deleteMany();
    await LeadAdminBanner.deleteMany();

    logger.info({
      action: 'REJECT_LEAD_ADMIN_CONTENT',
      performedBy: req.user?.email || 'unknown',
      timestamp: new Date(),
      previousContent: { news: newsDoc?.newsItems, gallery: galleryDoc?.galleryImages, toggle: toggle?.isActive, banner: banner?.images }
    });

    res.json({ message: 'Lead admin content rejected, emailed to admins, and cleared' });
  } catch (err) {
    logger.error({ action: 'REJECT_ERROR', error: err, timestamp: new Date() });
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
