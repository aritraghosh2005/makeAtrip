// Fetches Supabase config from the backend, then initialises the browser client.
// Exposes a `getSupabase()` promise that all frontend modules await before use.

const _supabaseReady = fetch('/api/config')
    .then(r => r.json())
    .then(({ supabaseUrl, supabaseAnonKey }) => {
        return window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    });

function getSupabase() {
    return _supabaseReady;
}
