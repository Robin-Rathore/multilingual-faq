const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  translations: {
    type: Map,
    of: new mongoose.Schema({
      question: String,
      answer: String
    }, { _id: false })
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'bn', 'es', 'fr', 'de', 'it', 'ja', 'ja', 'ko', 'pa'], // Add more languages as needed
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

FAQSchema.methods.getTranslatedQuestion = function (lang) {
  return this.translations.get(lang)?.question || this.question;  // Default to original question if translation not found
};

FAQSchema.methods.getTranslatedAnswer = function (lang) {
  return this.translations.get(lang)?.answer || this.answer;  // Default to original answer if translation not found
};

module.exports = mongoose.model('FAQ', FAQSchema);