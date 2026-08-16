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

module.exports = { getAgents, getAgentById };
