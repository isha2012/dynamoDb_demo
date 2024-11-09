import Joi from 'joi';

export const userSchema = Joi.object({
    userId: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.empty': 'User ID cannot be empty',
            'string.guid': 'User ID must be a valid UUIDv4',
            'any.required': 'User ID is required',
        }),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Username cannot be empty',
            'string.alphanum': 'Username must only contain alphanumeric characters',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must be less than or equal to 30 characters long',
            'any.required': 'Username is required',
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required',
        }),

    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            'string.empty': 'Phone number cannot be empty',
            'string.pattern.base': 'Phone number must be between 10 and 15 digits',
            'any.required': 'Phone number is required',
        }),
});
