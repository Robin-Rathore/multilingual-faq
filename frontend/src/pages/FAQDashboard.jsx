import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`https://multilingual-faq-1.onrender.com/api/faqs?lang=${language}`);
        if (Array.isArray(response.data)) {
          setFaqs(response.data);
          setError(null); // Clear any previous errors
        } else {
          console.error('Expected an array but got:', response.data);
          setError('Invalid data format received from the server.');
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setError('Failed to fetch FAQs. Please try again later.');
      }
    };

    fetchFAQs();
  }, [language]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FAQ Dashboard</h1>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="form-select border-primary"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : Array.isArray(faqs) && faqs.length > 0 ? (
        faqs.map((faq) => (
          <div 
            key={faq._id} 
            className="mb-4 p-4 border rounded hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg text-gray-800">
              {faq.translations?.[language]?.question || faq.question}
            </h3>
            <p className="text-gray-600">
              {faq.translations?.[language]?.answer || faq.answer}
            </p>
            {faq.tags && (
              <div className="mt-2 flex space-x-2">
                {faq.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  );
};

export default FAQDashboard;