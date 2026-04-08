// ---------------------------------------------------------
// 1. CONFIGURATION
// ---------------------------------------------------------
// REPLACE THIS WITH YOUR OWN TOKEN FROM mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpdHJhZ2hvc2gyMDA1IiwiYSI6ImNtbGwyZ3F0djAzZTkzZHM2NGRqbmx2M2kifQ.8wTtFQTIlfbE3lslQmiyXg'; 

const destinations = {
    goa: {
        coords: [73.9699, 15.2865], // Madgaon
        name: "Goa",
        railhead: "MAO", // Madgaon Junction
        warning: ""
    },
    pondicherry: {
        coords: [79.4975, 11.9401], // Villupuram (Nearest Major Junction)
        name: "Pondicherry",
        railhead: "VM", // Villupuram Junction
        warning: "Nearest major railhead is Villupuram (40km away)."
    },
    ooty: {
        coords: [76.9405, 11.3006], // Mettupalayam
        name: "Ooty",
        railhead: "MTP", // Mettupalayam
        warning: "Train ends at Mettupalayam. You need a cab or Toy Train for the last leg."
    }
};

let userLocation = null; // Will store [lng, lat]

// ---------------------------------------------------------
// 2. INITIALIZE MAP
// ---------------------------------------------------------
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // Standard style
    center: [78.9629, 20.5937], // Center of India
    zoom: 4
});

// Add Navigation Controls (Zoom in/out)
map.addControl(new mapboxgl.NavigationControl());

// ---------------------------------------------------------
// 3. GET USER LOCATION
// ---------------------------------------------------------
// We ask for location immediately when the page loads
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    userLocation = [position.coords.longitude, position.coords.latitude];
    
    // Fly the map to the user
    map.flyTo({
        center: userLocation,
        zoom: 10
    });

    // Add a marker for "You are here"
    new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML("<b>You are here</b>"))
        .addTo(map);
}

function errorLocation() {
    alert("Please enable location services to plan your route!");
    // Fallback: Default to Chennai if they deny permission
    userLocation = [80.2707, 13.0827]; 
}

// ---------------------------------------------------------
// 4. CALCULATE ROUTE LOGIC
// ---------------------------------------------------------
async function calculateRoute() {
    const destKey = document.getElementById('destination-select').value;
    if (!destKey || !userLocation) return;

    const destData = destinations[destKey];

    // Mapbox Directions API Endpoint
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destData.coords[0]},${destData.coords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const route = data.routes[0];
        const geometry = route.geometry;
        
        // A. DRAW THE LINE
        // If a route layer already exists, update it. If not, add it.
        if (map.getSource('route')) {
            map.getSource('route').setData({
                type: 'Feature',
                geometry: geometry
            });
        } else {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: geometry
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

        // B. ADD DESTINATION MARKER
        new mapboxgl.Marker({ color: "#00FF00" })
            .setLngLat(destData.coords)
            .addTo(map);

        // C. FIT BOUNDS (Zoom to show full trip)
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend(userLocation);
        bounds.extend(destData.coords);
        map.fitBounds(bounds, { padding: 50 });

        // D. UPDATE UI STATS
        const durationHrs = (route.duration / 3600).toFixed(1);
        const distanceKm = (route.distance / 1000).toFixed(0);

        document.getElementById('distance-text').innerText = `${distanceKm} km`;
        document.getElementById('duration-text').innerText = `${durationHrs} hrs`;
        document.getElementById('train-warning').innerText = destData.warning;

        // Show the hidden sections
        document.getElementById('stats-container').classList.remove('hidden');
        document.getElementById('actions-container').classList.remove('hidden');

    } catch (error) {
        console.error("Error fetching route:", error);
        alert("Could not calculate route. Check your API Key.");
    }
}

// ---------------------------------------------------------
// 5. BOOKING FUNCTIONS (DEEP LINKS)
// ---------------------------------------------------------

function bookBus() {
    // Redbus generic link - they auto-detect location often, 
    // or we send them to the home page with destination context
    const dest = document.getElementById('destination-select').value;
    window.open(`https://www.redbus.in/bus-tickets/search?fromCity=YourLocation&toCity=${dest}`, '_blank');
}

function bookTrain() {
    const destKey = document.getElementById('destination-select').value;
    const railhead = destinations[destKey].railhead;
    
    // IXIGO Deep Link logic
    // We search from "User's Location" (approx) to "Railhead Code"
    // Since we don't have user's city name, we send them to search page
    window.open(`https://www.ixigo.com/trains/${railhead}`, '_blank');
}

function bookCab() {
    // Uber Universal Link
    // This tries to open the app on mobile
    window.open('https://m.uber.com/ul/', '_blank');
}