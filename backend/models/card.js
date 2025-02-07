const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  publishedAt: {
    type: Date,
    required: true,
  },
  urlToImage: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)(www\.)?[\w\-.~:/?%#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: (props) => `${props.value} Esse link não é válido!`,
    },
    required: [true, 'Link para a imagem exigido!'],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    name: {
      type: String,
      required: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

});

cardSchema.index({ description: 1, owner: 1 }, { unique: true })

module.exports = mongoose.model('card', cardSchema);


const Joi = require('joi');

// Validação com Joi para os cards
const cardValidationSchema = Joi.object({
  publishedAt: Joi.date().required().messages({
    'date.base': 'O campo "publishedAt" deve ser uma data válida.',
    'any.required': 'O campo "publishedAt" é obrigatório.',
  }),
  image: Joi.string().uri().required().messages({
    'string.empty': 'O campo "image" é obrigatório.',
    'string.uri': 'O campo "image" deve ser uma URL válida.',
  }),
  title: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'O campo "title" é obrigatório.',
    'string.min': 'O campo "title" deve ter no mínimo 2 caracteres.',
    'string.max': 'O campo "title" deve ter no máximo 100 caracteres.',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'O campo "description" é obrigatório.',
  }),
  source: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'O campo "source.name" é obrigatório.',
    }),
  }).required(),
  owner: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'string.empty': 'O campo "owner" é obrigatório.',
    'any.invalid': 'O campo "owner" deve ser um ID válido.',
  }),
});

module.exports.cardValidationSchema = cardValidationSchema;
