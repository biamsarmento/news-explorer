const router = require('express').Router();
const {
  getArticles, createArticle, deleteArticle, getUserArticles,
} = require('../controllers/articles');
const { articleIdSchema } = require('../validators/articleValidators');
const validate = require('../middlewares/validate');

router.get('/', getArticles);

router.post('/', createArticle);

router.get('/me', getUserArticles);

router.delete('/:id', validate(articleIdSchema, 'params'), deleteArticle);

module.exports = router;
