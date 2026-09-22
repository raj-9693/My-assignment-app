// DUMMY DATA — matches the shape of what the backend API will eventually return.
// When the real API is ready, just replace this import with the fetch() response.
// Example:
//   const [competition, setCompetition] = useState(null);
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/competitions/${id}`)
//       .then(res => res.json())
//       .then(setCompetition);
//   }, []);
//
// Keep the field names below IDENTICAL to your MongoDB schema so swapping
// dummy data for real data requires zero changes in the components.

const dummyCompetition = {
  _id: 'comp_001',
  title: 'Feedants Classical Dance',
  category: ['Dance', 'Multi-Win'],
  hasWinnerCertificate: true,

  prizePool: 1500,
  entryFee: 99,

  totalSpots: 20,
  spotsBooked: 1,

  isUserRegistered: false, // controls the "Registered" badge top-right

  judge: {
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ years of experience',
    photoUrl: 'https://i.pravatar.cc/150?img=32',
    introVideoUrl: '',
  },

  dates: {
    registerBefore: '2026-08-10T23:50:00',
    submissionStarts: '2026-08-06T04:00:00',
    submissionEnds: '2026-08-30T23:55:00',
    resultDate: '2026-09-01T23:50:00',
  },

  aboutCompetition:
    'This is an online classical dance competition open for all age groups. ' +
    'Participate from anywhere and showcase your talent through traditional dance. ' +
    'Entries will be judged on grace, technique, expression and adherence to classical form.',

  judgingParameters:
    'Entries are judged on technique (40%), expression & storytelling (30%), ' +
    'costume & presentation (15%), and originality (15%). Only contributions from ' +
    'paid participants will be considered for judging.',

  rulesAndEligibility:
    'Open to all age groups. One submission per registered participant. ' +
    'Videos must be under 3 minutes and recorded in landscape mode. ' +
    'Any use of copyrighted music without credit will lead to disqualification.',

  rewards: [
    { position: '1st Winner', amount: 550, icon: 'trophy' },
    { position: '2nd Winner', amount: 300, icon: 'medal-silver' },
    { position: '3rd Winner', amount: 240, icon: 'medal-bronze' },
    { position: '4th Winner', amount: 200, icon: 'star' },
    { position: '5th Winner', amount: 130, icon: 'star' },
    { position: '6th Winner', amount: 80, icon: 'star' },
  ],

  previousWinners: [
    { name: 'Riya Shah', position: '1st Winner', videoUrl: '' },
    { name: 'Aarav Mehta', position: '1st Winner', videoUrl: '' },
    { name: 'Neha Verma', position: '2nd Winner', videoUrl: '' },
    { name: 'Ishika Chauhan', position: '3rd Winner', videoUrl: '' },
  ],

  referral: {
    link: 'feedants.com/r/referral123',
    earnPerSignup: 10,
  },

  paymentInfo: {
    poweredBy: 'Razorpay',
    refundPolicyText: 'Refund policy applies before submission.',
  },
};

export default dummyCompetition;
