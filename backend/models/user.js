const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} não é um e-mail válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('user', userSchema);

// Validação com Joi
const userValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O e-mail fornecido não é válido.',
    'any.required': 'O e-mail é obrigatório.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'A senha deve conter no mínimo 8 caracteres.',
    'any.required': 'A senha é obrigatória.',
  }),
  username: Joi.string().min(3).required().messages({
    'string.min': 'O nome de usuário não é válido',
    'any.required': 'O nome de usuário é obrigatório.',
  }),
});

module.exports.userValidationSchema = userValidationSchema;
