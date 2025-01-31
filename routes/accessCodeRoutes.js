const express = require('express');
const { createAccessCodes, validateAccessCode } = require('../controllers/accessCodeController');

const router = express.Router();

router.post('/generate', createAccessCodes);
router.post('/validate', validateAccessCode);

module.exports = router;