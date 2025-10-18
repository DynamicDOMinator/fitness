"use client";
import { useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';
export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { isArabic } = useLanguage();

  const faqs = [
    {
      id: 1,
      question: isArabic ? "ما الذي يجعل تدريبك مختلفاً عن الآخرين؟" : "What makes your coaching different from others?",
      answer: isArabic 
        ? "نحن نتعمق في كل جانب من جوانب حياتك للتأكد من حصولك على التحول الذي تحتاجه. نركز على المساءلة وتدريب العقلية وبناء العادات المستدامة لضمان حصولك على نتائج طويلة المدى."
        : "We dive into every aspect of your life to make sure you get the transformation you need. We focus on accountability, mindset coaching, and sustainable habit-building to ensure you get long-term results.",
    },
    {
      id: 2,
      question: isArabic ? "متى سأرى النتائج؟" : "How soon will I see results?",
      answer: isArabic
        ? "هذا يعتمد على نقطة البداية وأهدافك. معظم العملاء يبدأون في ملاحظة تغييرات في الطاقة أو القوة أو المظهر خلال أول 2-3 أسابيع. النتائج طويلة المدى تتطلب جهداً مستمراً وسنعمل معاً للحفاظ على مسارك!"
        : "This depends on your starting point and goals. Most clients start noticing changes in energy, strength, or appearance within the first 2–3 weeks. Long-term results require consistent effort and we'll work together to keep you on track!",
    },
    {
      id: 3,
      question: isArabic ? "كيف سنتواصل؟" : "How will we communicate?",
      answer: isArabic
        ? "اعتماداً على الباقة التي تختارها، سنتواصل من خلال مكالمات فيديو للمتابعة أو واتساب فقط. أتأكد من البقاء على تواصل حتى تشعر دائماً بالدعم."
        : "Depending on the package you choose, we'll communicate through video check-ins or only WhatsApp. I make sure to stay connected so you always feel supported.",
    },
    {
      id: 4,
      question: isArabic ? "ماذا لو كان لدي جدول مزدحم أو أسافر كثيراً؟" : "What if I have a busy schedule or travel often?",
      answer: isArabic
        ? "هدفي هو جعل اللياقة البدنية تعمل من أجلك، وليس إضافة المزيد من التوتر إلى حياتك. برنامجنا مصمم ليناسب نمط حياتك، مهما كان مزدحماً أو غير متوقع. مع خطط تمرين يمكن القيام بها في أقل من 20-30 دقيقة وخيارات للتمارين المنزلية أو في الفندق عند السفر. بالإضافة إلى التواصل في الوقت الفعلي والمتابعة المنتظمة، يمكننا تعديل خطتك بسرعة لتتناسب مع جدولك."
        : "My goal is to make fitness work for you, not add more stress to your life. Our Program is designed to fit into your lifestyle, no matter how busy or unpredictable it may be. with workout plans that can be done in as little as 20-30 minutes and options for home or hotel workouts when you're traveling. Plus, real-time communication and regular check-ins, We can quickly adjust your plan to match your schedule.",
    },
    {
      id: 5,
      question: isArabic ? "كم من الوقت يستغرق البدء؟" : "How long does it take to start?",
      answer: isArabic
        ? "بعد أول جلسة تأهيل، يمكنك توقع تسليم برنامج التمرين والتغذية المخصص لك في أقل من 24 ساعة."
        : "After our first On-boarding you can expect your personalized workout and nutrition Program to be delivered to you in less than 24 hours.",
    },
    {
      id: 6,
      question: isArabic ? "كيف تبدو جلسة المتابعة النموذجية؟" : "What does a typical check-in look like?",
      answer: isArabic
        ? "خلال جلسات المتابعة، سنناقش تقدمك والتحديات والأسئلة. سأقدم ملاحظات وأعدل خطتك إذا لزم الأمر وأحافظ على تحفيزك!"
        : "During check-ins, we'll discuss your progress, challenges, and questions. I'll provide feedback, adjust your plan if needed, and keep you motivated!",
    },
    {
      id: 7,
      question: isArabic ? "هل يجب أن ألتزم ببرنامج طويل المدى؟" : "Do I have to commit to a long-term program?",
      answer: isArabic
        ? "ليس على الإطلاق! نحن نقدم خيارات شهرية حتى تتمكن من المتابعة طالما تشعر أنها تفيدك. ومع ذلك، معظم العملاء يرون نتائج تغير الحياة مع التزام لمدة 3 أشهر كحد أدنى."
        : "Not at all! we offer month-to-month options so you can continue as long as you feel it's benefiting you. That said, most clients see LIFE CHANGING RESULTS with a minimum 3-month commitment.",
    },
    {
      id: 8,
      question: isArabic ? "كم مرة سيتم تحديث خطتي؟" : "How often will my plan be updated?",
      answer: isArabic
        ? "يتم تحديث خطط التغذية كل 7-10 أيام إذا لزم الأمر، ويتم تحديث خطط التمرين شهرياً، ولكن إذا تغير تقدمك أو أهدافك، سنقوم بإجراء تعديلات أسرع للحفاظ على مسارك."
        : "Nutrition Plans are updated every 7-10 days if needed, workout plans are updated monthly, but if your progress or goals change, we'll make adjustments sooner to keep you on track.",
    },
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };


  return (
    <div className={`max-w-6xl mx-auto p-6 mt-20 ${isArabic ? 'rtl' : 'ltr'}`}>
      <h2 className={`text-4xl font-bold text-center text-red-500 mb-8 ${isArabic ? 'font-arabic flex justify-center items-center gap-2' : 'font-bebas'}`}>
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
