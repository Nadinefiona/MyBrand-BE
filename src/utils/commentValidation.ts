import Joi from 'joi';

const commentValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  comment: Joi.string().required(),
});

export { commentValidationSchema };
