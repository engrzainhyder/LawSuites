const router = require('express').Router();
const { matchAttorney } = require('../controllers/aiController');

router.post('/match', matchAttorney);

module.exports = router;
