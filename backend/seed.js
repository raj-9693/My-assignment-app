// seed.js
require('dotenv').config(); // <-- Yeh line top par add karein
const mongoose = require('mongoose');
const Competition = require('./Models/Competition'); // Aapke model file ka path

// MongoDB Connection String (Apna DB URL replace kar sakte hain)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_db';

const initialCompetitionData = {
  title: "Feedants Classical Dance",
  category: ["Dance", "Multi-Win"],
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  spotsBooked: 1,
  judge: {
    name: "Manju Dubey",
    title: "Professional Kathak Dancer",
    experience: "12+ Years of Experience",
    photoUrl: "https://i.pravatar.cc/150?img=47",
    introVideoUrl: "https://example.com/video.mp4"
  },
  dates: {
    registerBefore: new Date("2026-08-10T23:50:00Z"),
    submissionStarts: new Date("2026-08-06T04:00:00Z"),
    submissionEnds: new Date("2026-08-30T23:55:00Z"),
    resultDate: new Date("2026-09-01T23:50:00Z")
  },
  aboutCompetition: "This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent.",
  judgingParameters: "Technical skill, Rhythm, Expression, and Choreography.",
  rulesAndEligibility: "Open for all participants. Video length should be between 1-3 minutes.",
  rewards: [
    { position: "1st Winner", amount: 550 },
    { position: "2nd Winner", amount: 300 },
    { position: "3rd Winner", amount: 240 },
    { position: "4th Winner", amount: 200 },
    { position: "5th Winner", amount: 130 },
    { position: "6th Winner", amount: 80 }
  ],
  previousWinners: [
    { name: "Riya Shah", position: "1st Winner", photoUrl: "https://i.pravatar.cc/150?img=1" },
    { name: "Aarav Mehta", position: "1st Winner", photoUrl: "https://i.pravatar.cc/150?img=2" },
    { name: "Neha Verma", position: "2nd Winner", photoUrl: "https://i.pravatar.cc/150?img=3" },
    { name: "Ishita Choha", position: "3rd Winner", photoUrl: "https://i.pravatar.cc/150?img=4" }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Purana data clear karke naya insert karein
    await Competition.deleteMany({});
    const createdCompetition = await Competition.create(initialCompetitionData);

    console.log('Data Successfully Inserted to MongoDB!');
    console.log('Inserted Competition ID:', createdCompetition._id);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();