const express = require('express');
const router = express.Router();

const SuperAdminToggle = require('../superadmin/button');  
const SuperAdminGallery = require('../superadmin/content'); 
const SuperAdminNews = require('../superadmin/news'); 
const SuperAdminBanner = require('../superadmin/img'); 

const authMiddleware = require("../controler/super"); 
const User = require("../models/User");

const { sendToMultiple } = require("../controler/mailer");

const Gallery = require('../models/content'); // adjust path
const News = require('../models/news'); // adjust path
const Toggle = require('../models/button'); // adjust path
const Galleryy = require('../models/img'); // adjust path


// ------------------ GALLERY ------------------
router.put('/gallery', authMiddleware, async (req, res) => {
  try {
    console.log('[superadmin] PUT /gallery incoming body:', JSON.stringify(req.body));
    const galleryImages = req.body.galleryImages;

    if (!Array.isArray(galleryImages)) {
      return res.status(400).json({ error: "galleryImages must be an array" });
    }

    let gallery = await SuperAdminGallery.findOne();
    if (gallery) {
      gallery.galleryImages = galleryImages;  
      await gallery.save();
    } else {
      gallery = new SuperAdminGallery({ galleryImages });
      await gallery.save();
    }

    res.json({ message: "Gallery updated successfully", gallery });
  } catch (err) {
    console.error('[superadmin] PUT /gallery error:', err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/gallery', authMiddleware, async (req, res) => {
  try {
    let gallery = await SuperAdminGallery.findOne();
    if (!gallery) {
      gallery = new SuperAdminGallery({ galleryImages: [] });
      await gallery.save();
    }
    res.json({ galleryImages: gallery.galleryImages, _id: gallery._id });
  } catch (err) {
    console.error('[superadmin] GET /gallery error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ------------------ NEWS ------------------
router.put('/news', authMiddleware, async (req, res) => {
  try {
    const newsItems = req.body.newsItems;

    if (!Array.isArray(newsItems)) {
      return res.status(400).json({ error: "newsItems must be an array" });
    }

    let newsDoc = await SuperAdminNews.findOne();
    if (newsDoc) {
      newsDoc.newsItems = [...(newsDoc.newsItems || []), ...newsItems];
      await newsDoc.save();
    } else {
      newsDoc = new SuperAdminNews({ newsItems });
      await newsDoc.save();
    }

    res.json({ message: "News updated successfully", news: newsDoc });
  } catch (err) {
    console.error('[superadmin] PUT /news error:', err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/remove", async (req, res) => {
  const { id } = req.body; // this is the _id of the news item inside newsItems

  if (!id) {
    return res.status(400).json({ message: "News item ID is required" });
  }

  try {
    // Remove the news item from the newsItems array
    const result = await SuperAdminNews.updateOne(
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


router.get('/news', async (req, res) => {
  try {
    const newsDoc = await SuperAdminNews.findOne();
    const items = newsDoc ? newsDoc.newsItems : [];
    res.json({ newsItems: items });
  } catch (err) {
    console.error('[superadmin] GET /news error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsDoc = await SuperAdminNews.findOne();
    if (!newsDoc || !Array.isArray(newsDoc.newsItems)) {
      return res.status(404).json({ message: 'No news found' });
    }
    const item = newsDoc.newsItems.find(n => n && (n._id?.toString?.() === id || n.id === id));
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    return res.json(item);
  } catch (err) {
    console.error('[superadmin] GET /news/:id error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// ------------------ TOGGLE ------------------
router.put('/toggle', authMiddleware, async (req, res) => {
  try {
    const { isActive } = req.body; 

    let toggle = await SuperAdminToggle.findOne();
    if (!toggle) {
      toggle = new SuperAdminToggle({ isActive });
    } else {
      toggle.isActive = isActive;
    }
    await toggle.save();

    res.json({ isActive: toggle.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/toggle', authMiddleware, async (req, res) => {
  try {
    let toggle = await SuperAdminToggle.findOne();
    if (!toggle) {
      toggle = new SuperAdminToggle({ isActive: false });
      await toggle.save();
    }
    const message = toggle.isActive ? "Independence Day" : "Normal Day";
    res.json({ isActive: toggle.isActive, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------ BANNER ------------------
router.put('/banner', authMiddleware, async (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ message: 'Images should be an array' });
    }

    let banner = await SuperAdminBanner.findOne();
    if (!banner) {
      banner = new SuperAdminBanner({ images });
    } else {
      banner.images = images;
    }
    await banner.save();

    res.json(banner);
  } catch (err) {
    console.error('[superadmin] PUT /banner error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/banner', authMiddleware, async (req, res) => {
  try {
    const banner = await SuperAdminBanner.findOne();

    if (!banner) {
      return res.status(404).json({ message: 'No banner found' });
    }

    res.json(banner);
  } catch (err) {
    console.error('[superadmin] GET /banner error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});



// ------------------ ALL CONTENT ------------------
router.get('/all-content', async (req, res) => {
  try {
    const newsDoc = await SuperAdminNews.findOne();      
    const galleryDoc = await SuperAdminGallery.findOne(); 
    let toggle = await SuperAdminToggle.findOne();
    let banner = await SuperAdminBanner.findOne();

    res.json({
      newsItems: newsDoc ? newsDoc.newsItems : [],
      galleryImages: galleryDoc ? galleryDoc.galleryImages : [],
      banner: banner ? banner.images : [],
      toggle: toggle ? toggle.isActive : false
    });
  } catch (error) {
    console.error('[superadmin] GET /all-content error:', error);
    res.status(500).json({ message: 'Server error fetching content' });
  }
});


router.put('/forward', authMiddleware, async (req, res) => {
  try {
    // Fetch data from super admin collections
    const superAdminGalleryData = await SuperAdminGallery.find();
    const superAdminNewsData = await SuperAdminNews.find();
    const superAdminToggleData = await SuperAdminToggle.find();
    const superAdminBannerData = await SuperAdminBanner.find();

    // Add super admin data to normal collections without deleting existing data
    if (superAdminGalleryData.length > 0) {
      await Gallery.insertMany(superAdminGalleryData);
    }

    if (superAdminNewsData.length > 0) {
      await News.insertMany(superAdminNewsData);
    }

    if (superAdminToggleData.length > 0) {
      await Toggle.insertMany(superAdminToggleData);
    }

    if (superAdminBannerData.length > 0) {
      await Galleryy.insertMany(superAdminBannerData);
    }

    res.status(200).json({ message: 'Super admin data added to normal collections successfully' });
  } catch (error) {
    console.error('Error adding super admin data:', error);
    res.status(500).json({ error: 'Failed to add super admin data' });
  }
});




router.put('/reject',authMiddleware, async (req, res) => {
  try {
    // Fetch current content before delete
    const newsDoc = await SuperAdminNews.findOne();
    const galleryDoc = await SuperAdminGallery.findOne();
    const toggle = await SuperAdminToggle.findOne();
    const banner = await SuperAdminBanner.findOne();

    // Fetch superadmin emails
    const admins = await User.find({ role: 'leadadmin' }).select('email');
    const emails = admins.map(admin => admin.email);

    // Send email if admins exist
    if (emails.length > 0) {
      const subject = 'Content Rejected';
      const text = `Super admin content rejected and cleared.\n\nPrevious content:\nNews: ${JSON.stringify(newsDoc?.newsItems || [])}\nGallery: ${JSON.stringify(galleryDoc?.galleryImages || [])}\nToggle: ${toggle?.isActive || false}\nBanner: ${JSON.stringify(banner?.images || [])}`;
      await sendToMultiple(emails, subject, text);
    }

    // Delete content
    await SuperAdminGallery.deleteMany();
    await SuperAdminNews.deleteMany();
    await SuperAdminToggle.deleteMany();
    await SuperAdminBanner.deleteMany();

    res.json({ message: 'Super admin content rejected, emailed to admins, and cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
