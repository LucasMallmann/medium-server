const Joi = require('joi')

module.exports = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  }
}
