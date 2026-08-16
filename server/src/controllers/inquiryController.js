const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/inquiries (public)
const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, type, propertyId } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, phone, and message are required' });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        type: type || 'general',
        propertyId: propertyId ? parseInt(propertyId) : null,
      },
    });

    res.status(201).json({ success: true, data: inquiry, message: 'Inquiry submitted successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries (admin)
const getInquiries = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    const where = {};
    if (isRead !== undefined) where.isRead = isRead === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: { property: { select: { title: true, slug: true } } },
      }),
      prisma.inquiry.count({ where }),
    ]);

    res.json({
      success: true,
      data: inquiries,
      pagination: { total, page: parseInt(page), limit: take, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/inquiries/:id/read (admin)
const markAsRead = async (req, res, next) => {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(req.params.id) },
      data: { isRead: true },
    });
    res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/inquiries/:id (admin)
const deleteInquiry = async (req, res, next) => {
  try {
    await prisma.inquiry.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, markAsRead, deleteInquiry };
