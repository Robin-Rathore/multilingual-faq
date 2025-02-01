import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

const AdminDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('https://multilingual-faq-1.onrender.com/api/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs', error);
      }
    };
    fetchFAQs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://multilingual-faq-1.onrender.com/api/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq._id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">Admin Dashboard</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div 
            key={faq._id} 
            className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.language} FAQ</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setSelectedFAQ(faq)}
                className="text-blue-500 hover:text-blue-700"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleDelete(faq._id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;