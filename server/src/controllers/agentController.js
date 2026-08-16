const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAgents = async (req, res, next) => {
  try {
    const agents = await prisma.agent.findMany();
    res.json({ success: true, data: agents });
  } catch (error) {
    next(error);
  }
};

const getAgentById = async (req, res, next) => {
  try {
    const agent = await prisma.agent.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    res.json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

const createAgent = async (req, res, next) => {
  try {
    const { name, role, phone, whatsapp, image, bio } = req.body;
    const agent = await prisma.agent.create({
      data: {
        name,
        role,
        phone,
        whatsapp: whatsapp || phone.replace(/[^0-9]/g, ''),
        image: image || null,
        bio: bio || '',
      },
    });
    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

const updateAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const agent = await prisma.agent.update({
      where: { id: parseInt(id) },
      data: updates,
    });
    res.json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

const deleteAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.agent.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
};
