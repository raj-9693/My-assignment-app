const Competition = require('../Models/Competition');
const User = require('../Models/user');
const Registration = require('../Models/Registration');

const getActiveCompetition = async (req, res) => {
  try {
    // Database se sabse recent competition fetch karein
    const competition = await Competition.findOne().sort({ createdAt: -1 });

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'No competition found'
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      data: competition
    });

  } catch (error) {
    console.error('Error fetching competition:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


// POST /api/competitions/:id/register
const registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params; // Competition ID
    const { name, email, phone } = req.body; // Form se aane wala user data

    // 1. Basic Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, aur Phone sabhi fields zaroori hain.',
      });
    }

    // 2. Pehle check karein ya naya User create karein
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }

    // 3. ATOMIC UPDATE: Spots check karein aur increment karein (Concurrency Protection)
    const competition = await Competition.findOneAndUpdate(
      {
        _id: id,
        $expr: { $lt: ['$spotsBooked', '$totalSpots'] }, // Ensures spotsBooked < totalSpots
      },
      { $inc: { spotsBooked: 1 } },
      { new: true }
    );

    // Agar spots full hain ya ID galat hai
    if (!competition) {
      return res.status(400).json({
        success: false,
        message: 'Registration failed! Competition spots full ho chuke hain ya competition active nahi hai.',
      });
    }

    // 4. Duplicate Registration check karein
    const existingRegistration = await Registration.findOne({
      competitionId: id,
      userId: user._id,
    });

    if (existingRegistration) {
      // Rollback atomic update agar user pehle se registered hai
      await Competition.findByIdAndUpdate(id, { $inc: { spotsBooked: -1 } });
      return res.status(400).json({
        success: false,
        message: 'Aap is competition mein pehle se registered hain.',
      });
    }

    // 5. Naya Registration Record save karein
    const registration = await Registration.create({
      competitionId: competition._id,
      userId: user._id,
      paymentStatus: 'paid', // Dummy payment success
      status: 'registered',
    });

    // 6. Success Response
    return res.status(201).json({
      success: true,
      message: 'Registration successfully ho gaya hai! 🎉',
      data: {
        registrationId: registration._id,
        user: { name: user.name, email: user.email },
        updatedSpotsBooked: competition.spotsBooked,
        totalSpots: competition.totalSpots,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error: Registration processing mein dikkat aayi.',
      error: error.message,
    });
  }
};

module.exports = { getActiveCompetition,registerForCompetition };


  

