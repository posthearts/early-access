const AccessCode = require('../models/AccessCode');

const generateCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const createAccessCodes = async (req, res) => {
  try {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      const code = generateCode();
      codes.push({ code });
    }

    // Save all codes to the database
    await AccessCode.insertMany(codes);
    res.status(201).json({ message: '10 access codes created', codes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create access codes', details: error.message });
  }
};


const validateAccessCode = async (req, res) => {
    const { code } = req.body;
    try {
      const accessCode = await AccessCode.findOne({ code });
      if (!accessCode) {
        return res.status(404).json({ error: 'Invalid access code' });
      }
      if (accessCode.isUsed) {
        return res.status(400).json({ error: 'Access code already used' });
      }
      accessCode.isUsed = true;
      await accessCode.save();
      res.status(200).json({ message: 'Access granted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate access code' });
    }
  };
  
  module.exports = { createAccessCodes, validateAccessCode };