const axios = require('axios');

class TranslationService {
  constructor() {
    this.apiUrl = 'https://api.mymemory.translated.net/get';
    this.isMockMode = process.env.NODE_ENV === 'test';
  }

  getMockTranslation(text, targetLanguage) {
    const mockTranslations = {
      hi: {
        'Hello': 'नमस्ते',
        'How are you?': 'आप कैसे हैं?',
        'Welcome': 'स्वागत है'
      },
      bn: {
        'Hello': 'হ্যালো',
        'How are you?': 'কেমন আছেন?',
        'Welcome': 'স্বাগতম'
      },
      es: {
        'Hello': 'Hola',
        'How are you?': '¿Cómo estás?',
        'Welcome': 'Bienvenido'
      },
      fr: {
        'Hello': 'Bonjour',
        'How are you?': 'Comment ça va?',
        'Welcome': 'Bienvenue'
      },
      // Add more languages as needed
    };

    return mockTranslations[targetLanguage]?.[text] || `${text}_${targetLanguage}`;
  }

  async translateText(text, sourceLanguage, targetLanguage) {
    // Check if source and target languages are the same
    if (sourceLanguage === targetLanguage) {
      console.log('Error: Source and target languages must be distinct.');
      return text; // Return the original text if languages are the same
    }

    if (this.isMockMode) {
      return this.getMockTranslation(text, targetLanguage);
    }
    
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: text,
          langpair: `${sourceLanguage}|${targetLanguage}`
        }
      });

      // Log the entire response to inspect its structure
      console.log('API Response:', response.data);

      // Check if translated text exists
      if (response.data && response.data.responseData && response.data.responseData.translatedText) {
        return response.data.responseData.translatedText;
      } else {
        console.log('No translation found');
        return text; // Return the original text if translation is not found
      }
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  async translateFAQ(faq, targetLanguage) {
    if (targetLanguage === faq.language) return faq;

    try {
      const translatedQuestion = await this.translateText(faq.question, faq.language, targetLanguage);
      const translatedAnswer = await this.translateText(faq.answer, faq.language, targetLanguage);

      return {
        ...faq,
        translations: {
          ...faq.translations,
          [targetLanguage]: {
            question: translatedQuestion,
            answer: translatedAnswer
          }
        }
      };
    } catch (error) {
      console.error('FAQ translation error:', error);
      return faq;
    }
  }
}

module.exports = new TranslationService();
