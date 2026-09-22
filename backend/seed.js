require('dotenv').config();
const mongoose = require('mongoose');
const Competition = require('./Models/Competition');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_db';

const initialCompetitionData = {
  title: 'Feedants Classical Dance',
  category: ['Dance', 'Multi-Win'],
  hasWinnerCertificate: true,

  prizePool: 1500,
  entryFee: 99,

  totalSpots: 20,
  spotsBooked: 1,

  isUserRegistered: true, // controls the "Registered" badge + button state on the app

  judge: {
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    photoUrl: 'https://i.pravatar.cc/150?img=47',
    introVideoUrl: 'https://example.com/video.mp4',
  },

  dates: {
    registerBefore: new Date('2026-08-10T23:50:00Z'),
    submissionStarts: new Date('2026-08-06T04:00:00Z'),
    submissionEnds: new Date('2026-08-30T23:55:00Z'),
    resultDate: new Date('2026-09-01T23:50:00Z'),
  },

  aboutCompetition:
    'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent.',
  judgingParameters: 'Technical skill, Rhythm, Expression, and Choreography.',
  rulesAndEligibility: 'Open for all participants. Video length should be between 1-3 minutes.',

  rewards: [
    { position: '1st Winner', amount: 550, icon: 'trophy' },
    { position: '2nd Winner', amount: 300, icon: 'medal-silver' },
    { position: '3rd Winner', amount: 240, icon: 'medal-bronze' },
    { position: '4th Winner', amount: 200, icon: 'star' },
    { position: '5th Winner', amount: 130, icon: 'star' },
    { position: '6th Winner', amount: 80, icon: 'star' },
  ],

  previousWinners: [
    { name: 'Riya Shah', position: '1st Winner', photoUrl: 'https://i.pravatar.cc/150?img=1', videoUrl: '' },
    { name: 'Aarav Mehta', position: '1st Winner', photoUrl: 'https://i.pravatar.cc/150?img=2', videoUrl: '' },
    { name: 'Neha Verma', position: '2nd Winner', photoUrl: 'https://i.pravatar.cc/150?img=3', videoUrl: '' },
    { name: 'Ishita Chauhan', position: '3rd Winner', photoUrl: 'https://i.pravatar.cc/150?img=4', videoUrl: '' },
  ],

  // These two objects were the ones missing — CompetitionDetailsScreen.js
  // reads competition.paymentInfo.poweredBy and competition.referral.link directly.
  referral: {
    link: 'feedants.com/r/referral123',
    earnPerSignup: 10,
  },

  paymentInfo: {
    poweredBy: 'Razorpay',
    refundPolicyText: 'Refund policy applies before submission.',
  },
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

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