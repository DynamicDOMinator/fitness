'use client';
import { useState } from 'react';

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What are the gym operating hours?",
      answer: "Our gym is open 24/7 for members with premium access. Standard members can access the gym from 5:00 AM to 11:00 PM on weekdays and 6:00 AM to 10:00 PM on weekends."
    },
    {
      id: 2,
      question: "Do you offer personal training sessions?",
      answer: "Yes, we offer personal training sessions with certified trainers. You can book one-on-one sessions or small group training. Contact our front desk to schedule a consultation and find the perfect trainer for your fitness goals."
    },
    {
      id: 3,
      question: "What equipment is available at the gym?",
      answer: "We have a full range of modern equipment including cardio machines, free weights, resistance machines, functional training areas, and specialized equipment for CrossFit and HIIT workouts."
    },
    {
      id: 4,
      question: "Are there group fitness classes?",
      answer: "We offer a variety of group fitness classes including yoga, pilates, spinning, zumba, HIIT, and strength training. Check our schedule at the front desk or on our mobile app for class times and availability."
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h2 className="text-4xl font-bold text-center text-red-500 mb-8">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`backdrop-blur-md bg-white/10 border-2 border-red-500 rounded-3xl transition-all duration-300 ${
              openFAQ === faq.id ? 'shadow-lg shadow-red-500/20' : ''
            } flex flex-col`}
          >
            <div
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => toggleFAQ(faq.id)}
            >
              <h6 className="text-red-500 text-xl font-bold pr-4">{faq.question}</h6>
              <button
                className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-xl transition-all duration-300"
              >
                {openFAQ === faq.id ? '−' : '+'}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <div className="border-t border-red-500/30 pt-4">
                  <p className="text-white text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
