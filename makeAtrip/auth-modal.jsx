// Auth modal — JSX, Babel standalone (same pattern as chat-widget.jsx)

(function () {
    const { useState, useEffect } = React;

    function getStoredSession() {
        try { return JSON.parse(localStorage.getItem('voyara_session')); } catch { return null; }
    }

    function updateNavbar(user) {
        const btn = document.querySelector('.nav-cta');
        if (!btn) return;
        const displayName = user.name || user.email.split('@')[0];
        btn.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${displayName}`;
        btn.onclick = () => window.openProfileDrawer?.();
        btn.title = 'View profile';
    }

    function resetNavbar() {
        const btn = document.querySelector('.nav-cta');
        if (!btn) return;
        btn.innerHTML = `<i class="fa-solid fa-circle-user"></i> My Account`;
        btn.onclick = () => window.openAuthModal();
        btn.title = '';
    }

    async function doLogout() {
        const session = getStoredSession();
        if (session?.token) {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${session.token}` }
            }).catch(() => {});
        }
        localStorage.removeItem('voyara_session');
        resetNavbar();
    }

    function AuthModal() {
        const [isOpen,   setIsOpen]  = useState(false);
        const [tab,      setTab]     = useState('login');
        const [form,     setForm]    = useState({ name: '', email: '', password: '' });
        const [loading,  setLoading] = useState(false);
        const [error,    setError]   = useState('');

        // Restore session on mount
        useEffect(() => {
            const session = getStoredSession();
            if (session?.user) updateNavbar(session.user);
            else resetNavbar();
        }, []);

        // Listen for external trigger
        useEffect(() => {
            const handler = () => setIsOpen(true);
            document.addEventListener('voyara:open-auth', handler);
            return () => document.removeEventListener('voyara:open-auth', handler);
        }, []);

        // Reset navbar when drawer logs out
        useEffect(() => {
            const handler = () => resetNavbar();
            document.addEventListener('voyara:logout', handler);
            return () => document.removeEventListener('voyara:logout', handler);
        }, []);

        function switchTab(t) {
            setTab(t);
            setError('');
            setForm({ name: '', email: '', password: '' });
        }

        function handleInput(e) {
            setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
            setError('');
        }

        async function handleSubmit(e) {
            e.preventDefault();
            setLoading(true);
            setError('');

            const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/signup';
            const body = tab === 'login'
                ? { email: form.email, password: form.password }
                : { name: form.name, email: form.email, password: form.password };

            try {
                const res  = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const data = await res.json();

                if (!data.success) {
                    setError(data.error || 'Something went wrong.');
                } else {
                    localStorage.setItem('voyara_session', JSON.stringify({ token: data.token, refreshToken: data.refreshToken, user: data.user }));
                    updateNavbar(data.user);
                    setIsOpen(false);
                    setForm({ name: '', email: '', password: '' });
                    document.dispatchEvent(new CustomEvent('voyara:login', { detail: data.user }));
                }
            } catch {
                setError('Could not reach the server. Is the backend running?');
            } finally {
                setLoading(false);
            }
        }

        if (!isOpen) return null;

        return (
            <div id="auth-overlay" onClick={e => { if (e.target.id === 'auth-overlay') setIsOpen(false); }}>
                <div id="auth-modal">

                    {/* Header */}
                    <div id="auth-modal-header">
                        <div id="auth-modal-logo">
                            <div id="auth-logo-dot"></div>
                            <span>Voyara</span>
                        </div>
                        <button id="auth-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    {/* Tabs */}
                    <div id="auth-tabs">
                        <button className={`auth-tab${tab === 'login'  ? ' active' : ''}`} onClick={() => switchTab('login')}>Login</button>
                        <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => switchTab('signup')}>Sign Up</button>
                    </div>

                    {/* Form */}
                    <form id="auth-form" onSubmit={handleSubmit}>
                        {tab === 'signup' && (
                            <div className="auth-field">
                                <label>Name</label>
                                <input type="text" name="name" value={form.name} onChange={handleInput} placeholder="Your full name" required />
                            </div>
                        )}
                        <div className="auth-field">
                            <label>Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleInput} placeholder="you@example.com" required />
                        </div>
                        <div className="auth-field">
                            <label>Password</label>
                            <input type="password" name="password" value={form.password} onChange={handleInput} placeholder="••••••••" required minLength={6} />
                        </div>

                        {error && <div id="auth-error">{error}</div>}

                        <button type="submit" id="auth-submit" disabled={loading}>
                            {loading ? 'Please wait…' : tab === 'login' ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                </div>
            </div>
        );
    }

    const root = document.createElement('div');
    root.id = 'voyara-auth-root';
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(<AuthModal />);

    window.openAuthModal = function () {
        document.dispatchEvent(new CustomEvent('voyara:open-auth'));
    };


})();
