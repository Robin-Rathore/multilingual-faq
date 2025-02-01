const FAQ = require('../models/faq.model');
const TranslationService = require('../services/translation.service');

const FAQController = {
  async createFAQ(req, res) {
    try {
      const { question, answer, language, tags } = req.body;
      const faq = new FAQ({ question, answer, language, tags });
      await faq.save();
      res.status(201).json(faq);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getFAQs(req, res) {
    try {
      const { lang } = req.query;

      // Validate the language parameter
      const supportedLanguages = ['en', 'hi', 'bn', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pa']; // Add more as needed
      const targetLanguage = supportedLanguages.includes(lang) ? lang : 'en'; // Default to 'en' if invalid

      const faqs = await FAQ.find({});
      const translatedFAQs = await Promise.all(
        faqs.map(async (faq) => {
          if (targetLanguage !== faq.language) {
            return await TranslationService.translateFAQ(faq, targetLanguage);
          }
          return faq;
        })
      );

      res.status(200).json(translatedFAQs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
  },
};

module.exports = FAQController;