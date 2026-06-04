const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  caption: { type: String, default: '' },
  publicId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
