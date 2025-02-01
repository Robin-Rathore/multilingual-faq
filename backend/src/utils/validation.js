const Joi = require('joi');

const validateFAQ = (req, res, next) => {
  const schema = Joi.object({
    question: Joi.string().required().min(5).max(500),
    answer: Joi.string().required().min(10),
    language: Joi.string().valid('en', 'hi', 'bn', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pa').default('en'),
    tags: Joi.array().items(Joi.string())
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation Failed',
      details: error.details[0].message 
    });
  }

  next();
};

module.exports = { validateFAQ };