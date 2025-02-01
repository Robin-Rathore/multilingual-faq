const express = require('express');
const FAQController = require('../controllers/faq.controller');
const languageMiddleware = require('../middleware/language.middleware');
const { validateFAQ } = require('../utils/validation');

const router = express.Router();

router.post('/faqs', validateFAQ, languageMiddleware, FAQController.createFAQ);
router.get('/faqs', languageMiddleware, FAQController.getFAQs);
router.delete('/faqs/:id', FAQController.deleteFAQ);

module.exports = router;