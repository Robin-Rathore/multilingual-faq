const express = require('express');
const FAQController = require('../controllers/faq.controller');
const languageMiddleware = require('../middleware/language.middleware');
const { validateFAQ } = require('../utils/validation');

const router = express.Router();

router.post('/faqs', validateFAQ, languageMiddleware, FAQController.createFAQ);
router.get('/faqs', languageMiddleware, FAQController.getFAQs);
router.delete('/faqs/:id', async (req, res) => {
    try {
      await FAQ.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;