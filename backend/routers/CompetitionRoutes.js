const express = require('express');
const router = express.Router();
const { getActiveCompetition,registerForCompetition } = require('../Controllers/competitionController');

// GET Route
router.get('/active', getActiveCompetition);
router.post('/:id/register',registerForCompetition); 


module.exports = router;