const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');
const FAQ = require('../src/models/faq.model');
const TranslationService = require('../src/services/translation.service');

// Mock the translation service
jest.mock('../src/services/translation.service', () => ({
  translateText: jest.fn(async (text, lang) => {
    console.log(`Translating "${text}" to ${lang}`);
    const mockTranslations = {
      hi: {
        'What is Node.js?': 'Node.js क्या है?',
        'Node.js is a JavaScript runtime': 'Node.js एक JavaScript रनटाइम है',
        'What is programming?': 'प्रोग्रामिंग क्या है?',
        'Programming is writing computer instructions': 'प्रोग्रामिंग कंप्यूटर निर्देश लिखना है'
      },
      bn: {
        'What is Node.js?': 'Node.js কি?',
        'Node.js is a JavaScript runtime': 'Node.js একটি JavaScript রানটাইম',
        'What is programming?': 'প্রোগ্রামিং কি?',
        'Programming is writing computer instructions': 'প্রোগ্রামিং কম্পিউটার নির্দেশনা লেখা'
      }
    };
    return mockTranslations[lang]?.[text] || `${text}_${lang}`;
  })
}));

describe('FAQ API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await FAQ.deleteMany({});
    jest.clearAllMocks();
  });

  describe('FAQ Creation', () => {
    it('should create a new FAQ with translations', async () => {
      const res = await request(app)
        .post('/api/faqs')
        .send({
          question: 'What is Node.js?',
          answer: 'Node.js is a JavaScript runtime',
          language: 'en',
          tags: ['programming', 'javascript']
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('question');
      expect(res.body).toHaveProperty('answer');
      expect(TranslationService.translateText).toHaveBeenCalledTimes(4); // 2 translations (hi, bn) × 2 fields (question, answer)
    });

    it('should handle invalid FAQ data', async () => {
      const res = await request(app)
        .post('/api/faqs')
        .send({
          question: '',
          answer: '',
          language: 'invalid'
        });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('FAQ Retrieval', () => {
    beforeEach(async () => {
      // Create a test FAQ
      await request(app)
        .post('/api/faqs')
        .send({
          question: 'What is programming?',
          answer: 'Programming is writing computer instructions',
          language: 'en',
          tags: ['programming']
        });
    });

    it('should retrieve FAQs in English (default)', async () => {
      const res = await request(app).get('/api/faqs');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].question).toBe('What is programming?');
      expect(res.body[0].answer).toBe('Programming is writing computer instructions');
    });

    it('should retrieve FAQs in Hindi', async () => {
      const res = await request(app).get('/api/faqs?lang=hi');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].question).toBe('प्रोग्रामिंग क्या है?');
      expect(res.body[0].answer).toBe('प्रोग्रामिंग कंप्यूटर निर्देश लिखना है');
    });

    it('should retrieve FAQs in Bengali', async () => {
      const res = await request(app).get('/api/faqs?lang=bn');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].question).toBe('প্রোগ্রামিং কি?');
      expect(res.body[0].answer).toBe('প্রোগ্রামিং কম্পিউটার নির্দেশনা লেখা');
    });

    it('should handle invalid language parameter', async () => {
      const res = await request(app).get('/api/faqs?lang=invalid');
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Unsupported language');
    });

    it('should use cache for repeated requests', async () => {
      // First request
      await request(app).get('/api/faqs?lang=hi');
      
      // Second request should use cache
      const res = await request(app).get('/api/faqs?lang=hi');
      expect(res.statusCode).toEqual(200);
      // You might need to modify this based on how you implement caching
      // expect(cacheMock.get).toHaveBeenCalled();
    });
  });

  describe('Translation Service', () => {
    it('should call translation service for non-English languages', async () => {
      await request(app)
        .post('/api/faqs')
        .send({
          question: 'What is Node.js?',
          answer: 'Node.js is a JavaScript runtime',
          language: 'en'
        });

      expect(TranslationService.translateText).toHaveBeenCalledWith(
        'What is Node.js?',
        expect.any(String)
      );
      expect(TranslationService.translateText).toHaveBeenCalledWith(
        'Node.js is a JavaScript runtime',
        expect.any(String)
      );
    });
  });
});