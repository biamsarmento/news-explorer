const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log("User: ", req.user); // Verifique se o usuário está definido

  const { publishedAt, urlToImage, title, description, source } = req.body;
  const owner = req.user._id; // Garante que não vai quebrar

  // if (!owner) {
  //   return res.status(401).send({ message: 'Usuário não autenticado.' });
  // }

  console.log("Owner:", owner);

  Card.create({ publishedAt, urlToImage, title, description, source, owner })
    .then((card) => {
      console.log("After: ", card);
      Card.findById(card._id).populate('owner')
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log("Está dando erro aqui!");
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Dados inválidos fornecidos. ${err.message}` });
      }
      return next(err);
    });
};


module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndDelete(id)
          .orFail()
          .then((deletedCard) => res.send({ data: deletedCard }));
      }
      return res.status(403).send({ message: 'Você não tem permissão para apagar este cartão.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate('owner')
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate('owner')
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos fornecidos.' });
      }
      if (err.name === 'CastError' || err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Cartão não encontrado.' });
      }
      return next(err);
    });
};