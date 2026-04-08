const staysDatabase = [
    // 1. Goa
    { city: "Goa", name: "Beach Paradise Resort", price: 4500, img: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?auto=format&fit=crop&w=800&q=80", desc: "Luxury beachfront stay with a private pool and direct beach access." },
    { city: "Goa", name: "Palm Grove Homestay", price: 2200, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Cozy traditional cottage nestled among coconut palms." },
    { city: "Goa", name: "Ocean View Villa", price: 6500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", desc: "Premium 3-bedroom villa overlooking the Arabian Sea." },
    { city: "Goa", name: "Sunset Beach Shack", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Budget-friendly wooden huts right on the sands of Palolem." },

    // 2. Ooty
    { city: "Ooty", name: "Misty Mountain Resort", price: 3500, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "A serene mountain retreat with bonfire evenings." },
    { city: "Ooty", name: "Hilltop Cottage", price: 2800, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Colonial-style cottage with sweeping valley views." },
    { city: "Ooty", name: "Tea Garden Retreat", price: 4200, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80", desc: "Stay right in the middle of a working Nilgiri tea estate." },
    { city: "Ooty", name: "Blue Hills Lodge", price: 1800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80", desc: "Comfortable and warm stay near the Botanical Gardens." },

    // 3. Pondicherry
    { city: "Pondicherry", name: "Ocean Breeze Hotel", price: 3000, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Modern sea-facing hotel steps from the famous promenade." },
    { city: "Pondicherry", name: "French Colony Stay", price: 2500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&w=800&q=80", desc: "Heritage yellow villa in the heart of the French Quarter." },
    { city: "Pondicherry", name: "Auroville Eco Retreat", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", desc: "Sustainable bamboo huts nestled in the Auroville forest." },
    { city: "Pondicherry", name: "White Town Boutique", price: 5500, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80", desc: "Luxury boutique hotel with a rooftop pool and French café." },

    // 4. Munnar
    { city: "Munnar", name: "Tea Estate Bungalow", price: 4000, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", desc: "Wake up to the smell of fresh tea leaves in this plantation stay." },
    { city: "Munnar", name: "Cloud Nine Camp", price: 1800, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", desc: "Luxury glamping experience high up in the hills." },
    { city: "Munnar", name: "Spice Valley Resort", price: 3200, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", desc: "Surrounded by cardamom and pepper plantations." },
    { city: "Munnar", name: "Silver Oaks Homestay", price: 2100, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80", desc: "Authentic Kerala food and warm hospitality." },

    // 5. Jaipur
    { city: "Jaipur", name: "The Royal Palace", price: 8500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?auto=format&fit=crop&w=800&q=80", desc: "Live like royalty in this converted 18th-century palace." },
    { city: "Jaipur", name: "Pink City Heritage", price: 3000, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", desc: "Traditional Rajasthani architecture near Hawa Mahal." },
    { city: "Jaipur", name: "Desert Fort Resort", price: 5000, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80", desc: "Fortress-style resort with folk music and cultural nights." },
    { city: "Jaipur", name: "Rajputana Stay", price: 2200, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=800&q=80", desc: "Comfortable boutique hotel with a beautiful central courtyard." },

    // 6. Udaipur
    { city: "Udaipur", name: "Lake Palace Stay", price: 12000, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?auto=format&fit=crop&w=800&q=80", desc: "Floating marble palace offering unparalleled luxury on Lake Pichola." },
    { city: "Udaipur", name: "Pichola View Hotel", price: 4500, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?auto=format&fit=crop&w=800&q=80", desc: "Stunning rooftop dining overlooking the lake and City Palace." },
    { city: "Udaipur", name: "Royal Mewar Villa", price: 6000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "Private pool villa with intricate Rajasthani frescoes." },
    { city: "Udaipur", name: "Sunset Point Resort", price: 2500, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Quiet resort located on the hills surrounding Udaipur." },

    // 7. Agra
    { city: "Agra", name: "Taj View Hotel", price: 7000, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", desc: "Wake up to an uninterrupted view of the Taj Mahal." },
    { city: "Agra", name: "Mughal Residency", price: 3500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&w=800&q=80", desc: "Experience Mughal-inspired decor and hospitality." },
    { city: "Agra", name: "Marble Heritage", price: 2800, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Boutique stay walking distance from the East Gate." },
    { city: "Agra", name: "River Yamuna Retreat", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", desc: "Peaceful gardens right on the banks of the Yamuna." },

    // 8. Manali
    { city: "Manali", name: "Snow Peak Resort", price: 4000, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "Cozy rooms with wooden interiors and snow-capped views." },
    { city: "Manali", name: "River Side Cottage", price: 3200, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Charming cottage located right next to the Beas River." },
    { city: "Manali", name: "Apple Orchard Stay", price: 2500, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80", desc: "Stay amidst blossoming apple trees in Old Manali." },
    { city: "Manali", name: "Himalayan Woods", price: 1800, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Backpacker-friendly lodge with a vibrant cafe." },

    // 9. Shimla
    { city: "Shimla", name: "Mall Road Heritage", price: 5500, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", desc: "Iconic colonial hotel located right on the bustling Mall Road." },
    { city: "Shimla", name: "Pine Tree Resort", price: 3800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80", desc: "Secluded stay surrounded by dense pine forests." },
    { city: "Shimla", name: "The Ridge View", price: 4200, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", desc: "Premium rooms offering panoramic views of the Shimla valley." },
    { city: "Shimla", name: "Snow Valley Retreat", price: 2800, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "Comfortable and heated rooms perfect for winter stays." },

    // 10. Darjeeling
    { city: "Darjeeling", name: "Kanchenjunga View", price: 4500, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Watch the sunrise over Mt. Kanchenjunga from your balcony." },
    { city: "Darjeeling", name: "Toy Train Heritage", price: 3500, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", desc: "Historic stay located right next to the Darjeeling Himalayan Railway." },
    { city: "Darjeeling", name: "Tea Estate Bungalow", price: 5000, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", desc: "British-era bungalow surrounded by rolling tea gardens." },
    { city: "Darjeeling", name: "Sunrise Point", price: 2200, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?auto=format&fit=crop&w=800&q=80", desc: "Cozy rooms near Tiger Hill for early morning excursions." },

    // 11. Gangtok
    { city: "Gangtok", name: "Sikkim Mountain Retreat", price: 4200, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "Luxurious stay with views of the deep Himalayan valleys." },
    { city: "Gangtok", name: "Orchid Villa", price: 2800, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Beautiful homestay adorned with local Sikkim orchids." },
    { city: "Gangtok", name: "Teesta River Stay", price: 3500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Riverside resort offering rafting and bonfire activities." },
    { city: "Gangtok", name: "Monastic Stay", price: 1500, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", desc: "Peaceful stay located near the Rumtek Monastery." },

    // 12. Varanasi
    { city: "Varanasi", name: "Ganga Ghat Hotel", price: 3500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&w=800&q=80", desc: "Heritage hotel with direct private access to the Ganges." },
    { city: "Varanasi", name: "Kashi Heritage Stay", price: 2500, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=800&q=80", desc: "Experience the narrow lanes and culture of ancient Kashi." },
    { city: "Varanasi", name: "Sunrise Boat Stay", price: 4000, img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", desc: "A unique experience living on a stationary luxury boat." },
    { city: "Varanasi", name: "Spiritual Retreat", price: 1800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80", desc: "Ashram-style peaceful living away from the city noise." },

    // 13. Rishikesh
    { city: "Rishikesh", name: "Ganga View Ashram", price: 2000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "Serene ashram offering daily yoga and meditation classes." },
    { city: "Rishikesh", name: "River Rafting Camp", price: 2500, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", desc: "Adventure tents on white sand beaches with bonfire." },
    { city: "Rishikesh", name: "Himalayan Foothills", price: 5500, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", desc: "Luxury spa resort focusing on Ayurvedic wellness." },
    { city: "Rishikesh", name: "Tranquil Stay", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Backpacker hostel near Laxman Jhula with great cafes." },

    // 14. Alleppey
    { city: "Alleppey", name: "Backwaters Houseboat", price: 8000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", desc: "Private traditional AC houseboat with a personal chef." },
    { city: "Alleppey", name: "Lake View Resort", price: 4500, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?auto=format&fit=crop&w=800&q=80", desc: "Resort situated right on the banks of Vembanad Lake." },
    { city: "Alleppey", name: "Palm Tree Heritage", price: 3000, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", desc: "Traditional Kerala architecture surrounded by coconut groves." },
    { city: "Alleppey", name: "Canoe Stay", price: 2000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Homestay offering complimentary morning canoe rides." },

    // 15. Coorg
    { city: "Coorg", name: "Coffee Plantation Stay", price: 3500, img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", desc: "Immersive stay in a 100-acre robusta coffee estate." },
    { city: "Coorg", name: "Madikeri Hills Resort", price: 5000, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "Luxury cottages with private infinity pools." },
    { city: "Coorg", name: "Wilderness Camp", price: 2800, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", desc: "Eco-friendly tents for the ultimate nature experience." },
    { city: "Coorg", name: "Abbey Falls Retreat", price: 2200, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80", desc: "Listen to the sound of waterfalls from your room." },

    // 16. Wayanad
    { city: "Wayanad", name: "Wayanad Treehouse", price: 6500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Authentic wooden treehouses 40 feet above the ground." },
    { city: "Wayanad", name: "Forest View Resort", price: 4000, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80", desc: "Resort bordering the Wayanad Wildlife Sanctuary." },
    { city: "Wayanad", name: "Green Valley Retreat", price: 2500, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Homestay known for its organic farming and fresh meals." },
    { city: "Wayanad", name: "Waterfall Cabin", price: 3200, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?auto=format&fit=crop&w=800&q=80", desc: "Private wooden cabins beside a natural stream." },

    // 17. Kodaikanal
    { city: "Kodaikanal", name: "Kodai Lake Resort", price: 4500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&w=800&q=80", desc: "Premium property right on the banks of Kodaikanal Lake." },
    { city: "Kodaikanal", name: "Pine Forest Stay", price: 2800, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80", desc: "Mystical stay surrounded by dense pine trees." },
    { city: "Kodaikanal", name: "Cloud 9 Retreat", price: 3500, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", desc: "High-altitude resort where clouds enter your balcony." },
    { city: "Kodaikanal", name: "Starry Nights Villa", price: 5000, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "A private 2-bedroom villa with a glass roof for stargazing." },

    // 18. Andaman
    { city: "Andaman", name: "Havelock Beach Resort", price: 7500, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", desc: "Luxury cottages on Radhanagar Beach." },
    { city: "Andaman", name: "Coral Reef Stay", price: 4000, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?auto=format&fit=crop&w=800&q=80", desc: "Resort offering in-house scuba diving certifications." },
    { city: "Andaman", name: "Neil Island Eco Hut", price: 2500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Rustic bamboo huts on the pristine Neil Island." },
    { city: "Andaman", name: "Port Blair Heritage", price: 3500, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=800&q=80", desc: "Comfortable stay near Cellular Jail with sea views." },

    // 19. Leh
    { city: "Leh", name: "Pangong Lake Camp", price: 4500, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", desc: "Premium insulated tents right on the edge of Pangong Tso." },
    { city: "Leh", name: "Ladakh Mountain Resort", price: 5500, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "Heated rooms with views of the Stok Kangri range." },
    { city: "Leh", name: "Nubra Valley Tent", price: 3000, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80", desc: "Desert camp near the famous sand dunes of Hunder." },
    { city: "Leh", name: "Leh Palace View", price: 2200, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", desc: "Traditional Ladakhi homestay in the heart of Leh market." },

    // 20. Srinagar
    { city: "Srinagar", name: "Dal Lake Houseboat", price: 6000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", desc: "Intricately carved cedar wood houseboat with Shikara rides." },
    { city: "Srinagar", name: "Shalimar Garden Retreat", price: 4500, img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80", desc: "Boutique hotel located next to the Mughal gardens." },
    { city: "Srinagar", name: "Snow Mountain Resort", price: 5500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Premium resort in Gulmarg, perfect for skiing." },
    { city: "Srinagar", name: "Kashmir Heritage", price: 3000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Traditional Kashmiri architecture with modern heating." },

    // 21. Jaisalmer
    { city: "Jaisalmer", name: "Thar Desert Camp", price: 4500, img: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80", desc: "Luxury Swiss tents with evening cultural performances." },
    { city: "Jaisalmer", name: "Golden Fort Heritage", price: 3500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?auto=format&fit=crop&w=800&q=80", desc: "Stay inside the living Jaisalmer Fort." },
    { city: "Jaisalmer", name: "Camel Safari Stay", price: 2000, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80", desc: "Sleep under the stars after a sunset camel safari." },
    { city: "Jaisalmer", name: "Rajput Desert Villa", price: 5500, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "Haveli-style hotel with intricate sandstone carvings." },

    // 22. Jodhpur
    { city: "Jodhpur", name: "Mehrangarh View Hotel", price: 4000, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", desc: "Rooftop dining with stunning views of Mehrangarh Fort." },
    { city: "Jodhpur", name: "Umaid Heritage", price: 9000, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?auto=format&fit=crop&w=800&q=80", desc: "Experience the grandeur of Rajasthan's royal era." },
    { city: "Jodhpur", name: "Blue City Guest House", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Cozy stay right in the middle of the iconic blue houses." },
    { city: "Jodhpur", name: "Desert Rose Stay", price: 2800, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=800&q=80", desc: "Boutique heritage property with an indoor pool." },

    // 23. Hampi
    { city: "Hampi", name: "Boulders Retreat", price: 4500, img: "https://images.unsplash.com/photo-1584061596705-ba2e7e0e7a17?auto=format&fit=crop&w=800&q=80", desc: "Resort built naturally around Hampi's giant boulders." },
    { city: "Hampi", name: "Ruins View Stay", price: 2500, img: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?auto=format&fit=crop&w=800&q=80", desc: "Walking distance from the Virupaksha Temple." },
    { city: "Hampi", name: "Tungabhadra River Resort", price: 3200, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Riverside cabins offering coracle boat rides." },
    { city: "Hampi", name: "Banana Plantation Guest House", price: 1200, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80", desc: "Hippie-style huts across the river in Sanapur." },

    // 24. Gokarna
    { city: "Gokarna", name: "Om Beach Resort", price: 4000, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", desc: "Premium Ayurvedic resort near the famous Om Beach." },
    { city: "Gokarna", name: "Hippie Beach Shack", price: 1500, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", desc: "Basic sea-facing huts with great seafood." },
    { city: "Gokarna", name: "Kudle Ocean Retreat", price: 3500, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", desc: "Cliff-top resort with a panoramic view of the Arabian Sea." },
    { city: "Gokarna", name: "Paradise Cove Stay", price: 2200, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", desc: "Secluded stay accessible only by a short trek." },

    // 25. Varkala
    { city: "Varkala", name: "Cliff Edge Resort", price: 4500, img: "https://images.unsplash.com/photo-1574621100236-d25a61b8fba0?auto=format&fit=crop&w=800&q=80", desc: "Resort located right on the famous Varkala North Cliff." },
    { city: "Varkala", name: "Kerala Surf Lodge", price: 2000, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80", desc: "Surfer-friendly hostel with board rentals and lessons." },
    { city: "Varkala", name: "Papanasam Beach Stay", price: 3000, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80", desc: "Quiet stay near the holy Papanasam beach." },
    { city: "Varkala", name: "Coconut Grove Retreat", price: 2500, img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80", desc: "Eco-friendly cottages under the shade of palm trees." },

    // 26. Mysore
    { city: "Mysore", name: "Royal Mysore Heritage", price: 6500, img: "https://images.unsplash.com/photo-1599661559683-9971939886b6?auto=format&fit=crop&w=800&q=80", desc: "Stay in a restored palace with royal hospitality." },
    { city: "Mysore", name: "Palace View Hotel", price: 3500, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", desc: "See the illuminated Mysore Palace from your window." },
    { city: "Mysore", name: "Chamundi Hills Resort", price: 4000, img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=800&q=80", desc: "Quiet nature resort located at the base of the hills." },
    { city: "Mysore", name: "Sandalwood Stay", price: 2000, img: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&w=800&q=80", desc: "Boutique homestay famous for its authentic local cuisine." }
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

        // Create booking object (compatible with your Tours Itinerary page)
        const newBooking = {
            activity: "Stay: " + document.getElementById('activityName').value, 
            date: date,
            persons: document.getElementById('numPersons').value + " Room(s)",
            total: displayTotal.textContent
        };

        // Fetch existing, push new, and save back to local storage
        let existingBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        existingBookings.push(newBooking);
        localStorage.setItem('userBookings', JSON.stringify(existingBookings));
        
        alert('Hotel Booking confirmed! You can view it in your Itinerary.');
        closeModal();
    });
}