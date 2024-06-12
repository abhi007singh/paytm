const express = require('express');
const { signup, signin, updateUser, bulkUsers } = require('../controller/user');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/bulk', authenticateToken, bulkUsers);
router.put('/', authenticateToken, updateUser);

module.exports = router;
