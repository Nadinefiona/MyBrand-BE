import Joi from 'joi';

export const signupValidation = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
