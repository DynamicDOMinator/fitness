"use client";
import { useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';
export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { isArabic } = useLanguage();

  const faqs = [
    {
      id: 1,
      question: isArabic ? "ما هي ساعات عمل الصالة الرياضية؟" : "What are the gym operating hours?",
      answer: isArabic 
        ? "صالتنا الرياضية مفتوحة على مدار 24 ساعة للأعضاء الحاصلين على العضوية المميزة. الأعضاء العاديون يمكنهم الوصول للصالة من الساعة 5:00 صباحاً حتى 11:00 مساءً في أيام الأسبوع ومن 6:00 صباحاً حتى 10:00 مساءً في عطلة نهاية الأسبوع."
        : "Our gym is open 24/7 for members with premium access. Standard members can access the gym from 5:00 AM to 11:00 PM on weekdays and 6:00 AM to 10:00 PM on weekends.",
    },
    {
      id: 2,
      question: isArabic ? "هل تقدمون جلسات تدريب شخصية؟" : "Do you offer personal training sessions?",
      answer: isArabic
        ? "نعم، نقدم جلسات تدريب شخصية مع مدربين معتمدين. يمكنك حجز جلسات فردية أو تدريب جماعي صغير. اتصل بمكتب الاستقبال لجدولة استشارة والعثور على المدرب المثالي لأهدافك الرياضية."
        : "Yes, we offer personal training sessions with certified trainers. You can book one-on-one sessions or small group training. Contact our front desk to schedule a consultation and find the perfect trainer for your fitness goals.",
    },
    {
      id: 3,
      question: isArabic ? "ما هي الأجهزة المتوفرة في الصالة الرياضية؟" : "What equipment is available at the gym?",
      answer: isArabic
        ? "لدينا مجموعة كاملة من الأجهزة الحديثة بما في ذلك أجهزة الكارديو، والأوزان الحرة، وأجهزة المقاومة، ومناطق التدريب الوظيفي، والأجهزة المتخصصة لتمارين الكروس فيت والتدريب عالي الكثافة."
        : "We have a full range of modern equipment including cardio machines, free weights, resistance machines, functional training areas, and specialized equipment for CrossFit and HIIT workouts.",
    },
    {
      id: 4,
      question: isArabic ? "هل توجد حصص لياقة جماعية؟" : "Are there group fitness classes?",
      answer: isArabic
        ? "نقدم مجموعة متنوعة من حصص اللياقة الجماعية بما في ذلك اليوغا، والبيلاتس، والسبيننغ، والزومبا، والتدريب عالي الكثافة، وتدريب القوة. تحقق من جدولنا في مكتب الاستقبال أو على تطبيقنا المحمول لمواعيد الحصص والتوفر."
        : "We offer a variety of group fitness classes including yoga, pilates, spinning, zumba, HIIT, and strength training. Check our schedule at the front desk or on our mobile app for class times and availability.",
    },
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };


  return (
    <div className={`max-w-6xl mx-auto p-6 mt-20 ${isArabic ? 'rtl' : 'ltr'}`}>
      <h2 className={`text-4xl font-bold text-center text-red-500 mb-8 ${isArabic ? 'font-arabic flex justify-center items-center gap-2' : ''}`}>
        {" "}
        <span className="text-white"> {isArabic ? " الشائعة" : "Frequently Asked"}</span> {isArabic ? "الأسئلة" : "Questions"}
      </h2>
      <div dir={isArabic ? 'rtl' : 'ltr'} className="flex flex-col gap-5">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow transition-all duration-300 ${
              openFAQ === faq.id ? "shadow-lg shadow-red-500/20" : ""
            }`}
            style={{
              backgroundSize: "400% 400%",
            }}
          >
            <div
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => toggleFAQ(faq.id)}
            >
              <h6 className={`text-white text-lg font-bold pr-4 ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
                {faq.question}
              </h6>
              <button className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xl transition-all duration-300">
                {openFAQ === faq.id ? "−" : "+"}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openFAQ === faq.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6">
                <div className="border-t border-red-500/30 pt-4">
                  <p className={`text-white text-base leading-relaxed ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
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
