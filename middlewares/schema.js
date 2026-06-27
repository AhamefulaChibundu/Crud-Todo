const Joi = require('joi');

const postValidator = Joi.object({
    task: Joi.string().min(3).max(100).required(),
    completed: Joi.boolean().default(false)
});

const patchValidator = Joi.object({
    task: Joi.string().min(3).max(100).optional(),
    completed: Joi.boolean().optional()
});

module.exports = {
    postValidator,
    patchValidator
};