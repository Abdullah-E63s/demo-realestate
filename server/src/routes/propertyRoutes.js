const express = require('express');
const router = express.Router();
const {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getStats,
  uploadImages,
  uploadMiddleware,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

router.get('/stats', getStats);
router.get('/featured', getFeaturedProperties);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/upload', protect, uploadMiddleware.array('images', 10), uploadImages);
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
