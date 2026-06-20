const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/clientController');
const { protect, adminOnly } = require('../middleware/auth');

const registerRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('email').isEmail().withMessage('Valid email is required.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('cnic').trim().notEmpty().withMessage('CNIC is required.'),
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];

router.post('/register', registerRules, ctrl.register);
router.post('/login', loginRules, ctrl.login);
router.get('/me', protect, ctrl.getMe);
router.get('/', protect, adminOnly, ctrl.getAllClients);
router.delete('/:id', protect, adminOnly, ctrl.deleteClient);

module.exports = router;
