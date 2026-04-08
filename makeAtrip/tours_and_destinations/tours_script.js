// --- SUPABASE CLIENT (fetched from backend config) ---
let db;
fetch('/api/config')
    .then(r => r.json())
    .then(({ supabaseUrl, supabaseAnonKey }) => {
        db = supabase.createClient(supabaseUrl, supabaseAnonKey);
        displayCityCards();
        loadCityActivities();
    });

// --- GLOBAL STATE ---
let currentPrice = 0;
window.currentTourId = null;

// --- 1. DYNAMIC CITY CARDS (tours_index.html) ---
async function displayCityCards() {
    const cityContainer = document.getElementById('city-list');
    if (!cityContainer || !db) return;

    const { data: events, error } = await db
        .from('tours')
        .select('city_name, image_url, description');

    if (error) return console.error('Error fetching cities:', error);

    const uniqueCities = [...new Map(events.map(item => [item.city_name, item])).values()];

    cityContainer.innerHTML = uniqueCities.map(city => `
        <div class="card" onclick="location.href='city_details.html?city=${encodeURIComponent(city.city_name)}'">
            <div class="img-container">
                <img src="${city.image_url}" alt="${city.city_name}">
            </div>
            <div class="card-content">
                <h2>${city.city_name}</h2>
                <p>${city.description}</p>
                <button class="btn">View Attractions</button>
            </div>
        </div>
    `).join('');
}

// --- 2. DYNAMIC ACTIVITIES (city_details.html) ---
async function loadCityActivities() {
    const activityContainer = document.getElementById('activity-container');
    if (!activityContainer || !db) return;

    const params = new URLSearchParams(window.location.search);
    const selectedCity = params.get('city');

    if (selectedCity) {
        const el = document.getElementById('page-title');
        if (el) el.innerText = `Showing Activities in ${selectedCity}`;
    }

    const { data: activities, error } = await db
        .from('tours')
        .select('*')
        .eq('city_name', selectedCity);

    if (error) return console.error('Error fetching activities:', error);

    activityContainer.innerHTML = activities.map(act => `
        <div class="card">
            <div class="badge">${act.category}</div>
            <div class="img-container">
                <img src="${act.image_url}" alt="${act.title}">
            </div>
            <div class="card-content">
                <h2>${act.title}</h2>
                <p>${act.description}</p>
                <div class="price-tag">₹${act.price} <span>per person</span></div>
                <button class="btn" onclick="openBooking('${act.title.replace(/'/g, "\\'")}', ${act.price}, '${act.tours_id}')">Book Now</button>
            </div>
        </div>
    `).join('');
}

// --- 3. BOOKING MODAL ---
function openBooking(name, price, tourId) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    currentPrice         = price;
    window.currentTourId = tourId;

    const actEl = document.getElementById('activityName');
    if (actEl) actEl.value = name;

    const totalEl = document.getElementById('displayTotal');
    if (totalEl) totalEl.textContent = '₹' + price.toLocaleString('en-IN');

    modal.classList.add('open');
    calculateTotal();
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('open');
}

function calculateTotal() {
    const numPersons = document.getElementById('numPersons');
    const displayTotal = document.getElementById('displayTotal');
    if (numPersons && displayTotal) {
        displayTotal.textContent = '₹' + (numPersons.value * currentPrice).toLocaleString('en-IN');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const numPersonsInput = document.getElementById('numPersons');
    if (numPersonsInput) numPersonsInput.addEventListener('input', calculateTotal);
});

window.onclick = function (event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) closeModal();
};
