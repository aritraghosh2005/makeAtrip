const P = (seed) => `https://picsum.photos/seed/${seed}/800/500`;

const staysDatabase = [
    // 1. Goa
    { city: "Goa", name: "Beach Paradise Resort", price: 4500, img: "hotel_images/beach_paradise_resort.png", desc: "Luxury beachfront stay with a private pool and direct beach access." },
    { city: "Goa", name: "Palm Grove Homestay", price: 2200, img: "hotel_images/palm_grove_homestay.jpg", desc: "Cozy traditional cottage nestled among coconut palms." },
    { city: "Goa", name: "Ocean View Villa", price: 6500, img: P("goa-villa"), desc: "Premium 3-bedroom villa overlooking the Arabian Sea." },
    { city: "Goa", name: "Sunset Beach Shack", price: 1500, img: P("goa-shack"), desc: "Budget-friendly wooden huts right on the sands of Palolem." },

    // 2. Ooty
    { city: "Ooty", name: "Misty Mountain Resort", price: 3500, img: "hotel_images/misty_mountain_resort.jpg", desc: "A serene mountain retreat with bonfire evenings." },
    { city: "Ooty", name: "Hilltop Cottage", price: 2800, img: "hotel_images/hilltop_cottage.jpg", desc: "Colonial-style cottage with sweeping valley views." },
    { city: "Ooty", name: "Tea Garden Retreat", price: 4200, img: P("ooty-tea"), desc: "Stay right in the middle of a working Nilgiri tea estate." },
    { city: "Ooty", name: "Blue Hills Lodge", price: 1800, img: P("ooty-lodge"), desc: "Comfortable and warm stay near the Botanical Gardens." },

    // 3. Pondicherry
    { city: "Pondicherry", name: "Ocean Breeze Hotel", price: 3000, img: "hotel_images/ocean_breeze_hotel.jpg", desc: "Modern sea-facing hotel steps from the famous promenade." },
    { city: "Pondicherry", name: "French Colony Stay", price: 2500, img: "hotel_images/french_colony_stay.jpg", desc: "Heritage yellow villa in the heart of the French Quarter." },
    { city: "Pondicherry", name: "Auroville Eco Retreat", price: 2000, img: P("pondi-eco"), desc: "Sustainable bamboo huts nestled in the Auroville forest." },
    { city: "Pondicherry", name: "White Town Boutique", price: 5500, img: P("pondi-boutique"), desc: "Luxury boutique hotel with a rooftop pool and French café." },

    // 4. Munnar
    { city: "Munnar", name: "Tea Estate Bungalow", price: 4000, img: P("munnar-tea"), desc: "Wake up to the smell of fresh tea leaves in this plantation stay." },
    { city: "Munnar", name: "Cloud Nine Camp", price: 1800, img: P("munnar-camp"), desc: "Luxury glamping experience high up in the hills." },
    { city: "Munnar", name: "Spice Valley Resort", price: 3200, img: P("munnar-spice"), desc: "Surrounded by cardamom and pepper plantations." },
    { city: "Munnar", name: "Silver Oaks Homestay", price: 2100, img: P("munnar-oaks"), desc: "Authentic Kerala food and warm hospitality." },

    // 5. Jaipur
    { city: "Jaipur", name: "The Royal Palace", price: 8500, img: P("jaipur-palace"), desc: "Live like royalty in this converted 18th-century palace." },
    { city: "Jaipur", name: "Pink City Heritage", price: 3000, img: P("jaipur-heritage"), desc: "Traditional Rajasthani architecture near Hawa Mahal." },
    { city: "Jaipur", name: "Desert Fort Resort", price: 5000, img: P("jaipur-fort"), desc: "Fortress-style resort with folk music and cultural nights." },
    { city: "Jaipur", name: "Rajputana Stay", price: 2200, img: P("jaipur-rajput"), desc: "Comfortable boutique hotel with a beautiful central courtyard." },

    // 6. Udaipur
    { city: "Udaipur", name: "Lake Palace Stay", price: 12000, img: P("udaipur-lake"), desc: "Floating marble palace offering unparalleled luxury on Lake Pichola." },
    { city: "Udaipur", name: "Pichola View Hotel", price: 4500, img: P("udaipur-pichola"), desc: "Stunning rooftop dining overlooking the lake and City Palace." },
    { city: "Udaipur", name: "Royal Mewar Villa", price: 6000, img: P("udaipur-mewar"), desc: "Private pool villa with intricate Rajasthani frescoes." },
    { city: "Udaipur", name: "Sunset Point Resort", price: 2500, img: P("udaipur-sunset"), desc: "Quiet resort located on the hills surrounding Udaipur." },

    // 7. Agra
    { city: "Agra", name: "Taj View Hotel", price: 7000, img: P("agra-taj"), desc: "Wake up to an uninterrupted view of the Taj Mahal." },
    { city: "Agra", name: "Mughal Residency", price: 3500, img: P("agra-mughal"), desc: "Experience Mughal-inspired decor and hospitality." },
    { city: "Agra", name: "Marble Heritage", price: 2800, img: P("agra-marble"), desc: "Boutique stay walking distance from the East Gate." },
    { city: "Agra", name: "River Yamuna Retreat", price: 2000, img: P("agra-yamuna"), desc: "Peaceful gardens right on the banks of the Yamuna." },

    // 8. Manali
    { city: "Manali", name: "Snow Peak Resort", price: 4000, img: P("manali-snow"), desc: "Cozy rooms with wooden interiors and snow-capped views." },
    { city: "Manali", name: "River Side Cottage", price: 3200, img: P("manali-river"), desc: "Charming cottage located right next to the Beas River." },
    { city: "Manali", name: "Apple Orchard Stay", price: 2500, img: P("manali-apple"), desc: "Stay amidst blossoming apple trees in Old Manali." },
    { city: "Manali", name: "Himalayan Woods", price: 1800, img: P("manali-woods"), desc: "Backpacker-friendly lodge with a vibrant cafe." },

    // 9. Shimla
    { city: "Shimla", name: "Mall Road Heritage", price: 5500, img: P("shimla-mall"), desc: "Iconic colonial hotel located right on the bustling Mall Road." },
    { city: "Shimla", name: "Pine Tree Resort", price: 3800, img: P("shimla-pine"), desc: "Secluded stay surrounded by dense pine forests." },
    { city: "Shimla", name: "The Ridge View", price: 4200, img: P("shimla-ridge"), desc: "Premium rooms offering panoramic views of the Shimla valley." },
    { city: "Shimla", name: "Snow Valley Retreat", price: 2800, img: P("shimla-snow"), desc: "Comfortable and heated rooms perfect for winter stays." },

    // 10. Darjeeling
    { city: "Darjeeling", name: "Kanchenjunga View", price: 4500, img: P("darj-kanch"), desc: "Watch the sunrise over Mt. Kanchenjunga from your balcony." },
    { city: "Darjeeling", name: "Toy Train Heritage", price: 3500, img: P("darj-train"), desc: "Historic stay located right next to the Darjeeling Himalayan Railway." },
    { city: "Darjeeling", name: "Tea Estate Bungalow", price: 5000, img: P("darj-tea"), desc: "British-era bungalow surrounded by rolling tea gardens." },
    { city: "Darjeeling", name: "Sunrise Point", price: 2200, img: P("darj-sunrise"), desc: "Cozy rooms near Tiger Hill for early morning excursions." },

    // 11. Gangtok
    { city: "Gangtok", name: "Sikkim Mountain Retreat", price: 4200, img: P("gangtok-sikkim"), desc: "Luxurious stay with views of the deep Himalayan valleys." },
    { city: "Gangtok", name: "Orchid Villa", price: 2800, img: P("gangtok-orchid"), desc: "Beautiful homestay adorned with local Sikkim orchids." },
    { city: "Gangtok", name: "Teesta River Stay", price: 3500, img: P("gangtok-teesta"), desc: "Riverside resort offering rafting and bonfire activities." },
    { city: "Gangtok", name: "Monastic Stay", price: 1500, img: P("gangtok-monk"), desc: "Peaceful stay located near the Rumtek Monastery." },

    // 12. Varanasi
    { city: "Varanasi", name: "Ganga Ghat Hotel", price: 3500, img: P("varanasi-ganga"), desc: "Heritage hotel with direct private access to the Ganges." },
    { city: "Varanasi", name: "Kashi Heritage Stay", price: 2500, img: P("varanasi-kashi"), desc: "Experience the narrow lanes and culture of ancient Kashi." },
    { city: "Varanasi", name: "Sunrise Boat Stay", price: 4000, img: P("varanasi-boat"), desc: "A unique experience living on a stationary luxury boat." },
    { city: "Varanasi", name: "Spiritual Retreat", price: 1800, img: P("varanasi-spirit"), desc: "Ashram-style peaceful living away from the city noise." },

    // 13. Rishikesh
    { city: "Rishikesh", name: "Ganga View Ashram", price: 2000, img: P("rishi-ashram"), desc: "Serene ashram offering daily yoga and meditation classes." },
    { city: "Rishikesh", name: "River Rafting Camp", price: 2500, img: P("rishi-raft"), desc: "Adventure tents on white sand beaches with bonfire." },
    { city: "Rishikesh", name: "Himalayan Foothills", price: 5500, img: P("rishi-hills"), desc: "Luxury spa resort focusing on Ayurvedic wellness." },
    { city: "Rishikesh", name: "Tranquil Stay", price: 1500, img: P("rishi-tranquil"), desc: "Backpacker hostel near Laxman Jhula with great cafes." },

    // 14. Alleppey
    { city: "Alleppey", name: "Backwaters Houseboat", price: 8000, img: P("alleppey-boat"), desc: "Private traditional AC houseboat with a personal chef." },
    { city: "Alleppey", name: "Lake View Resort", price: 4500, img: P("alleppey-lake"), desc: "Resort situated right on the banks of Vembanad Lake." },
    { city: "Alleppey", name: "Palm Tree Heritage", price: 3000, img: P("alleppey-palm"), desc: "Traditional Kerala architecture surrounded by coconut groves." },
    { city: "Alleppey", name: "Canoe Stay", price: 2000, img: P("alleppey-canoe"), desc: "Homestay offering complimentary morning canoe rides." },

    // 15. Coorg
    { city: "Coorg", name: "Coffee Plantation Stay", price: 3500, img: P("coorg-coffee"), desc: "Immersive stay in a 100-acre robusta coffee estate." },
    { city: "Coorg", name: "Madikeri Hills Resort", price: 5000, img: P("coorg-hills"), desc: "Luxury cottages with private infinity pools." },
    { city: "Coorg", name: "Wilderness Camp", price: 2800, img: P("coorg-wild"), desc: "Eco-friendly tents for the ultimate nature experience." },
    { city: "Coorg", name: "Abbey Falls Retreat", price: 2200, img: P("coorg-falls"), desc: "Listen to the sound of waterfalls from your room." },

    // 16. Wayanad
    { city: "Wayanad", name: "Wayanad Treehouse", price: 6500, img: P("wayanad-tree"), desc: "Authentic wooden treehouses 40 feet above the ground." },
    { city: "Wayanad", name: "Forest View Resort", price: 4000, img: P("wayanad-forest"), desc: "Resort bordering the Wayanad Wildlife Sanctuary." },
    { city: "Wayanad", name: "Green Valley Retreat", price: 2500, img: P("wayanad-valley"), desc: "Homestay known for its organic farming and fresh meals." },
    { city: "Wayanad", name: "Waterfall Cabin", price: 3200, img: P("wayanad-falls"), desc: "Private wooden cabins beside a natural stream." },

    // 17. Kodaikanal
    { city: "Kodaikanal", name: "Kodai Lake Resort", price: 4500, img: P("kodai-lake"), desc: "Premium property right on the banks of Kodaikanal Lake." },
    { city: "Kodaikanal", name: "Pine Forest Stay", price: 2800, img: P("kodai-pine"), desc: "Mystical stay surrounded by dense pine trees." },
    { city: "Kodaikanal", name: "Cloud 9 Retreat", price: 3500, img: P("kodai-cloud"), desc: "High-altitude resort where clouds enter your balcony." },
    { city: "Kodaikanal", name: "Starry Nights Villa", price: 5000, img: P("kodai-stars"), desc: "A private 2-bedroom villa with a glass roof for stargazing." },

    // 18. Andaman
    { city: "Andaman", name: "Havelock Beach Resort", price: 7500, img: P("andaman-havelock"), desc: "Luxury cottages on Radhanagar Beach." },
    { city: "Andaman", name: "Coral Reef Stay", price: 4000, img: P("andaman-coral"), desc: "Resort offering in-house scuba diving certifications." },
    { city: "Andaman", name: "Neil Island Eco Hut", price: 2500, img: P("andaman-neil"), desc: "Rustic bamboo huts on the pristine Neil Island." },
    { city: "Andaman", name: "Port Blair Heritage", price: 3500, img: P("andaman-blair"), desc: "Comfortable stay near Cellular Jail with sea views." },

    // 19. Leh
    { city: "Leh", name: "Pangong Lake Camp", price: 4500, img: P("leh-pangong"), desc: "Premium insulated tents right on the edge of Pangong Tso." },
    { city: "Leh", name: "Ladakh Mountain Resort", price: 5500, img: P("leh-ladakh"), desc: "Heated rooms with views of the Stok Kangri range." },
    { city: "Leh", name: "Nubra Valley Tent", price: 3000, img: P("leh-nubra"), desc: "Desert camp near the famous sand dunes of Hunder." },
    { city: "Leh", name: "Leh Palace View", price: 2200, img: P("leh-palace"), desc: "Traditional Ladakhi homestay in the heart of Leh market." },

    // 20. Srinagar
    { city: "Srinagar", name: "Dal Lake Houseboat", price: 6000, img: P("srinagar-dal"), desc: "Intricately carved cedar wood houseboat with Shikara rides." },
    { city: "Srinagar", name: "Shalimar Garden Retreat", price: 4500, img: P("srinagar-garden"), desc: "Boutique hotel located next to the Mughal gardens." },
    { city: "Srinagar", name: "Snow Mountain Resort", price: 5500, img: P("srinagar-snow"), desc: "Premium resort in Gulmarg, perfect for skiing." },
    { city: "Srinagar", name: "Kashmir Heritage", price: 3000, img: P("srinagar-heritage"), desc: "Traditional Kashmiri architecture with modern heating." },

    // 21. Jaisalmer
    { city: "Jaisalmer", name: "Thar Desert Camp", price: 4500, img: P("jaisal-thar"), desc: "Luxury Swiss tents with evening cultural performances." },
    { city: "Jaisalmer", name: "Golden Fort Heritage", price: 3500, img: P("jaisal-fort"), desc: "Stay inside the living Jaisalmer Fort." },
    { city: "Jaisalmer", name: "Camel Safari Stay", price: 2000, img: P("jaisal-camel"), desc: "Sleep under the stars after a sunset camel safari." },
    { city: "Jaisalmer", name: "Rajput Desert Villa", price: 5500, img: P("jaisal-villa"), desc: "Haveli-style hotel with intricate sandstone carvings." },

    // 22. Jodhpur
    { city: "Jodhpur", name: "Mehrangarh View Hotel", price: 4000, img: P("jodhpur-fort"), desc: "Rooftop dining with stunning views of Mehrangarh Fort." },
    { city: "Jodhpur", name: "Umaid Heritage", price: 9000, img: P("jodhpur-umaid"), desc: "Experience the grandeur of Rajasthan's royal era." },
    { city: "Jodhpur", name: "Blue City Guest House", price: 1500, img: P("jodhpur-blue"), desc: "Cozy stay right in the middle of the iconic blue houses." },
    { city: "Jodhpur", name: "Desert Rose Stay", price: 2800, img: P("jodhpur-rose"), desc: "Boutique heritage property with an indoor pool." },

    // 23. Hampi
    { city: "Hampi", name: "Boulders Retreat", price: 4500, img: P("hampi-boulders"), desc: "Resort built naturally around Hampi's giant boulders." },
    { city: "Hampi", name: "Ruins View Stay", price: 2500, img: P("hampi-ruins"), desc: "Walking distance from the Virupaksha Temple." },
    { city: "Hampi", name: "Tungabhadra River Resort", price: 3200, img: P("hampi-river"), desc: "Riverside cabins offering coracle boat rides." },
    { city: "Hampi", name: "Banana Plantation Guest House", price: 1200, img: P("hampi-banana"), desc: "Hippie-style huts across the river in Sanapur." },

    // 24. Gokarna
    { city: "Gokarna", name: "Om Beach Resort", price: 4000, img: P("gokarna-om"), desc: "Premium Ayurvedic resort near the famous Om Beach." },
    { city: "Gokarna", name: "Hippie Beach Shack", price: 1500, img: P("gokarna-hippie"), desc: "Basic sea-facing huts with great seafood." },
    { city: "Gokarna", name: "Kudle Ocean Retreat", price: 3500, img: P("gokarna-kudle"), desc: "Cliff-top resort with a panoramic view of the Arabian Sea." },
    { city: "Gokarna", name: "Paradise Cove Stay", price: 2200, img: P("gokarna-cove"), desc: "Secluded stay accessible only by a short trek." },

    // 25. Varkala
    { city: "Varkala", name: "Cliff Edge Resort", price: 4500, img: P("varkala-cliff"), desc: "Resort located right on the famous Varkala North Cliff." },
    { city: "Varkala", name: "Kerala Surf Lodge", price: 2000, img: P("varkala-surf"), desc: "Surfer-friendly hostel with board rentals and lessons." },
    { city: "Varkala", name: "Papanasam Beach Stay", price: 3000, img: P("varkala-beach"), desc: "Quiet stay near the holy Papanasam beach." },
    { city: "Varkala", name: "Coconut Grove Retreat", price: 2500, img: P("varkala-coconut"), desc: "Eco-friendly cottages under the shade of palm trees." },

    // 26. Mysore
    { city: "Mysore", name: "Royal Mysore Heritage", price: 6500, img: P("mysore-royal"), desc: "Stay in a restored palace with royal hospitality." },
    { city: "Mysore", name: "Palace View Hotel", price: 3500, img: P("mysore-palace"), desc: "See the illuminated Mysore Palace from your window." },
    { city: "Mysore", name: "Chamundi Hills Resort", price: 4000, img: P("mysore-chamundi"), desc: "Quiet nature resort located at the base of the hills." },
    { city: "Mysore", name: "Sandalwood Stay", price: 2000, img: P("mysore-sandal"), desc: "Boutique homestay famous for its authentic local cuisine." }
];

// ==========================================
// 2. RENDER LOGIC BASED ON CURRENT PAGE
// Checks which page the user is on and fires the right function
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const cityListContainer = document.getElementById("city-list");
    const hotelContainer = document.getElementById("hotel-container");

    // If we are on index.html (City selection directory page)
    if (cityListContainer) {
        displayCities();
    }

    // If we are on city_stays.html (Specific hotels view page)
    if (hotelContainer) {
        loadCityStays();
    }
});

// ----------------------------------------------------
// PAGE 1 LOGIC: Displaying Unique Cities (index.html)
// ----------------------------------------------------
let uniqueCities = [];

function displayCities() {
    // Extract unique cities and get a representative image/count for the card
    const cityMap = new Map();
    staysDatabase.forEach(stay => {
        if (!cityMap.has(stay.city)) {
            cityMap.set(stay.city, {
                cityName: stay.city,
                img: stay.img, // uses the first hotel's image as the city cover photo
                hotelCount: staysDatabase.filter(s => s.city === stay.city).length
            });
        }
    });

    uniqueCities = Array.from(cityMap.values());
    renderCityGrid(uniqueCities);
}

function renderCityGrid(citiesToRender) {
    const cityListContainer = document.getElementById("city-list");
    
    if (citiesToRender.length === 0) {
        cityListContainer.innerHTML = `<div style="padding:40px; grid-column:1/-1; text-align:center;">No cities found. Try another search.</div>`;
        return;
    }

    cityListContainer.innerHTML = citiesToRender.map(city => `
        <div class="card" onclick="location.href='city_stays.html?city=${encodeURIComponent(city.cityName)}'">
            <div class="img-container">
                <img src="${city.img}" alt="${city.cityName}">
            </div>
            <div class="card-content">
                <h2>${city.cityName}</h2>
                <p>Discover ${city.hotelCount} handpicked luxury stays, heritage villas, and cozy homestays in ${city.cityName}.</p>
                <button class="btn">View Stays →</button>
            </div>
        </div>
    `).join('');
}

// Global search function triggered by the search bar input
window.searchCities = function() {
    const query = document.getElementById("citySearch").value.toLowerCase();
    const filtered = uniqueCities.filter(city => city.cityName.toLowerCase().includes(query));
    renderCityGrid(filtered);
};

// ----------------------------------------------------
// PAGE 2 LOGIC: Displaying Hotels (city_stays.html)
// ----------------------------------------------------
function loadCityStays() {
    const hotelContainer = document.getElementById("hotel-container");
    const params = new URLSearchParams(window.location.search);
    const selectedCity = params.get('city');

    if (selectedCity) {
        document.getElementById("page-title").innerText = `Stays in ${selectedCity}`;
        document.getElementById("breadcrumb-city").innerText = selectedCity;
        document.getElementById("section-subtitle").innerText = `Accommodations in ${selectedCity}`;
    }

    // Filter DB for just this city
    const cityHotels = staysDatabase.filter(stay => stay.city === selectedCity);

    if (cityHotels.length === 0) {
        hotelContainer.innerHTML = `<div style="padding:40px; grid-column:1/-1; text-align:center;">No stays available for this city yet.</div>`;
        return;
    }

    hotelContainer.innerHTML = cityHotels.map(stay => `
        <div class="card">
            <div class="img-container">
                <img src="${stay.img}" alt="${stay.name}">
            </div>
            <div class="card-content">
                <h2>${stay.name}</h2>
                <p>${stay.desc}</p>
                <div class="price-tag">₹${stay.price} <span>per night</span></div>
                <button class="btn" onclick="openBooking('${stay.name.replace(/'/g, "\\'")}', ${stay.price})">
                    <i class="fa-solid fa-calendar-check"></i> Book Now
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 3. BOOKING MODAL LOGIC & LOCALSTORAGE SAVING
// Identical structure to your Tours page so bookings match
// ==========================================
const modal = document.getElementById("bookingModal");
const displayTotal = document.getElementById("displayTotal");
const numPersonsInput = document.getElementById("numPersons");
let currentPrice = 0;

window.openBooking = async function(name, price) {
    if(!modal) return;
    const token = await window.getAuthToken?.();
    if (!token) {
        modal.classList.remove('open');
        window.openAuthModal?.();
        return;
    }
    currentPrice = price;
    document.getElementById("activityName").value = name;
    // Reset to form state
    document.getElementById('modal-form-state').style.display = '';
    document.getElementById('modal-success-state').style.display = 'none';
    document.getElementById('bookingDate').value = '';
    document.getElementById('numPersons').value = 1;
    modal.classList.add('open');
    calculateTotal();
};

window.closeModal = function() {
    if(!modal) return;
    modal.classList.remove('open');
    setTimeout(() => {
        const formState = document.getElementById('modal-form-state');
        const successState = document.getElementById('modal-success-state');
        if (formState) formState.style.display = '';
        if (successState) successState.style.display = 'none';
    }, 300);
};

function calculateTotal() {
    if(displayTotal && numPersonsInput) {
        displayTotal.textContent = '₹' + (numPersonsInput.value * currentPrice).toLocaleString('en-IN');
    }
}

if (numPersonsInput) {
    numPersonsInput.addEventListener('input', calculateTotal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

const confirmBtn = document.getElementById('confirmBtn');
if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
        const date = document.getElementById('bookingDate').value;
        
        if (!date) { 
            alert('Please select a Check-in Date.'); 
            return; 
        }

        const hotelName = document.getElementById('activityName').value;
        const rooms = document.getElementById('numPersons').value;

        // Show success state
        document.getElementById('modal-form-state').style.display = 'none';
        document.getElementById('success-msg').textContent =
            `${hotelName} — ${rooms} room(s) from ${date}. See you there!`;
        document.getElementById('modal-success-state').style.display = 'block';
    });
}