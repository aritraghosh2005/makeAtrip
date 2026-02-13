// Navigation Logic (unchanged)
function navigateTo(section) {
    console.log("Navigating to:", section);

    switch(section) {
        case 'routes':
            window.location.href = "./tours_and_destinations/tours_index.html"; 
            break;

        case 'hotels':
            window.location.href = "./tours_and_destinations/bookings.html";
            break;

        case 'flights':
            window.location.href = "./travel/index.html";
            break;

        case 'ai-guide':
            alert("AI Guide feature coming soon!");
            break;

        default:
            console.error("Unknown section:", section);
    }
}


// Hotels Filtering
function filterLocation(location) {
    const hotels = document.querySelectorAll(".hotel-card");

    hotels.forEach(hotel => {
        if (location === "all" || hotel.getAttribute("data-location") === location) {
            hotel.style.display = "block";
        } else {
            hotel.style.display = "none";
        }
    });
}


// Hero Animation (unchanged)
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
