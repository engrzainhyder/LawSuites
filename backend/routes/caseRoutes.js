const router = require('express').Router();
const ctrl = require('../controllers/caseController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/my', protect, ctrl.getMyCases);
router.get('/', protect, adminOnly, ctrl.getAllCases);
router.get('/:id', protect, ctrl.getCaseById);
router.put('/:id', protect, adminOnly, ctrl.updateCase);
router.delete('/:id', protect, adminOnly, ctrl.deleteCase);
router.post('/:id/hearings', protect, adminOnly, ctrl.addHearing);
router.delete('/:caseId/hearings/:hearingId', protect, adminOnly, ctrl.deleteHearing);

module.exports = router;
