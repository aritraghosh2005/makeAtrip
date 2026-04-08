const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/chat/message
router.post('/message', authMiddleware, chatController.sendMessage);

// GET /api/chat/history/:sessionId
router.get('/history/:sessionId', chatController.getHistory);

// DELETE /api/chat/session/:sessionId
router.delete('/session/:sessionId', chatController.deleteSession);


module.exports = router;
