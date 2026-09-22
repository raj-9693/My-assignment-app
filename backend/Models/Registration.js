const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'submitted', 'cancelled'],
    default: 'registered'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  submissionUrl: {
    type: String,
    default: null
  },
  submittedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Ek user ek competition mein sirf ek baar hi register kar sake — yeh line important hai
registrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);