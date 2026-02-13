// Filter Logic
function filterHotels(location) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.filter-btn');

    // 1. Update Active Button State
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === location || (location === 'all' && btn.innerText === 'Show All')) {
            btn.classList.add('active');
        }
    });

    // 2. Show/Hide Cards
    cards.forEach(card => {
        const cardLocation = card.getAttribute('data-location');
        
        if (location === 'all' || cardLocation === location) {
            card.style.display = 'block';
            // Simple Fade In Animation
            card.style.opacity = '0';
            setTimeout(() => card.style.opacity = '1', 100);
        } else {
            card.style.display = 'none';
        }
    });
}

// Initial Animation
console.log("Hotels page loaded.");
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.hero-content');
    if(text) {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'all 1s ease';
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 100);
    }
});