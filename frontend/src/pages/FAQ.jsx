import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const FAQS = [
  { question: 'What is the process of buying a home?', answer: 'The process involves pre-approval, house hunting, making an offer, inspection, appraisal, and closing. Our agents guide you through every step.' },
  { question: 'How do I determine my home\'s value?', answer: 'We offer a complimentary valuation based on current market data, recent comps, and your home\'s unique features.' },
  { question: 'What are the typical closing costs?', answer: 'Closing costs typically range from 2% to 5% of the purchase price and include loan origination fees, appraisal fees, title searches, and more.' }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4">
      <Helmet><title>FAQ | KeyStone Homes</title></Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-white mb-12 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glassmorphism rounded-xl overflow-hidden">
              <button 
                className="w-full text-left p-6 text-xl font-semibold text-white flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {faq.question}
                <span className="text-gold-500">{openIdx === i ? '−' : '+'}</span>
              </button>
              {openIdx === i && (
                <div className="p-6 pt-0 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
