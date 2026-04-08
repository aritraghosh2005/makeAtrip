const supabase = require('../config/supabase');

// Reads Authorization: Bearer <supabase-jwt>, verifies it, sets req.userId.
// If no token is present, sets req.userId = null and continues.
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        req.userId = null;
        return next();
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    req.userId = error ? null : user.id;
    next();
}

module.exports = authMiddleware;
