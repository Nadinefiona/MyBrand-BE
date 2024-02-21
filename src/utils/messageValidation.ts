import Joi, { ValidationResult } from 'joi';

export interface Message {
    name: string;
    email: string;
    text: string;
}

export const validateMessage = (message: Message): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    text: Joi.string().required(),
    
  });

  return schema.validate(message);
};
