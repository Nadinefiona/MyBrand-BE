import Joi from 'joi';

export const blogValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string()
});
