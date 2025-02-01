import React, { useState } from 'react';
import axios from 'axios';

const FAQCreate = () => {
  const [faq, setFAQ] = useState({
    question: '',
    answer: '',
    language: 'en',
    tags: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faq.question || !faq.answer) {
      alert('Question and Answer are required.');
      return;
    }
  
    // Clean tags
    const cleanedTags = faq.tags.map(tag => tag.trim()).filter(tag => tag !== '');
    
    const faqData = {
      question: faq.question,     // Send as string
      answer: faq.answer,         // Send as string
      language: faq.language,
      tags: cleanedTags
    };
  
    setIsSubmitting(true);
    try {
      await axios.post('https://multilingual-faq-1.onrender.com/api/faqs', faqData);
      alert('FAQ Created Successfully!');
      setFAQ({ question: '', answer: '', language: 'en', tags: [] });
    } catch (error) {
      console.error('FAQ Creation Failed', error.response?.data || error);
      alert('Failed to create FAQ: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">Create New FAQ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Question</label>
          <input
            type="text"
            value={faq.question}
            onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
            className="w-full border-primary rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Answer</label>
          <textarea
            value={faq.answer}
            onChange={(e) => setFAQ({ ...faq, answer: e.target.value })}
            className="w-full border-primary rounded-md"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Language</label>
          <select
            value={faq.language}
            onChange={(e) => setFAQ({ ...faq, language: e.target.value })}
            className="w-full border-primary rounded-md"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            value={faq.tags.join(', ')} // Display tags as comma-separated
            onChange={(e) => setFAQ({ ...faq, tags: e.target.value.split(',').map(tag => tag.trim()) })}
            className="w-full border-primary rounded-md"
            placeholder="programming, nodejs, backend"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Creating FAQ...' : 'Create FAQ'}
        </button>
      </form>
    </div>
  );
};

export default FAQCreate;
