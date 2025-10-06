const express = require('express');
const router = express.Router();
const Gallery = require('../models/content'); // adjust path
const News = require('../models/news'); // adjust path
const Toggle = require('../models/button'); // adjust path
const Galleryy = require('../models/img'); // adjust path
const authMiddleware = require("../controler/Auth"); // import middleware



// PUT /gallery
router.put('/gallery', authMiddleware, async (req, res) => {
  try {
    console.log('[content] PUT /gallery incoming body:', JSON.stringify(req.body));
    const galleryImages = req.body.galleryImages; // frontend sends { galleryImages: [...] }

    if (!Array.isArray(galleryImages)) {
      return res.status(400).json({ error: "galleryImages must be an array" });
    }

    console.log('[content] PUT /gallery items count:', galleryImages.length);
    if (galleryImages.length > 0) {
      console.log('[content] First item sample:', galleryImages[0]);
    }

    // Replace the array in the first document
    let gallery = await Gallery.findOne();
    if (gallery) {
      gallery.galleryImages = galleryImages;  // replace existing array
      await gallery.save();
    } else {
      // if no document exists, create a new one
      gallery = new Gallery({ galleryImages });
      await gallery.save();
    }
    console.log('[content] PUT /gallery saved. docId:', gallery._id?.toString(), 'count:', Array.isArray(gallery.galleryImages) ? gallery.galleryImages.length : 0);
    res.json({ message: "Gallery updated successfully", gallery });
  } catch (err) {
    console.error('[content] PUT /gallery error:', err);
    res.status(500).json({ error: "Server error" });
  }
});


router.put('/news', authMiddleware, async (req, res) => {
  try {
    const newsItems = req.body.newsItems; // frontend sends { newsItems: [...] }

    if (!Array.isArray(newsItems)) {
      return res.status(400).json({ error: "newsItems must be an array" });
    }

    // Find the first document
    let newsDoc = await News.findOne();

    if (newsDoc) {
      // Append new items to existing ones instead of replacing
      newsDoc.newsItems = [...(newsDoc.newsItems || []), ...newsItems];
      await newsDoc.save();
    } else {
      // Create new document if none exists
      newsDoc = new News({ newsItems });
      await newsDoc.save();
    }

    res.json({ message: "News updated successfully", news: newsDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /news - return all news items
router.get('/news', async (req, res) => {
  try {
    console.log('[content] GET /news');
    const newsDoc = await News.findOne();
    const items = newsDoc ? newsDoc.newsItems : [];
    console.log('[content] GET /news count:', Array.isArray(items) ? items.length : 0);
    res.json({ newsItems: items });
  } catch (err) {
    console.error('[content] GET /news error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post("/remove", async (req, res) => {
  const { id } = req.body; // this is the _id of the news item inside newsItems

  if (!id) {
    return res.status(400).json({ message: "News item ID is required" });
  }

  try {
    // Remove the news item from the newsItems array
    const result = await News.updateOne(
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


// GET /news/:id - return a single news item by its subdocument _id
router.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('[content] GET /news/:id', id);
    const newsDoc = await News.findOne();
    if (!newsDoc || !Array.isArray(newsDoc.newsItems)) {
      return res.status(404).json({ message: 'No news found' });
    }
    const item = newsDoc.newsItems.find((n) => {
      try {
        // Support both ObjectId subdocs and plain string ids
        return (n && (n._id?.toString?.() === id || n.id === id));
      } catch {
        return false;
      }
    });
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    return res.json(item);
  } catch (err) {
    console.error('[content] GET /news/:id error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all-content', async (req, res) => {
  try {
    // Fetch both from DB
    const newsDoc = await News.findOne();      // since you keep all newsItems in one doc
    const galleryDoc = await Gallery.findOne(); // same for galleryImages
    let toggle = await Toggle.findOne();
    let banner = await Galleryy.findOne(); // only one gallery document

    res.json({
      newsItems: newsDoc ? newsDoc.newsItems : [],
      galleryImages: galleryDoc ? galleryDoc.galleryImages : [],
       banner: banner ? banner.images : [],
      toggle: toggle ? toggle.isActive : false
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching content' });
  }
});



// Update state
router.put('/toggle',authMiddleware, async (req, res) => {
  try {
    const { isActive } = req.body; // { isActive: true/false }

    let toggle = await Toggle.findOne();
    if (!toggle) {
      toggle = new Toggle({ isActive });
    } else {
      toggle.isActive = isActive;
    }
    await toggle.save();

    res.json({ isActive: toggle.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET route to retrieve the current state
router.get('/toggle',authMiddleware, async (req, res) => {
  try {
    let toggle = await Toggle.findOne();

    // If not found, create a default one (optional)
    if (!toggle) {
      toggle = new Toggle({ isActive: false });
      await toggle.save();
    }

    // Determine the message based on isActive
    const message = toggle.isActive ? "Independence Day" : "Normal Day";

    res.json({ isActive: toggle.isActive, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/gallery',authMiddleware, async (req, res) => {
  try {
    console.log('[content] GET /gallery');
    // Use the same Gallery model as PUT /gallery for consistency
    let gallery = await Gallery.findOne();
    if (!gallery) {
      gallery = new Gallery({ galleryImages: [] });
      await gallery.save();
    }
    const count = Array.isArray(gallery.galleryImages) ? gallery.galleryImages.length : 0;
    console.log('[content] GET /gallery docId:', gallery._id?.toString(), 'count:', count);
    if (count > 0) {
      console.log('[content] GET /gallery first item sample:', gallery.galleryImages[0]);
    }
    res.json({ galleryImages: gallery.galleryImages, _id: gallery._id });
  } catch (err) {
    console.error('[content] GET /gallery error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/banner',authMiddleware, async (req, res) => {
  try {
    console.log('[content] PUT /banner incoming body:', req.body);
    const { images } = req.body; // frontend sends { images: [...] }

    if (!Array.isArray(images)) {
      return res.status(400).json({ message: 'Images should be an array' });
    }

    let gallery = await Galleryy.findOne();
    if (!gallery) {
      gallery = new Galleryy({ images });
    } else {
      gallery.images = images; // replace existing array
    }

    await gallery.save();
    console.log('[content] PUT /banner saved images count:', Array.isArray(gallery.images) ? gallery.images.length : 0);
    res.json(gallery);
  } catch (err) {
    console.error('[content] PUT /banner error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.get('/banner', authMiddleware, async (req, res) => {
  try {
    const banner = await Galleryy.findOne();

    if (!banner) {
      return res.status(404).json({ message: 'No banner found' });
    }

    res.json(banner);
  } catch (err) {
    console.error('[superadmin] GET /banner error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
