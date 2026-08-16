const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Multer storage for property image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = process.env.VERCEL ? path.join('/tmp', 'uploads') : path.join(__dirname, '../../uploads');
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch (e) {
      console.warn('Uploads directory warning:', e.message);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'prop-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// GET /api/properties
const getProperties = async (req, res, next) => {
  try {
    const {
      society,
      type,
      status,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      sizeUnit,
      isFeatured,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = req.query;

    const where = {};
    if (society) where.society = { contains: society };
    if (type) where.type = type;
    if (status) where.status = status;
    if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (minSize || maxSize) {
      where.size = {};
      if (minSize) where.size.gte = parseFloat(minSize);
      if (maxSize) where.size.lte = parseFloat(maxSize);
    }
    if (sizeUnit) where.sizeUnit = sizeUnit;

    const orderBy = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      size_asc: { size: 'asc' },
      size_desc: { size: 'desc' },
    }[sort] || { createdAt: 'desc' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [properties, total] = await Promise.all([
      prisma.property.findMany({ where, orderBy, skip, take }),
      prisma.property.count({ where }),
    ]);

    // Parse JSON fields
    const parsed = properties.map((p) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));

    res.json({
      success: true,
      data: parsed,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/properties/featured
const getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany({
      where: { isFeatured: true, status: 'Available' },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const parsed = properties.map((p) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));

    res.json({ success: true, data: parsed });
  } catch (error) {
    next(error);
  }
};

// GET /api/properties/:id
const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({
      success: true,
      data: {
        ...property,
        images: JSON.parse(property.images || '[]'),
        features: JSON.parse(property.features || '[]'),
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/properties (admin)
const createProperty = async (req, res, next) => {
  try {
    const {
      title, slug, type, status, price, priceLabel, size, sizeUnit,
      society, phase, location, description, features, images, isFeatured,
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title, slug, type, status: status || 'Available', price: parseFloat(price),
        priceLabel, size: parseFloat(size), sizeUnit: sizeUnit || 'Marla',
        society, phase, location, description,
        features: JSON.stringify(features || []),
        images: JSON.stringify(images || []),
        isFeatured: isFeatured || false,
      },
    });

    res.status(201).json({
      success: true,
      data: { ...property, images: JSON.parse(property.images), features: JSON.parse(property.features) },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/properties/:id (admin)
const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.size) updates.size = parseFloat(updates.size);
    if (updates.features && Array.isArray(updates.features)) updates.features = JSON.stringify(updates.features);
    if (updates.images && Array.isArray(updates.images)) updates.images = JSON.stringify(updates.images);

    const property = await prisma.property.update({
      where: { id: parseInt(id) },
      data: updates,
    });

    res.json({
      success: true,
      data: { ...property, images: JSON.parse(property.images || '[]'), features: JSON.parse(property.features || '[]') },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/properties/:id (admin)
const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.property.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /api/properties/stats (public)
const getStats = async (req, res, next) => {
  try {
    const [total, available, sold, featured] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'Available' } }),
      prisma.property.count({ where: { status: 'Sold' } }),
      prisma.property.count({ where: { isFeatured: true } }),
    ]);
    res.json({ success: true, data: { total, available, sold, featured } });
  } catch (error) {
    next(error);
  }
};

// Upload property images (admin)
const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }

    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

    res.json({
      success: true,
      message: `${req.files.length} image(s) uploaded successfully`,
      data: fileUrls,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getStats,
  uploadImages,
  uploadMiddleware: upload,
};
