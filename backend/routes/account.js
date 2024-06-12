const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { transfer, balance } = require('../controller/account');

const router = express.Router();

router.get('/balance', authenticateToken, balance);
router.post('/transfer', authenticateToken, transfer);

module.exports = router;