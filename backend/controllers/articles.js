const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.getUserArticles = (req, res, next) => {
  // Procura todos os cards que possuem o owner igual ao usuário autenticado
  Article.find({ owner: req.user._id })
    .populate('owner') // Popula a referência do owner (usuário)
    .then((articles) => {
      if (!articles || articles.length === 0) {
        return res.status(404).send({ message: 'Nenhum artigo encontrado para este usuário.' });
      }
      return res.send({ data: articles });
    })
    .catch(next); // Passa o erro para o próximo middleware
};


module.exports.createArticle = (req, res, next) => {

  const { publishedAt, urlToImage, title, description, source } = req.body;
  const owner = req.user._id; // Garante que não vai quebrar

  Article.findOne({ description, owner })
    .then((existingArticle) => {
      if (existingArticle) {
        return res.status(400).send({ message: 'Você já salvou um artigo com esta descrição.' });
      }

      // Se não existir, cria o novo artigo
      return Article.create({ publishedAt, urlToImage, title, description, source, owner })
        .then((article) => {
          res.status(201).send({ data: article });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;

  Article.findById(id)
    .orFail()
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        return Article.findByIdAndDelete(id)
          .orFail()
          .then((deletedArticle) => res.send({ data: deletedArticle }));
      }
      return res.status(403).send({ message: 'Você não tem permissão para apagar este artigo.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Artigo não encontrado.' });
      }
      return next(err);
    });
};
