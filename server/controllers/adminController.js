const Admin = require('../models/Admin');
const Review = require('../models/Review');
const Gallery = require('../models/Gallery');
const Service = require('../models/Service');
const ContactMessage = require('../models/ContactMessage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      res.json({ token: generateToken(admin._id), username: admin.username });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [totalReviews, pendingReviews, approvedReviews, galleryCount, contactCount, serviceCount] = await Promise.all([
      Review.countDocuments(),
      Review.countDocuments({ status: 'pending' }),
      Review.countDocuments({ status: 'approved' }),
      Gallery.countDocuments(),
      ContactMessage.countDocuments(),
      Service.countDocuments({ isActive: true })
    ]);
    res.json({ totalReviews, pendingReviews, approvedReviews, galleryCount, contactCount, serviceCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seed admin if not exists
exports.seedAdmin = async () => {
  const count = await Admin.countDocuments();
  if (count === 0) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', passwordHash });
    console.log('Default admin created: admin / admin123');
  }
};
