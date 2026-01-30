const express = require('express');
const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

const router = express.Router();

// Add agent
router.post('/', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.json(agent);
  } catch (err) {
    if (err.code === 11000) {
      if (err.message.includes('mobile')) {
        return res.status(400).json({ message: 'Duplicate mobile number' });
      } else if (err.message.includes('email')) {
        return res.status(400).json({ message: 'Duplicate email' });
      }
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all agents
router.get('/', auth, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;