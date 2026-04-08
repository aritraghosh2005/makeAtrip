const supabase = require('../config/supabase');

async function signup(req, res, next) {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name)
            return res.status(400).json({ success: false, error: 'email, password and name are required' });

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name }
        });

        if (error) return res.status(400).json({ success: false, error: error.message });

        // Save name to users_profile (trigger only inserts id)
        await supabase.from('users_profile').update({ name }).eq('id', data.user.id);

        // Sign in immediately to get a session token
        const { data: session, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) return res.status(400).json({ success: false, error: signInError.message });

        res.status(201).json({
            success: true,
            user: { id: data.user.id, email: data.user.email, name },
            token: session.session.access_token,
            refreshToken: session.session.refresh_token
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, error: 'email and password are required' });

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return res.status(401).json({ success: false, error: error.message });

        const name = data.user.user_metadata?.name || data.user.email;

        res.json({
            success: true,
            user: { id: data.user.id, email: data.user.email, name },
            token: data.session.access_token,
            refreshToken: data.session.refresh_token
        });
    } catch (err) {
        next(err);
    }
}

async function logout(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            await supabase.auth.admin.signOut(token);
        }
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}

async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(400).json({ success: false, error: 'refreshToken is required' });

        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
        if (error) return res.status(401).json({ success: false, error: error.message });

        res.json({
            success: true,
            token: data.session.access_token,
            refreshToken: data.session.refresh_token
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { signup, login, logout, refresh };
