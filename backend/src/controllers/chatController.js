const conversationService = require('../services/conversationService');
const openaiService = require('../services/openaiService');
const { isLikelyTravelQuery } = require('../utils/travelValidator');

async function sendMessage(req, res, next) {
    try {
        const { sessionId, message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        let currentSessionId = sessionId;
        if (!currentSessionId || !conversationService.sessionExists(currentSessionId)) {
            currentSessionId = conversationService.createSession();
        }

        const session = conversationService.getSession(currentSessionId);

        if (!session.active) {
            return res.status(400).json({
                success: false,
                error: 'This conversation has been closed.',
                conversationActive: false
            });
        }

        const quickCheck = isLikelyTravelQuery(message);
        const isTravelRelated = quickCheck !== null ? quickCheck : await openaiService.classifyTravelQuery(message);

        if (!isTravelRelated) {
            const warnings = conversationService.incrementWarnings(currentSessionId);
            conversationService.addMessage(currentSessionId, 'user', message);

            let responseMessage;
            if (warnings === 1) {
                responseMessage = "I'm Voyara's travel assistant and can only help with travel-related questions. Ask me about destinations, hotels, attractions, travel tips, or itineraries!";
            } else {
                responseMessage = "This conversation has been closed due to repeated non-travel queries. Please start a new session if you have travel-related questions.";
                conversationService.closeSession(currentSessionId);
            }

            conversationService.addMessage(currentSessionId, 'assistant', responseMessage);

            return res.json({
                success: true,
                sessionId: currentSessionId,
                message: responseMessage,
                conversationActive: warnings === 1,
                warning: 'non_travel_query',
                messageCount: session.messages.length
            });
        }

        conversationService.resetWarnings(currentSessionId);
        conversationService.addMessage(currentSessionId, 'user', message);

        const history = conversationService.getMessagesForOpenAI(currentSessionId);
        const aiResponse = await openaiService.getChatResponse(history);

        conversationService.addMessage(currentSessionId, 'assistant', aiResponse);

        res.json({
            success: true,
            sessionId: currentSessionId,
            message: aiResponse,
            conversationActive: true,
            messageCount: session.messages.length
        });

    } catch (error) {
        next(error);
    }
}

function getHistory(req, res) {
    const { sessionId } = req.params;

    if (!conversationService.sessionExists(sessionId)) {
        return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const session = conversationService.getSession(sessionId);

    res.json({
        success: true,
        sessionId,
        history: session.messages,
        conversationActive: session.active,
        messageCount: session.messages.length
    });
}

function deleteSession(req, res) {
    const { sessionId } = req.params;
    const deleted = conversationService.deleteSession(sessionId);

    if (deleted) {
        res.json({ success: true, message: 'Session deleted successfully' });
    } else {
        res.status(404).json({ success: false, error: 'Session not found' });
    }
}

module.exports = { sendMessage, getHistory, deleteSession };
