const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: [String],
    hasWinnerCertificate: { type: Boolean, default: true },

    prizePool: { type: Number, required: true },
    entryFee: { type: Number, required: true },

    totalSpots: { type: Number, required: true },
    spotsBooked: { type: Number, default: 0 },

    // NOTE: in a real app this should be derived per logged-in user
    // (via the Registration collection), not stored directly on the
    // competition. Kept here for now since auth isn't wired up yet.
    isUserRegistered: { type: Boolean, default: false },

    judge: {
      name: String,
      title: String,
      experience: String,
      photoUrl: String,
      introVideoUrl: String,
    },

    dates: {
      registerBefore: Date,
      submissionStarts: Date,
      submissionEnds: Date,
      resultDate: Date,
    },

    aboutCompetition: String,
    judgingParameters: String,
    rulesAndEligibility: String,

    rewards: [
      {
        position: String,
        amount: Number,
        icon: {
          type: String,
          enum: ['trophy', 'medal-silver', 'medal-bronze', 'star'],
          default: 'star',
        },
      },
    ],

    previousWinners: [
      {
        name: String,
        position: String,
        photoUrl: String,
        videoUrl: String,
      },
    ],

    referral: {
      link: String,
      earnPerSignup: Number,
    },

    paymentInfo: {
      poweredBy: { type: String, default: 'Razorpay' },
      refundPolicyText: { type: String, default: 'Refund policy applies before submission.' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Competition', competitionSchema);