// Navigation Logic
function navigateTo(section) {
    console.log("Navigating to:", section);

    switch(section) {
        // 1. "Tours & Attractions" Button (Left Top)
        // Links to your teammate's main tours page
        case 'routes':
            window.location.href = "./tours_and_destinations/tours_index.html"; 
            break;

        // 2. "Homestays & Villas" Button (Left Bottom)
        // Links to your teammate's booking page
        case 'hotels':
            window.location.href = "./tours_and_destinations/bookings.html";
            break;

        // 3. "Travel" Button (Right Top) -> THIS IS YOUR PART
        // Links to the new Mapbox Route Planner we just built
        case 'flights':
            window.location.href = "./travel/index.html";
            break;

        // 4. "AI Guide" Button (Right Bottom)
        // Future feature
        case 'ai-guide':
            alert("AI Guide feature coming soon!");
            break;

        default:
            console.error("Unknown section:", section);
    }
}

// Animation for the "MAKE A TRIP" text
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.hero-text');
    if(text) {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            text.style.transition = 'all 1s ease';
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 100);
    }
});