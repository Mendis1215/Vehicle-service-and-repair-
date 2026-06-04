const Gallery = require('../models/Gallery');
const { cloudinary } = require('../middleware/uploadMiddleware');

// Public
exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin
exports.addGalleryItem = async (req, res) => {
  try {
    const { type, caption, youtubeUrl } = req.body;
    let url = '';
    let thumbnailUrl = '';
    let publicId = '';

    if (type === 'video') {
      url = youtubeUrl;
      // Extract YouTube ID for thumbnail
      const ytId = youtubeUrl && youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      thumbnailUrl = ytId ? `https://img.youtube.com/vi/${ytId[1]}/hqdefault.jpg` : '';
    } else if (req.file) {
      // Cloudinary file upload
      url = req.file.path;
      thumbnailUrl = req.file.path;
      publicId = req.file.filename;
    } else if (req.body.url) {
      // Direct image URL (no file uploaded)
      url = req.body.url;
      thumbnailUrl = req.body.url;
    }

    const item = await Gallery.create({ type: type || 'image', url, thumbnailUrl, caption, publicId });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }
    await item.deleteOne();
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
