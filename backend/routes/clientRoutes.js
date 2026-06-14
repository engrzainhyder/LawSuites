const router = require('express').Router();
const ctrl = require('../controllers/clientController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', protect, ctrl.getMe);
router.get('/', protect, adminOnly, ctrl.getAllClients);
router.delete('/:id', protect, adminOnly, ctrl.deleteClient);

module.exports = router;
