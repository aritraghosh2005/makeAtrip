// Profile drawer — slides in from the right when a logged-in user clicks "My Account"

(function () {
    const { useState, useEffect } = React;

    function ProfileDrawer() {
        const [isOpen,   setIsOpen]   = useState(false);
        const [user,     setUser]     = useState(null);
        const [bookings, setBookings] = useState([]);
        const [loading,  setLoading]  = useState(false);

        useEffect(() => {
            const handler = () => {
                const session = JSON.parse(localStorage.getItem('voyara_session') || 'null');
                if (session?.user) {
                    setUser(session.user);
                    setIsOpen(true);
                    loadBookings();
                }
            };
            document.addEventListener('voyara:open-profile', handler);
            return () => document.removeEventListener('voyara:open-profile', handler);
        }, []);

        // Close on voyara:logout
        useEffect(() => {
            const handler = () => { setIsOpen(false); setUser(null); setBookings([]); };
            document.addEventListener('voyara:logout', handler);
            return () => document.removeEventListener('voyara:logout', handler);
        }, []);

        async function loadBookings() {
            setLoading(true);
            try {
                const token = await window.getAuthToken?.();
                if (!token) return;

                const res  = await fetch('/api/bookings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setBookings((data.bookings || []).filter(b => b.booking_status !== 'cancelled'));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        async function handleLogout() {
            const session = JSON.parse(localStorage.getItem('voyara_session') || 'null');
            if (session?.token) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${session.token}` }
                }).catch(() => {});
            }
            localStorage.removeItem('voyara_session');
            setIsOpen(false);
            setUser(null);
            setBookings([]);
            document.dispatchEvent(new CustomEvent('voyara:logout'));
        }

        return (
            <>
                <div
                    id="profile-overlay"
                    className={isOpen ? 'open' : ''}
                    onClick={() => setIsOpen(false)}
                />
                <div id="profile-drawer" className={isOpen ? 'open' : ''}>

                    {/* Header */}
                    <div id="drawer-header">
                        <div id="drawer-logo">
                            <div id="drawer-logo-dot"></div>
                            <span>Voyara</span>
                        </div>
                        <button id="drawer-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    {/* User info */}
                    {user && (
                        <div id="drawer-user">
                            <div id="drawer-avatar">
                                <i className="fa-solid fa-circle-user"></i>
                            </div>
                            <div id="drawer-name">{user.name || user.email}</div>
                            <div id="drawer-email">{user.email}</div>
                        </div>
                    )}

                    {/* Bookings */}
                    <div id="drawer-bookings">
                        <div id="drawer-bookings-label">
                            <span>Recent Bookings</span>
                            <a href="/tours_and_destinations/bookings.html">View All →</a>
                        </div>

                        {loading && (
                            <div id="drawer-loading">
                                <i className="fa-solid fa-spinner fa-spin"></i> Loading…
                            </div>
                        )}

                        {!loading && bookings.length === 0 && (
                            <div id="drawer-empty">
                                <i className="fa-solid fa-ticket"></i>
                                No bookings yet. Explore a destination!
                            </div>
                        )}

                        {!loading && bookings.slice(0, 5).map(b => (
                            <div className="drawer-booking-item" key={b.booking_id}>
                                <div className="drawer-booking-icon">
                                    <i className="fa-solid fa-compass"></i>
                                </div>
                                <div className="drawer-booking-info">
                                    <div className="drawer-booking-title">{b.event_title}</div>
                                    <div className="drawer-booking-meta">{b.city_name} · {b.category}</div>
                                </div>
                                <div className="drawer-booking-price">
                                    ₹{Number(b.price).toLocaleString('en-IN')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div id="drawer-footer">
                        <button id="drawer-logout" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i> Logout
                        </button>
                    </div>

                </div>
            </>
        );
    }

    const root = document.createElement('div');
    root.id = 'voyara-profile-root';
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(<ProfileDrawer />);

    window.openProfileDrawer = function () {
        document.dispatchEvent(new CustomEvent('voyara:open-profile'));
    };
})();
