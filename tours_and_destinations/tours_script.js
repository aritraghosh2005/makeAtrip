// --- SUPABASE CONFIGURATION ---
// These allow your VS Code project to talk to your PostgreSQL database
const SUPABASE_URL = 'https://jymtoobebdhnpxnfcmub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YY3Av3t_QjAhef4J_oNFVw_lMIUvzT5';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- GLOBAL ELEMENTS ---
const modal = document.getElementById("bookingModal");
const displayTotal = document.getElementById("displayTotal");
const numPersonsInput = document.getElementById("numPersons");
const bookingForm = document.getElementById("bookingForm");
let currentPrice = 0;

// --- 1. DYNAMIC CITY CARDS (For tours_index.html) ---
async function displayCityCards() {
    const cityContainer = document.getElementById("city-list");
    if (!cityContainer) return; // Only runs on the main tours page

    // Fetch unique cities from the 'events' table
    const { data: events, error } = await db
        .from('tours')
        .select('city_name, image_url, description');

    if (error) return console.error("Error fetching cities:", error);

    // Filter to get exactly one card per city (since each city has 5 rows in your CSV)
    const uniqueCities = [...new Map(events.map(item => [item.city_name, item])).values()];

    cityContainer.innerHTML = uniqueCities.map(city => `
        <div class="card" onclick="location.href='city_details.html?city=${encodeURIComponent(city.city_name)}'">
            <div class="img-container">
                <img src="${city.image_url}" alt="${city.city_name}">
            </div>
            <div class="card-content">
                <h2>${city.city_name}</h2>
                <p>${city.description.substring(0, 85)}...</p>
                <button class="btn">View Attractions</button>
            </div>
        </div>
    `).join('');
}

// --- 2. DYNAMIC ACTIVITIES (For city_details.html) ---
async function loadCityActivities() {
    const activityContainer = document.getElementById("activity-container");
    if (!activityContainer) return; // Only runs on the destination details page

    // Get the city name from the URL (e.g., ?city=Munnar)
    const params = new URLSearchParams(window.location.search);
    const selectedCity = params.get('city');
    
    if (selectedCity) {
        document.getElementById("page-title").innerText = `Showing Activities in ${selectedCity}`;
    }

    // Pull the 5 specific activities for this city from PostgreSQL
    const { data: activities, error } = await db
        .from('tours')
        .select('*')
        .eq('city_name', selectedCity);

    if (error) return console.error("Error fetching activities:", error);

    // Map the database rows to your "Magazine" CSS cards
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
                <button class="btn" onclick="openBooking('${act.title.replace(/'/g, "\\'")}', ${act.price})">Book Now</button>
            </div>
        </div>
    `).join('');
}

// --- 3. BOOKING & MODAL LOGIC (Your Original Functions) ---

function openBooking(name, price) {
    if (modal) {
        currentPrice = price;
        document.getElementById("activityName").value = name;
        modal.style.display = "block";
        calculateTotal();
    }
}

function closeModal() {
    if (modal) modal.style.display = "none";
}

if (numPersonsInput) {
    numPersonsInput.addEventListener('input', calculateTotal);
}

function calculateTotal() {
    if (numPersonsInput && displayTotal) {
        const total = numPersonsInput.value * currentPrice;
        displayTotal.innerText = total;
    }
}

window.onclick = function(event) {
    if (event.target == modal) closeModal();
}

// Handles the LocalStorage saving for bookings
if (bookingForm) {
    bookingForm.onsubmit = function(e) {
        e.preventDefault();
        const booking = {
            activity: document.getElementById("activityName").value,
            date: document.getElementById("bookingDate").value,
            persons: numPersonsInput.value,
            total: displayTotal.innerText
        };
        let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        bookings.push(booking);
        localStorage.setItem('userBookings', JSON.stringify(bookings));
        
        alert("Booking Confirmed!");
        closeModal();
        if (document.getElementById("bookingsList")) displayBookings();
    };
}

// --- 4. ITINERARY TABLE LOGIC (For bookings.html) ---

function displayBookings() {
    const bookingsList = document.getElementById("bookingsList");
    const table = document.getElementById("bookingsTable");
    const emptyMsg = document.getElementById("no-bookings");
    if (!bookingsList) return; 

    const savedBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    if (savedBookings.length > 0) {
        if (table) table.style.display = "table";
        if (emptyMsg) emptyMsg.style.display = "none";
        bookingsList.innerHTML = savedBookings.map((item, index) => `
            <tr>
                <td>${item.activity}</td>
                <td>${item.date}</td>
                <td>${item.persons}</td>
                <td>₹${item.total}</td>
                <td><button onclick="deleteBooking(${index})" class="cancel-link">Cancel</button></td>
            </tr>
        `).join('');
    } else {
        if (table) table.style.display = "none";
        if (emptyMsg) emptyMsg.style.display = "block";
    }
}

function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('userBookings'));
    bookings.splice(index, 1); 
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    displayBookings(); 
}

function clearAllBookings() {
    if(confirm("Are you sure you want to cancel all bookings?")) {
        localStorage.removeItem('userBookings');
        displayBookings();
    }
}

// --- INITIALIZE EVERYTHING ---
document.addEventListener("DOMContentLoaded", () => {
    displayCityCards();      
    loadCityActivities();    
    displayBookings();       
});