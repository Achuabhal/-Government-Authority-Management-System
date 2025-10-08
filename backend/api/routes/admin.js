const express = require('express');
const router = express.Router();
const AdminGallery = require('../adminmodals/content'); // gallery images
const AdminNews = require('../adminmodals/news');       // news items
const AdminToggle = require('../adminmodals/button');   // toggle button
const AdminBanner = require('../adminmodals/img');      // banner images
const authMiddleware = require("../controler/admin");    // authentication middleware
const Gallery = require('../models/content');
const News = require('../models/news');
const Toggle = require('../models/button');
const Galleryy = require('../models/img');
const leadAdminToggle = require('../leadadminmodal/button');
const leadAdminGallery = require('../leadadminmodal/content');
const leadAdminNews = require('../leadadminmodal/news');
const leadAdminBanner = require('../leadadminmodal/img');
const logger = require('../controler/logger'); // ✅ Winston logger

// ------------------- GALLERY ROUTES -------------------

// PUT /gallery
router.put('/gallery', async (req, res) => {
  try {
    const { galleryImages } = req.body;
    if (!Array.isArray(galleryImages)) {
      return res.status(400).json({ error: "galleryImages must be an array" });
    }

    let gallery = await AdminGallery.findOne();
    if (gallery) {
      gallery.galleryImages = galleryImages;  
      await gallery.save();
      logger.info('Gallery updated', { action: 'PUT /gallery', galleryImages });
    } else {
      gallery = new AdminGallery({ galleryImages });
      await gallery.save();
      logger.info('Gallery created', { action: 'PUT /gallery', galleryImages });
    }

    res.json({ message: "Gallery updated successfully", gallery });
  } catch (err) {
    logger.error('PUT /gallery error', { error: err.message });
    res.status(500).json({ error: "Server error" });
  }
});

// GET /gallery
router.get('/gallery', authMiddleware, async (req, res) => {
  try {
    let gallery = await AdminGallery.findOne();
    if (!gallery) {
      gallery = new AdminGallery({ galleryImages: [] });
      await gallery.save();
    }
    res.json({ galleryImages: gallery.galleryImages, _id: gallery._id });
  } catch (err) {
    logger.error('GET /gallery error', { error: err.message });
    res.status(500).json({ message: 'Server Error' });
  }
});

// ------------------- NEWS ROUTES -------------------

// PUT /news
router.put('/news', authMiddleware, async (req, res) => {
  try {
    const { newsItems } = req.body;
    if (!Array.isArray(newsItems)) {
      return res.status(400).json({ error: "newsItems must be an array" });
    }

    let newsDoc = await AdminNews.findOne();
    if (newsDoc) {
      newsDoc.newsItems = [...(newsDoc.newsItems || []), ...newsItems];
      await newsDoc.save();
      logger.info('News updated', { action: 'PUT /news', newsItems, user: req.user?.id });
    } else {
      newsDoc = new AdminNews({ newsItems });
      await newsDoc.save();
      logger.info('News created', { action: 'PUT /news', newsItems, user: req.user?.id });
    }

    res.json({ message: "News updated successfully", news: newsDoc });
  } catch (err) {
    logger.error('PUT /news error', { error: err.message, user: req.user?.id });
    res.status(500).json({ error: "Server error" });
  }
});

// GET /news
router.get('/news', async (req, res) => {
  try {
    const newsDoc = await AdminNews.findOne();
    const items = newsDoc ? newsDoc.newsItems : [];
    res.json({ newsItems: items });
  } catch (err) {
    logger.error('GET /news error', { error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /news/:id
router.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsDoc = await AdminNews.findOne();
    if (!newsDoc || !Array.isArray(newsDoc.newsItems)) {
      return res.status(404).json({ message: 'No news found' });
    }

    const item = newsDoc.newsItems.find(n => n._id?.toString() === id || n.id === id);
    if (!item) return res.status(404).json({ message: 'News item not found' });

    res.json(item);
  } catch (err) {
    logger.error('GET /news/:id error', { error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
});

// ------------------- TOGGLE ROUTES -------------------

// PUT /toggle
router.put('/toggle', authMiddleware, async (req, res) => {
  try {
    const { isActive } = req.body;
    let toggle = await AdminToggle.findOne();
    if (!toggle) {
      toggle = new AdminToggle({ isActive });
    } else {
      toggle.isActive = isActive;
    }
    await toggle.save();
    logger.info('Toggle updated', { action: 'PUT /toggle', isActive, user: req.user?.id });
    res.json({ isActive: toggle.isActive });
  } catch (err) {
    logger.error('PUT /toggle error', { error: err.message, user: req.user?.id });
    res.status(500).json({ error: err.message });
  }
});

// GET /toggle
router.get('/toggle', authMiddleware, async (req, res) => {
  try {
    let toggle = await AdminToggle.findOne();
    if (!toggle) {
      toggle = new AdminToggle({ isActive: false });
      await toggle.save();
    }
    const message = toggle.isActive ? "Independence Day" : "Normal Day";
    res.json({ isActive: toggle.isActive, message });
  } catch (err) {
    logger.error('GET /toggle error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// ------------------- BANNER ROUTES -------------------

// PUT /banner
router.put('/banner', authMiddleware, async (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ message: 'Images should be an array' });
    }

    let banner = await AdminBanner.findOne();
    if (!banner) {
      banner = new AdminBanner({ images });
    } else {
      banner.images = images;
    }
    await banner.save();
    logger.info('Banner updated', { action: 'PUT /banner', images, user: req.user?.id });
    res.json(banner);
  } catch (err) {
    logger.error('PUT /banner error', { error: err.message, user: req.user?.id });
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post("/remove", authMiddleware, async (req, res) => {
  const { id } = req.body;
  console.log("[Admin] Remove request for news item ID:", id);
  if (!id) return res.status(400).json({ message: "News item ID is required" });

  try {
    const result = await AdminNews.updateOne({}, { $pull: { newsItems: { _id: id } } });
    if (result.modifiedCount === 0) return res.status(404).json({ message: "News item not found" });

    logger.info({ action: 'DELETE_NEWS_ITEM', performedBy: req.user.email, newsItemId: id, timestamp: new Date() });
    res.status(200).json({ message: "News item deleted successfully" });
  } catch (err) {
    logger.error({ action: 'REMOVE_NEWS_ERROR', error: err.message, performedBy: req.user?.email, timestamp: new Date() });
    res.status(500).json({ message: "Server error" });
  }
});

// GET /banner
router.get('/banner', authMiddleware, async (req, res) => {
  try {
    const banner = await AdminBanner.findOne();
    if (!banner) return res.status(404).json({ message: 'No banner found' });
    res.json(banner);
  } catch (err) {
    logger.error('GET /banner error', { error: err.message });
    res.status(500).json({ message: 'Server Error' });
  }
});

// ------------------- FORWARD TO LEAD ADMIN -------------------

router.put('/forward', async (req, res) => {
  try {
    const adminGalleryData = await AdminGallery.find();
    const adminNewsData = await AdminNews.find();
    const adminToggleData = await AdminToggle.find();
    const adminBannerData = await AdminBanner.find();

    await leadAdminGallery.insertMany(adminGalleryData);

    await leadAdminNews.insertMany(adminNewsData);

    await leadAdminToggle.insertMany(adminToggleData);

    await leadAdminBanner.insertMany(adminBannerData);

    await AdminGallery.deleteMany();
    await AdminNews.deleteMany();
    await AdminToggle.deleteMany();
    await AdminBanner.deleteMany();

    logger.info('Forwarded admin data to lead admin', { action: 'PUT /forward' });
    res.status(200).json({ message: 'Lead admin data restored from admin collections successfully' });
  } catch (error) {
    logger.error('Error forwarding admin data', { error: error.message });
    res.status(500).json({ error: 'Failed to restore lead admin data' });
  }
});

module.exports = router;