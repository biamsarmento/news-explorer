const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser,
} = require('../controllers/users');
const { userIdSchema } = require('../validators/userValidators');
const validate = require('../middlewares/validate');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', validate(userIdSchema, 'params'), getUserById);

module.exports = router;
