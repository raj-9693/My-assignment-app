const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: [String],
  prizePool: Number,
  entryFee: Number,
  totalSpots: Number,
  spotsBooked: { type: Number, default: 0 },
  judge: {
    name: String,
    title: String,
    experience: String,
    photoUrl: String,
    introVideoUrl: String
  },
  dates: {
    registerBefore: Date,
    submissionStarts: Date,
    submissionEnds: Date,
    resultDate: Date
  },
  aboutCompetition: String,
  judgingParameters: String,
  rulesAndEligibility: String,
  rewards: [{ position: String, amount: Number }],
  previousWinners: [{ name: String, photoUrl: String, position: String }]
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);