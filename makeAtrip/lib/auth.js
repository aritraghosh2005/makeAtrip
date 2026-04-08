// auth.js — plain JS, no Babel, loads synchronously before any JSX.
// Provides getAuthToken() globally so all pages can get a valid JWT.

function _getStoredSession() {
    try { return JSON.parse(localStorage.getItem('voyara_session')); } catch { return null; }
}

window.getAuthToken = async function () {
    const session = _getStoredSession();
    if (!session?.token) return null;

    try {
        const payload    = JSON.parse(atob(session.token.split('.')[1]));
        const expiresAt  = payload.exp * 1000;
        const bufferMs   = 60 * 1000; // refresh 1 min before expiry

        if (Date.now() < expiresAt - bufferMs) return session.token;

        // Token expired — try to refresh
        if (!session.refreshToken) return null;

        const res  = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: session.refreshToken })
        });
        const data = await res.json();

        if (!data.success) {
            localStorage.removeItem('voyara_session');
            return null;
        }

        localStorage.setItem('voyara_session', JSON.stringify({
            ...session,
            token: data.token,
            refreshToken: data.refreshToken
        }));
        return data.token;

    } catch {
        return session.token; // decode failed — return as-is
    }
};
