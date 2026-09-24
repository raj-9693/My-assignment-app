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

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found',
      });
    }

    const now = new Date();
    if (now > new Date(competition.dates.registerBefore)) {
      return res.status(400).json({
        success: false,
        message: 'Registration time has ended',
      });
    }

    if (competition.spotsBooked >= competition.totalSpots) {
      return res.status(400).json({
        success: false,
        message: 'Competition spots are full',
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }

    const reservedCompetition = await Competition.findOneAndUpdate(
      {
        _id: id,
        'dates.registerBefore': { $gt: now },
        $expr: { $lt: ['$spotsBooked', '$totalSpots'] },
      },
      { $inc: { spotsBooked: 1 } },
      { new: true }
    );

    if (!reservedCompetition) {
      const latestCompetition = await Competition.findById(id);
      if (latestCompetition && now > new Date(latestCompetition.dates.registerBefore)) {
        return res.status(400).json({
          success: false,
          message: 'Registration time has ended',
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Competition spots are full',
      });
    }

    let registration;
    try {
      registration = await Registration.create({
        competitionId: reservedCompetition._id,
        userId: user._id,
        paymentStatus: 'paid', 
        status: 'registered',
      });
    } catch (error) {
      await Competition.findOneAndUpdate(
        { _id: id, spotsBooked: { $gt: 0 } },
        { $inc: { spotsBooked: -1 } }
      );

      throw error;
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successfully ho gaya hai! 🎉',
      data: {
        registrationId: registration._id,
        user: { name: user.name, email: user.email },
        updatedSpotsBooked: reservedCompetition.spotsBooked,
        totalSpots: reservedCompetition.totalSpots,
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


  

