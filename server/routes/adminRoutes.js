const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const adminCtrl = require('../controllers/adminController');
const reviewCtrl = require('../controllers/reviewController');
const galleryCtrl = require('../controllers/galleryController');
const contactCtrl = require('../controllers/contactController');
const serviceCtrl = require('../controllers/serviceController');

// Auth
router.post('/login', adminCtrl.login);

// Protected routes
router.get('/stats', protect, adminCtrl.getStats);

// Reviews
router.get('/reviews', protect, reviewCtrl.getAllReviews);
router.put('/reviews/:id', protect, reviewCtrl.updateReview);
router.delete('/reviews/:id', protect, reviewCtrl.deleteReview);

// Gallery
router.get('/gallery', protect, galleryCtrl.getGallery);
router.post('/gallery', protect, upload.single('image'), galleryCtrl.addGalleryItem);
router.delete('/gallery/:id', protect, galleryCtrl.deleteGalleryItem);

// Services
router.get('/services', protect, serviceCtrl.getAllServices);
router.post('/services', protect, upload.single('image'), serviceCtrl.createService);
router.put('/services/:id', protect, upload.single('image'), serviceCtrl.updateService);
router.delete('/services/:id', protect, serviceCtrl.deleteService);

// Contacts
router.get('/contacts', protect, contactCtrl.getContacts);
router.put('/contacts/:id/read', protect, contactCtrl.markRead);

module.exports = router;
