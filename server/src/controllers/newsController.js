const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/news (public)
const getNews = async (req, res, next) => {
  try {
    const { category, limit } = req.query;
    const where = {};
    if (category) where.category = category;

    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
};

// GET /api/news/:id (public)
const getNewsById = async (req, res, next) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!news) return res.status(404).json({ success: false, message: 'News item not found' });
    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
};

// POST /api/news (admin)
const createNews = async (req, res, next) => {
  try {
    const { title, subtitle, category, youtubeUrl, image, description, readTime, isLive } = req.body;
    const item = await prisma.news.create({
      data: {
        title,
        subtitle: subtitle || '',
        category: category || 'Market Update',
        youtubeUrl: youtubeUrl || '',
        image: image || null,
        description,
        readTime: readTime || '5 min watch',
        isLive: isLive === true || isLive === 'true',
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// PUT /api/news/:id (admin)
const updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.isLive !== undefined) {
      updates.isLive = updates.isLive === true || updates.isLive === 'true';
    }

    const item = await prisma.news.update({
      where: { id: parseInt(id) },
      data: updates,
    });
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/news/:id (admin)
const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'News item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
