const ContactMessage = require('../models/ContactMessage');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const msg = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', id: msg._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
