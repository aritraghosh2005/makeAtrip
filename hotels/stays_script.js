// ==========================================
// SUPABASE CONFIGURATION
// Connects to your DB to fetch matching City photos!
// ==========================================
const SUPABASE_URL = 'https://jymtoobebdhnpxnfcmub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YY3Av3t_QjAhef4J_oNFVw_lMIUvzT5';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Bulletproof Backup Image (Used if any photo fails to load)
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// ==========================================
// FULL DATABASE OF STAYS (26 Specific Destinations)
// URLs updated with Unsplash Security Tags
// ==========================================
const staysDatabase = [
    // 1. Goa
    { city: "Goa", name: "Beach Paradise Resort", price: 4500, img: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury beachfront stay with a private pool and direct beach access." },
    { city: "Goa", name: "Palm Grove Homestay", price: 2200, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Cozy traditional cottage nestled among coconut palms." },
    { city: "Goa", name: "Ocean View Villa", price: 6500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Premium 3-bedroom villa overlooking the Arabian Sea." },
    { city: "Goa", name: "Sunset Beach Shack", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Budget-friendly wooden huts right on the sands of Palolem." },

    // 2. Ooty
    { city: "Ooty", name: "Misty Mountain Resort", price: 3500, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "A serene mountain retreat with bonfire evenings." },
    { city: "Ooty", name: "Hilltop Cottage", price: 2800, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Colonial-style cottage with sweeping valley views." },
    { city: "Ooty", name: "Tea Garden Retreat", price: 4200, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay right in the middle of a working Nilgiri tea estate." },
    { city: "Ooty", name: "Blue Hills Lodge", price: 1800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable and warm stay near the Botanical Gardens." },

    // 3. Pondicherry
    { city: "Pondicherry", name: "Ocean Breeze Hotel", price: 3000, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Modern sea-facing hotel steps from the famous promenade." },
    { city: "Pondicherry", name: "French Colony Stay", price: 2500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Heritage yellow villa in the heart of the French Quarter." },
    { city: "Pondicherry", name: "Auroville Eco Retreat", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Sustainable bamboo huts nestled in the Auroville forest." },
    { city: "Pondicherry", name: "White Town Boutique", price: 5500, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury boutique hotel with a rooftop pool and French café." },

    // 4. Munnar
    { city: "Munnar", name: "Tea Estate Bungalow", price: 4000, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Wake up to the smell of fresh tea leaves in this plantation stay." },
    { city: "Munnar", name: "Cloud Nine Camp", price: 1800, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury glamping experience high up in the hills." },
    { city: "Munnar", name: "Spice Valley Resort", price: 3200, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Surrounded by cardamom and pepper plantations." },
    { city: "Munnar", name: "Silver Oaks Homestay", price: 2100, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Authentic Kerala food and warm hospitality." },

    // 5. Kochi
    { city: "Kochi", name: "Fort Kochi Heritage", price: 3500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay in a restored Dutch building with antique wooden furniture." },
    { city: "Kochi", name: "Marina View Resort", price: 5500, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Premium waterfront resort overlooking the Arabian Sea." },
    { city: "Kochi", name: "Jew Town Boutique", price: 2800, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique stay right in the heart of historic Jew Town." },
    { city: "Kochi", name: "Backwater Retreat", price: 4000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Peaceful resort nestled along the Kochi backwaters." },

    // 6. Mysore
    { city: "Mysore", name: "Royal Mysore Heritage", price: 6500, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay in a restored palace with royal hospitality." },
    { city: "Mysore", name: "Palace View Hotel", price: 3500, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "See the illuminated Mysore Palace from your window." },
    { city: "Mysore", name: "Chamundi Hills Resort", price: 4000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Quiet nature resort located at the base of the hills." },
    { city: "Mysore", name: "Sandalwood Stay", price: 2000, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique homestay famous for its authentic local cuisine." },

    // 7. Hampi
    { city: "Hampi", name: "Boulders Retreat", price: 4500, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Resort built naturally around Hampi's giant boulders." },
    { city: "Hampi", name: "Ruins View Stay", price: 2500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Walking distance from the Virupaksha Temple." },
    { city: "Hampi", name: "Tungabhadra River Resort", price: 3200, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Riverside cabins offering coracle boat rides." },
    { city: "Hampi", name: "Banana Plantation Guest House", price: 1200, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Hippie-style huts across the river in Sanapur." },

    // 8. Madurai
    { city: "Madurai", name: "Heritage Madurai", price: 5000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Opulent heritage resort designed by Geoffrey Bawa." },
    { city: "Madurai", name: "Temple View Inn", price: 2500, img: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Rooftop dining with a clear view of the Meenakshi Temple." },
    { city: "Madurai", name: "Banyan Retreat", price: 3500, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Peaceful stay slightly away from the bustling city center." },
    { city: "Madurai", name: "Pandiyan Royal Stay", price: 1800, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable and authentic South Indian hospitality." },

    // 9. Alleppey
    { city: "Alleppey", name: "Backwaters Houseboat", price: 8000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Private traditional AC houseboat with a personal chef." },
    { city: "Alleppey", name: "Lake View Resort", price: 4500, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Resort situated right on the banks of Vembanad Lake." },
    { city: "Alleppey", name: "Palm Tree Heritage", price: 3000, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Traditional Kerala architecture surrounded by coconut groves." },
    { city: "Alleppey", name: "Canoe Stay", price: 2000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Homestay offering complimentary morning canoe rides." },

    // 10. Kanyakumari
    { city: "Kanyakumari", name: "Ocean Heritage Resort", price: 4200, img: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury resort where three oceans meet." },
    { city: "Kanyakumari", name: "Sunrise View Hotel", price: 2800, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Watch the spectacular Kanyakumari sunrise from your balcony." },
    { city: "Kanyakumari", name: "Cape Comorin Stay", price: 3500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable stay walking distance from the Vivekananda Rock." },
    { city: "Kanyakumari", name: "Sea Breeze Point", price: 1800, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Budget friendly seaside inn with authentic coastal food." },

    // 11. Thanjavur
    { city: "Thanjavur", name: "Chola Heritage Village", price: 4500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "A culturally immersive resort built in classic Chola style." },
    { city: "Thanjavur", name: "Tanjore Palace Stay", price: 3000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Royal heritage property offering classical dance performances." },
    { city: "Thanjavur", name: "Riverside Eco Resort", price: 2500, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Peaceful eco-resort on the banks of the Cauvery river." },
    { city: "Thanjavur", name: "Brihadeeswara View Inn", price: 1500, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Cozy rooms close to the famous Big Temple." },

    // 12. Kodaikanal
    { city: "Kodaikanal", name: "Kodai Lake Resort", price: 4500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Premium property right on the banks of Kodaikanal Lake." },
    { city: "Kodaikanal", name: "Pine Forest Stay", price: 2800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Mystical stay surrounded by dense pine trees." },
    { city: "Kodaikanal", name: "Cloud 9 Retreat", price: 3500, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "High-altitude resort where clouds enter your balcony." },
    { city: "Kodaikanal", name: "Starry Nights Villa", price: 5000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "A private 2-bedroom villa with a glass roof for stargazing." },

    // 13. Thekkady
    { city: "Thekkady", name: "Spice Village Eco Resort", price: 5500, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury eco-resort modeled after tribal dwellings." },
    { city: "Thekkady", name: "Periyar Woods Lodge", price: 3000, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable lodge bordering the Periyar Tiger Reserve." },
    { city: "Thekkady", name: "Elephant Route Resort", price: 3800, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Jungle-themed resort offering bamboo rafting experiences." },
    { city: "Thekkady", name: "Green Forest Retreat", price: 2200, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Homestay nestled deep inside a lush cardamom estate." },

    // 14. Mahabalipuram
    { city: "Mahabalipuram", name: "Pallava Beach Resort", price: 6000, img: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "5-star luxury property on the Coromandel coast." },
    { city: "Mahabalipuram", name: "Shore Temple Heritage", price: 4000, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay just a stone's throw away from the iconic Shore Temple." },
    { city: "Mahabalipuram", name: "Golden Sun Villa", price: 2800, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Private beachside villa with an outdoor pool." },
    { city: "Mahabalipuram", name: "Fisherman's Cove Stay", price: 1800, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Rustic beach shacks offering fresh local seafood." },

    // 15. Varkala
    { city: "Varkala", name: "Cliff Edge Resort", price: 4500, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Resort located right on the famous Varkala North Cliff." },
    { city: "Varkala", name: "Kerala Surf Lodge", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Surfer-friendly hostel with board rentals and lessons." },
    { city: "Varkala", name: "Papanasam Beach Stay", price: 3000, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Quiet stay near the holy Papanasam beach." },
    { city: "Varkala", name: "Coconut Grove Retreat", price: 2500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Eco-friendly cottages under the shade of palm trees." },

    // 16. Chettinad
    { city: "Chettinad", name: "Chettinad Mansion", price: 5500, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Experience the grandeur of an authentic 19th-century Chettiar palace." },
    { city: "Chettinad", name: "Chidambara Vilas", price: 4500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Heritage property renowned for its exquisite woodwork and culinary arts." },
    { city: "Chettinad", name: "Karaikudi Heritage Inn", price: 3000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable stay offering the finest Chettinad spices and food." },
    { city: "Chettinad", name: "Royal Palace Stay", price: 2200, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique hotel housed in a classic Athangudi-tiled courtyard." },

    // 17. Wayanad
    { city: "Wayanad", name: "Wayanad Treehouse", price: 6500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Authentic wooden treehouses 40 feet above the ground." },
    { city: "Wayanad", name: "Forest View Resort", price: 4000, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Resort bordering the Wayanad Wildlife Sanctuary." },
    { city: "Wayanad", name: "Green Valley Retreat", price: 2500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Homestay known for its organic farming and fresh meals." },
    { city: "Wayanad", name: "Waterfall Cabin", price: 3200, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Private wooden cabins beside a natural stream." },

    // 18. Agra
    { city: "Agra", name: "Taj View Hotel", price: 7000, img: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Wake up to an uninterrupted view of the Taj Mahal." },
    { city: "Agra", name: "Mughal Residency", price: 3500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Experience Mughal-inspired decor and hospitality." },
    { city: "Agra", name: "Marble Heritage", price: 2800, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique stay walking distance from the East Gate." },
    { city: "Agra", name: "River Yamuna Retreat", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Peaceful gardens right on the banks of the Yamuna." },

    // 19. Jaipur
    { city: "Jaipur", name: "The Royal Palace", price: 8500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Live like royalty in this converted 18th-century palace." },
    { city: "Jaipur", name: "Pink City Heritage", price: 3000, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Traditional Rajasthani architecture near Hawa Mahal." },
    { city: "Jaipur", name: "Desert Fort Resort", price: 5000, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Fortress-style resort with folk music and cultural nights." },
    { city: "Jaipur", name: "Rajputana Stay", price: 2200, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Comfortable boutique hotel with a beautiful central courtyard." },

    // 20. Varanasi
    { city: "Varanasi", name: "Ganga Ghat Hotel", price: 3500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Heritage hotel with direct private access to the Ganges." },
    { city: "Varanasi", name: "Kashi Heritage Stay", price: 2500, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Experience the narrow lanes and culture of ancient Kashi." },
    { city: "Varanasi", name: "Sunrise Boat Stay", price: 4000, img: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "A unique experience living on a stationary luxury boat." },
    { city: "Varanasi", name: "Spiritual Retreat", price: 1800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Ashram-style peaceful living away from the city noise." },

    // 21. Srinagar
    { city: "Srinagar", name: "Dal Lake Houseboat", price: 6000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Intricately carved cedar wood houseboat with Shikara rides." },
    { city: "Srinagar", name: "Shalimar Garden Retreat", price: 4500, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique hotel located next to the Mughal gardens." },
    { city: "Srinagar", name: "Snow Mountain Resort", price: 5500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Premium resort in Gulmarg, perfect for skiing." },
    { city: "Srinagar", name: "Kashmir Heritage", price: 3000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Traditional Kashmiri architecture with modern heating." },

    // 22. Arunachal Pradesh
    { city: "Arunachal Pradesh", name: "Tawang Mountain Lodge", price: 4500, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Cozy rooms with spectacular views of the snow-capped Tawang mountains." },
    { city: "Arunachal Pradesh", name: "Ziro Valley Resort", price: 3200, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay amidst the lush green pine-clad hills of Ziro." },
    { city: "Arunachal Pradesh", name: "Namdapha Eco Camp", price: 2500, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Wilderness tents near the Namdapha National Park." },
    { city: "Arunachal Pradesh", name: "Himalayan Sunrise Stay", price: 1800, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Authentic local homestay with warm indigenous hospitality." },

    // 23. Ranthambore
    { city: "Ranthambore", name: "Tiger Safari Resort", price: 7500, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxury wilderness resort offering guided tiger safaris." },
    { city: "Ranthambore", name: "Jungle Lodge Ranthambore", price: 4000, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Rustic stone cabins situated right on the park's edge." },
    { city: "Ranthambore", name: "Maharaja Tent Camp", price: 6000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Glamping experience in royal Rajasthani hunting tents." },
    { city: "Ranthambore", name: "Wilderness Retreat", price: 2800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Eco-friendly lodge surrounded by the Aravalli hills." },

    // 24. Jodhpur
    { city: "Jodhpur", name: "Mehrangarh View Hotel", price: 4000, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Rooftop dining with stunning views of Mehrangarh Fort." },
    { city: "Jodhpur", name: "Umaid Heritage", price: 9000, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Experience the grandeur of Rajasthan's royal era." },
    { city: "Jodhpur", name: "Blue City Guest House", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Cozy stay right in the middle of the iconic blue houses." },
    { city: "Jodhpur", name: "Desert Rose Stay", price: 2800, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Boutique heritage property with an indoor pool." },

    // 25. Kaziranga
    { city: "Kaziranga", name: "Rhino Retreat Kaziranga", price: 5000, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Premium resort offering early morning elephant safaris." },
    { city: "Kaziranga", name: "Brahmaputra Safari Lodge", price: 3500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Riverside property surrounded by elephant grass and wildlife." },
    { city: "Kaziranga", name: "Orchid Forest Resort", price: 4200, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Stay within acres of beautiful Assamese tea and orchid gardens." },
    { city: "Kaziranga", name: "Wild Grass Lodge", price: 2000, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Traditional rural-style cottages built with bamboo and thatch." },

    // 26. Gangtok
    { city: "Gangtok", name: "Sikkim Mountain Retreat", price: 4200, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Luxurious stay with views of the deep Himalayan valleys." },
    { city: "Gangtok", name: "Orchid Villa", price: 2800, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Beautiful homestay adorned with local Sikkim orchids." },
    { city: "Gangtok", name: "Teesta River Stay", price: 3500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Riverside resort offering rafting and bonfire activities." },
    { city: "Gangtok", name: "Monastic Stay", price: 1500, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", desc: "Peaceful stay located near the Rumtek Monastery." }
];

// ==========================================
// 2. RENDER LOGIC BASED ON CURRENT PAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const cityListContainer = document.getElementById("city-list");
    const hotelContainer = document.getElementById("hotel-container");

    if (cityListContainer) {
        displayCities(); 
    }

    if (hotelContainer) {
        loadCityStays();
    }
});

// ----------------------------------------------------
// PAGE 1 LOGIC: DYNAMIC CITY CARDS WITH ERROR FALLBACK
// ----------------------------------------------------
let uniqueCities = [];

async function displayCities() {
    const cityListContainer = document.getElementById("city-list");
    cityListContainer.innerHTML = `<div style="padding:40px; grid-column:1/-1; text-align:center;">Loading destinations...</div>`;

    // Fetch the city images from your Supabase 'tours' table
    const { data: events, error } = await db
        .from('tours')
        .select('city_name, image_url');

    let dbCityImages = {};
    if (!error && events) {
        events.forEach(item => {
            // Check if URL is valid, otherwise leave it empty so fallback works
            if (item.image_url && item.image_url.length > 5) {
                dbCityImages[item.city_name] = item.image_url;
            }
        });
    }

    // Use a Set to maintain the exact array order listed above
    const cityMap = new Map();
    staysDatabase.forEach(stay => {
        if (!cityMap.has(stay.city)) {
            // Try Supabase first, then Stays array photo, then final Fallback photo
            let finalImage = dbCityImages[stay.city] || stay.img || FALLBACK_IMAGE;

            cityMap.set(stay.city, {
                cityName: stay.city,
                img: finalImage,
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

    // Notice the onerror inside the <img> tag! This is the safety net.
    cityListContainer.innerHTML = citiesToRender.map(city => `
        <div class="card" onclick="location.href='city_stays.html?city=${encodeURIComponent(city.cityName)}'">
            <div class="img-container">
                <img src="${city.img}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';" alt="${city.cityName}">
            </div>
            <div class="card-content">
                <h2>${city.cityName}</h2>
                <p>Discover ${city.hotelCount} handpicked luxury stays, heritage villas, and cozy homestays in ${city.cityName}.</p>
                <button class="btn">View Stays →</button>
            </div>
        </div>
    `).join('');
}

// Global search function
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

    const cityHotels = staysDatabase.filter(stay => stay.city === selectedCity);

    if (cityHotels.length === 0) {
        hotelContainer.innerHTML = `<div style="padding:40px; grid-column:1/-1; text-align:center;">No stays available for this city yet.</div>`;
        return;
    }

    // Notice the onerror inside the <img> tag here too!
    hotelContainer.innerHTML = cityHotels.map(stay => `
        <div class="card">
            <div class="img-container">
                <img src="${stay.img}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';" alt="${stay.name}">
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
// ==========================================
const modal = document.getElementById("bookingModal");
const displayTotal = document.getElementById("displayTotal");
const numPersonsInput = document.getElementById("numPersons");
let currentPrice = 0;

window.openBooking = function(name, price) {
    if(!modal) return;
    currentPrice = price;
    document.getElementById("activityName").value = name;
    modal.classList.add('open');
    calculateTotal();
};

window.closeModal = function() {
    if(modal) modal.classList.remove('open');
};

function calculateTotal() {
    if(displayTotal && numPersonsInput) {
        displayTotal.textContent = numPersonsInput.value * currentPrice;
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

        const newBooking = {
            activity: "Stay: " + document.getElementById('activityName').value, 
            date: date,
            persons: document.getElementById('numPersons').value + " Room(s)",
            total: displayTotal.textContent
        };

        let existingBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        existingBookings.push(newBooking);
        localStorage.setItem('userBookings', JSON.stringify(existingBookings));
        
        alert('Hotel Booking confirmed! You can view it in your Itinerary.');
        closeModal();
    });
}