const express = require('express');
const router = express.Router();
const {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
} = require('../controllers/agentController');
const { protect } = require('../middleware/auth');

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', protect, createAgent);
router.put('/:id', protect, updateAgent);
router.delete('/:id', protect, deleteAgent);

module.exports = router;
