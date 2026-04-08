const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const chatRoutes    = require('./routes/chat');
const authRoutes    = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../makeAtrip')));

// Config endpoint — serves public anon key to the frontend
app.get('/api/config', (req, res) => {
    res.json({ supabaseUrl: process.env.SUPABASE_URL, supabaseAnonKey: process.env.SUPABASE_ANON_KEY });
});

// HealthCheck Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'MakeATrip-Chatbot'
    })
})


// auth routes
app.use('/api/auth', authRoutes);

// booking routes
app.use('/api/bookings', bookingRoutes);

// chat route
app.use('/api/chat', chatRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    })
})

// Global Error
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`MakeATrip Chatbot Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Chat endpoint: http://localhost:${PORT}/api/chat/message`);
});