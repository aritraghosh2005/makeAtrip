// --- GLOBAL ELEMENTS ---
const modal = document.getElementById("bookingModal");
const displayTotal = document.getElementById("displayTotal");
const numPersonsInput = document.getElementById("numPersons");
const bookingForm = document.getElementById("bookingForm");
let currentPrice = 0;















// --- DESTINATION PAGE LOGIC (Ooty, Coorg, Pondi) ---

// Only runs if the Modal exists on the page
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

// Only adds listener if the input field exists
if (numPersonsInput) {
    numPersonsInput.addEventListener('input', calculateTotal);
}

function calculateTotal() {
    if (numPersonsInput && displayTotal) {
        const total = numPersonsInput.value * currentPrice;
        displayTotal.innerText = total;
    }
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Only handles submission if the form exists on this page
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
        
        // If the table is on the same page, update it immediately
        if (document.getElementById("bookingsList")) {
            displayBookings();
        }
    };
}
















// --- BOOKING.HTML LOGIC (Itinerary Summary) ---

function displayBookings() {
    const bookingsList = document.getElementById("bookingsList");
    const table = document.getElementById("bookingsTable");
    const emptyMsg = document.getElementById("no-bookings");
    
    // Safety check: Exit if we are not on the bookings page
    if (!bookingsList) return; 

    const savedBookings = JSON.parse(localStorage.getItem('userBookings')) || [];

    if (savedBookings.length > 0) {
        if (table) table.style.display = "table";
        if (emptyMsg) emptyMsg.style.display = "none";
        
        bookingsList.innerHTML = ""; 

        savedBookings.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${item.activity}</td>
                    <td>${item.date}</td>
                    <td>${item.persons}</td>
                    <td>₹${item.total}</td>
                    <td>
                        <button onclick="deleteBooking(${index})" class="cancel-link">Cancel</button>
                    </td>
                </tr>
            `;
            bookingsList.innerHTML += row;
        });
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

// Run this on every page load
document.addEventListener("DOMContentLoaded", displayBookings);