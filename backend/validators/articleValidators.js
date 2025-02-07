const Joi = require('joi');
const mongoose = require('mongoose');

const createArticleSchema = Joi.object({
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
  likes: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })).default([]).messages({
    'any.invalid': 'Cada item em "likes" deve ser um ID válido.',
  }),
});

const articleIdSchema = Joi.object({
  id: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required().messages({
    'any.invalid': 'O parâmetro "id" deve ser um ID válido.',
  }),
});

module.exports = { createArticleSchema, articleIdSchema };
