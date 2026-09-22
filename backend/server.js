require('dotenv').config();
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');


// Routes import
const competitionRouter = require('./routers/CompetitionRoutes');


const app = express();

// 1. Database connect karo
connectDB();

// 2. Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 3. Test route (server check karne ke liye)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server chal raha hai! 🚀',
  });
});

// 4. Routes Competitions karo
app.use('/api/competitions', competitionRouter);


// 5. 404 handler — 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route nahi mila.',
  });
});

// 6. Global error handler 
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Kuch galat ho gaya server me.',
  });
});

// 7. Server start ('0.0.0.0' add karein)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server chal raha hai port ${PORT} par`);
});