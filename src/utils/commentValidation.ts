import Joi from 'joi';

const commentValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    comment: Joi.string().required()
});

export { commentValidation };
