const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard, getUserCards,
} = require('../controllers/cards');
const { createCardSchema, cardIdSchema, cardLikeDislikeSchema } = require('../validators/cardValidators');
const validate = require('../middlewares/validate');

router.get('/', getCards);

// router.post('/', validate(createCardSchema), createCard);
router.post('/', createCard);

router.get('/me', getUserCards);

router.delete('/:id', validate(cardIdSchema, 'params'), deleteCard);

router.put('/likes/:cardId', validate(cardLikeDislikeSchema, 'params'), likeCard);

router.delete('/likes/:cardId', validate(cardLikeDislikeSchema, 'params'), dislikeCard);

module.exports = router;
