const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/testimonials (public)
const getTestimonials = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const where = {};
    if (featured !== undefined) where.isFeatured = featured === 'true';

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials (admin)
const createTestimonial = async (req, res, next) => {
  try {
    const { name, role, location, image, quote, rating, isFeatured } = req.body;
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        location: location || '',
        image: image || null,
        quote,
        rating: parseInt(rating) || 5,
        isFeatured: isFeatured !== false,
      },
    });
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/:id (admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.rating) updates.rating = parseInt(updates.rating);
    if (updates.isFeatured !== undefined) {
      updates.isFeatured = updates.isFeatured === true || updates.isFeatured === 'true';
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: updates,
    });
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id (admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
