const express = require('express');
const router = express.Router();
const LeadAdminToggle = require('../leadadminmodal/button'); 
const LeadAdminGallery = require('../leadadminmodal/content'); 
const LeadAdminNews = require('../leadadminmodal/news'); 
const LeadAdminBanner = require('../leadadminmodal/img'); 
const authMiddleware = require("../controler/lead"); 
const SuperAdminToggle = require('../superadmin/button');  // ✅ fixed (capital S)
const SuperAdminGallery = require('../superadmin/content'); 
const SuperAdminNews = require('../superadmin/news'); 
const SuperAdminBanner = require('../superadmin/img'); 
const User = require("../models/User");
const { sendToMultiple } = require("../controler/mailer");
// Import normal collections for restore functionality
const Gallery = require('../models/content');
const News = require('../models/news');
const Toggle = require('../models/button');
const Galleryy = require('../models/img');





// PUT /gallery
router.put('/gallery', authMiddleware, async (req, res) => {
  try {
    console.log('[content] PUT /gallery incoming body:', JSON.stringify(req.body));
    const galleryImages = req.body.galleryImages; 

    if (!Array.isArray(galleryImages)) {
      return res.status(400).json({ error: "galleryImages must be an array" });
    }

    let gallery = await LeadAdminGallery.findOne();
    if (gallery) {
      gallery.galleryImages = galleryImages;  
      await gallery.save();
    } else {
      gallery = new LeadAdminGallery({ galleryImages });
      await gallery.save();
    }

    res.json({ message: "Gallery updated successfully", gallery });
  } catch (err) {
    console.error('[content] PUT /gallery error:', err);
    res.status(500).json({ error: "Server error" });
  }
});


// PUT /news
router.put('/news', authMiddleware, async (req, res) => {
  try {
    const newsItems = req.body.newsItems; 

    if (!Array.isArray(newsItems)) {
      return res.status(400).json({ error: "newsItems must be an array" });
    }

    let newsDoc = await LeadAdminNews.findOne();

    if (newsDoc) {
      newsDoc.newsItems = [...(newsDoc.newsItems || []), ...newsItems];
      await newsDoc.save();
    } else {
      newsDoc = new LeadAdminNews({ newsItems });
      await newsDoc.save();
    }

    res.json({ message: "News updated successfully", news: newsDoc });
  } catch (err) {
    console.error(err);
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
    if (!newsDoc || !Array.isArray(newsDoc.newsItems)) {
      return res.status(404).json({ message: 'No news found' });
    }

    const item = newsDoc.newsItems.find((n) => 
      n && (n._id?.toString?.() === id || n.id === id)
    );

    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    return res.json(item);
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


// PUT /toggle
router.put('/toggle', authMiddleware, async (req, res) => {
  try {
    const { isActive } = req.body; 

    let toggle = await LeadAdminToggle.findOne();
    if (!toggle) {
      toggle = new LeadAdminToggle({ isActive });
    } else {
      toggle.isActive = isActive;
    }
    await toggle.save();

    res.json({ isActive: toggle.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /toggle
router.get('/toggle', authMiddleware, async (req, res) => {
  try {
    let toggle = await LeadAdminToggle.findOne();
    if (!toggle) {
      toggle = new LeadAdminToggle({ isActive: false });
      await toggle.save();
    }
    const message = toggle.isActive ? "Independence Day" : "Normal Day";
    res.json({ isActive: toggle.isActive, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    if (!Array.isArray(images)) {
      return res.status(400).json({ message: 'Images should be an array' });
    }

    let banner = await LeadAdminBanner.findOne();
    if (!banner) {
      banner = new LeadAdminBanner({ images });
    } else {
      banner.images = images;
    }

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/banner', authMiddleware, async (req, res) => {
  try {
    const banner = await LeadAdminBanner.findOne();

    if (!banner) {
      return res.status(404).json({ message: 'No banner found' });
    }

    res.json(banner);
  } catch (err) {
    console.error('[superadmin] GET /banner error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


// PUT /restore - restore from normal collections to lead admin collections
router.put('/restore', async (req, res) => {
  try {
    // Fetch data from normal collections
    const galleryData = await Gallery.find();
    const newsData = await News.find();
    const toggleData = await Toggle.find();
    const bannerData = await Galleryy.find();

    // Replace lead admin collections with normal data
    await LeadAdminGallery.deleteMany();
    await LeadAdminGallery.insertMany(galleryData);

    await LeadAdminNews.deleteMany();
    await LeadAdminNews.insertMany(newsData);

    await LeadAdminToggle.deleteMany();
    await LeadAdminToggle.insertMany(toggleData);

    await LeadAdminBanner.deleteMany();
    await LeadAdminBanner.insertMany(bannerData);

    res.status(200).json({ message: 'Lead admin data restored from normal collections successfully' });
  } catch (error) {
    console.error('Error restoring lead admin data:', error);
    res.status(500).json({ error: 'Failed to restore lead admin data' });
  }
});

// PUT /forward  (Lead -> Super)
router.put('/forward', authMiddleware,async (req, res) => {
  try {
    // Fetch data from lead admin collections
    const leadAdminGalleryData = await LeadAdminGallery.find();
    const leadAdminNewsData = await LeadAdminNews.find();
    const leadAdminToggleData = await LeadAdminToggle.find();
    const leadAdminBannerData = await LeadAdminBanner.find();

    // Replace super admin collections with lead admin data
    await SuperAdminGallery.deleteMany();
    await SuperAdminGallery.insertMany(leadAdminGalleryData);

    await SuperAdminNews.deleteMany();
    await SuperAdminNews.insertMany(leadAdminNewsData);

    await SuperAdminToggle.deleteMany();   // ✅ fixed naming
    await SuperAdminToggle.insertMany(leadAdminToggleData);

    await SuperAdminBanner.deleteMany();
    await SuperAdminBanner.insertMany(leadAdminBannerData);

    res.status(200).json({ message: 'Super admin data restored from lead admin collections successfully' });
  } catch (error) {
    console.error('Error restoring super admin data:', error);
    res.status(500).json({ error: 'Failed to restore super admin data' });
  }
});

router.post("/remove", async (req, res) => {
  const { id } = req.body; // this is the _id of the news item inside newsItems

  if (!id) {
    return res.status(400).json({ message: "News item ID is required" });
  }

  try {
    // Remove the news item from the newsItems array
    const result = await LeadAdminNews.updateOne(
      {}, // assuming there's only one document holding all news
      { $pull: { newsItems: { _id: id } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(200).json({ message: "News item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// PUT /reject (Clear Lead Admin content)
router.put('/reject', authMiddleware, async (req, res) => {
  try {
    // Fetch current content before delete
    const newsDoc = await LeadAdminNews.findOne();
    const galleryDoc = await LeadAdminGallery.findOne();
    const toggle = await LeadAdminToggle.findOne();
    const banner = await LeadAdminBanner.findOne();

    // Fetch admin emails
    const admins = await User.find({ role: 'admin' }).select('email');
    const emails = admins.map(admin => admin.email);

    // Send email if admins exist
    if (emails.length > 0) {
      const subject = 'Content Rejected';
      const text = `Lead admin content rejected and cleared.\n\nPrevious content:\nNews: ${JSON.stringify(newsDoc?.newsItems || [])}\nGallery: ${JSON.stringify(galleryDoc?.galleryImages || [])}\nToggle: ${toggle?.isActive || false}\nBanner: ${JSON.stringify(banner?.images || [])}`;
      await sendToMultiple(emails, subject, text);
    }

    // Delete content
    await LeadAdminGallery.deleteMany();
    await LeadAdminNews.deleteMany();
    await LeadAdminToggle.deleteMany();
    await LeadAdminBanner.deleteMany();

    res.json({ message: 'Lead admin content rejected, emailed to admins, and cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
