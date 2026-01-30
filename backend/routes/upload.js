const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent');
const List = require('../models/List');
const auth = require('../middleware/auth');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Upload and distribute CSV
router.post('/', auth, upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!['csv'].includes(ext)) return res.status(400).json({ message: 'Invalid file type. Only CSV allowed for simplicity.' });

  const results = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const agents = await Agent.find();
        if (agents.length !== 5) return res.status(400).json({ message: 'Need exactly 5 agents' });

        const itemsPerAgent = Math.floor(results.length / 5);
        let extra = results.length % 5;
        let index = 0;

        for (let i = 0; i < 5; i++) {
          const count = itemsPerAgent + (extra > 0 ? 1 : 0);
          extra--;
          for (let j = 0; j < count; j++) {
            const item = results[index++];
            const list = new List({
              firstName: item.FirstName,
              phone: item.Phone,
              notes: item.Notes,
              agentId: agents[i]._id
            });
            await list.save();
          }
        }

        res.json({ message: 'Lists appended successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
});

// Get lists for each agent
router.get('/', auth, async (req, res) => {
  try {
    const agents = await Agent.find();
    const lists = await List.find().populate('agentId');
    const distributed = agents.map(agent => ({
      agent: agent.name,
      lists: lists.filter(list => list.agentId._id.toString() === agent._id.toString())
    }));
    res.json(distributed);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;