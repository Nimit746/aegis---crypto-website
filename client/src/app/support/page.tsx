"use client";

import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, FileText, ChevronRight, Search } from 'lucide-react';

export default function SupportPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: 'How does the AI prediction work?', answer: 'Our AI uses machine learning models trained on historical market data, social sentiment, and on-chain metrics to generate predictions.' },
    { id: 2, question: 'Is my data secure?', answer: 'Yes, all data is encrypted and we never store your private keys or exchange API secrets.' },
    { id: 3, question: 'How often is market data updated?', answer: 'Market data updates in real-time with WebSocket connections to major exchanges.' },
    { id: 4, question: 'Can I connect multiple exchanges?', answer: 'Yes, you can connect up to 5 different cryptocurrency exchanges to your account.' },
    { id: 5, question: 'What is the Fear & Greed Index?', answer: 'It measures market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed) based on multiple factors.' },
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <HelpCircle className="w-10 h-10 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-green-400">Support</h1>
              <p className="text-gray-400">Get help and learn about Aegis platform</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="glass-panel p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles or questions..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 hover:border-blue-500 border border-gray-800 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold">Contact Support</h3>
            </div>
            <p className="text-gray-400 mb-4">Get direct help from our support team via email</p>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
              Send Message
            </button>
          </div>
          
          <div className="glass-panel p-6 hover:border-green-500 border border-gray-800 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold">Live Chat</h3>
            </div>
            <p className="text-gray-400 mb-4">Chat with our support agents in real-time</p>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
              Start Chat
            </button>
          </div>
          
          <div className="glass-panel p-6 hover:border-purple-500 border border-gray-800 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold">Documentation</h3>
            </div>
            <p className="text-gray-400 mb-4">Read comprehensive guides and API documentation</p>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
              View Docs
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeFAQ === faq.id ? 'rotate-90' : ''}`} />
                </button>
                
                {activeFAQ === faq.id && (
                  <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-400">
          <p>Need more help? Email us at <span className="text-green-400">support@aegis-crypto.com</span></p>
          <p className="text-sm mt-2">Typically respond within 2 hours</p>
        </div>
      </div>
    </div>
  );
}




