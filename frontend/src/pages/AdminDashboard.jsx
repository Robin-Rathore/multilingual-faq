import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, PencilIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const AdminDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://multilingual-faq-1.onrender.com/api/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs', error);
      } finally {
        setLoading(false);
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

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-white">FAQ Management Dashboard</h2>
        <p className="text-blue-100 mt-2">Manage and organize your multilingual FAQs</p>
      </div>

      {/* Search and Stats Section */}
      <div className="bg-white p-6 border-x shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Total FAQs</p>
              <p className="text-2xl font-bold text-blue-800">{faqs.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600">Languages</p>
              <p className="text-2xl font-bold text-green-800">
                {new Set(faqs.map(faq => faq.language)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ List Section */}
      <div className="bg-white p-6 rounded-b-lg border-x border-b shadow-md">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading FAQs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div 
                key={faq._id} 
                className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${faq.language === 'en' ? 'bg-blue-100 text-blue-800' :
                          faq.language === 'hi' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'}`}>
                        {faq.language.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => setSelectedFAQ(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(faq._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No FAQs match your search' : 'No FAQs available'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;