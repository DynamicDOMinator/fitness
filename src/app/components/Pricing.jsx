"use client";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
// Check and Cross SVG Icons

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Close Icon for Modal
const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Upload Icon
const UploadIcon = () => (
  <svg
    className="w-8 h-8 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export default function Pricing() {
  const { isArabic } = useLanguage();

  // State to track selected period for each plan
  const [selectedPeriods, setSelectedPeriods] = useState({});

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Period options with discounts
  const periodOptions = [
    { value: 1, label: isArabic ? "شهر واحد" : "1 Month", discount: 0 },
    { value: 3, label: isArabic ? "3 أشهر" : "3 Months", discount: 0.1 }, // 10% discount
    { value: 6, label: isArabic ? "6 أشهر" : "6 Months", discount: 0.2 }, // 20% discount
  ];
  // All possible features for comparison
  const allFeatures = [
    "Customized Diet & medical lab Results",
    "Change diet & Exercise plan when needed",
    "30mins onboarding zoom",
    "Whatsapp weekly support",
    "mohamed personal Whatsapp - 24 hours support",
    "Video Exercise form correction",
    "Exercise sheet to track progress",
    "2x 45mins zoom check-in / month",
    "1 live workout session / month",
  ];

  // Arabic translations for features
  const featureTranslations = {
    "Customized Diet & medical lab Results":
      "نظام غذائي مخصص ونتائج التحاليل الطبية",
    "Change diet & Exercise plan when needed":
      "تغيير النظام الغذائي وخطة التمارين عند الحاجة",
    "30mins onboarding zoom": "جلسة تعريفية 30 دقيقة عبر زووم",
    "Whatsapp weekly support": "دعم أسبوعي عبر واتساب",
    "mohamed personal Whatsapp - 24 hours support":
      "واتساب محمد الشخصي - دعم 24 ساعة",
    "Video Exercise form correction": "تصحيح شكل التمارين بالفيديو",
    "Exercise sheet to track progress": "ورقة تمارين لتتبع التقدم",
    "2x 45mins zoom check-in / month": "جلستين متابعة 45 دقيقة شهرياً عبر زووم",
    "1 live workout session / month": "جلسة تمارين مباشرة واحدة شهرياً",
    "1x45mins zoom check-in / month": "جلسة متابعة 45 دقيقة شهرياً عبر زووم",
  };

  // Function to calculate price based on selected period
  const calculatePrice = (basePrice, planTitle) => {
    const selectedPeriod = selectedPeriods[planTitle] || 1;
    const periodOption = periodOptions.find(
      (option) => option.value === selectedPeriod
    );
    const discountedPrice = basePrice * (1 - periodOption.discount);
    const totalPrice = discountedPrice * selectedPeriod;

    return {
      monthlyPrice: Math.round(discountedPrice),
      totalPrice: Math.round(totalPrice),
      period: selectedPeriod,
      discount: periodOption.discount,
    };
  };

  // Function to handle period selection
  const handlePeriodChange = (planTitle, period) => {
    setSelectedPeriods((prev) => ({
      ...prev,
      [planTitle]: parseInt(period),
    }));
  };

  // Function to handle Get Started button click
  const handleGetStarted = (planTitle, basePrice) => {
    const priceInfo = calculatePrice(basePrice, planTitle);
    setSelectedPlan({
      title: planTitle,
      basePrice,
      ...priceInfo,
    });
    setIsModalOpen(true);
    setSelectedPaymentMethod("");
    setUploadedFile(null);
  };

  // Function to handle duration change in modal
  const handleModalDurationChange = (newPeriod) => {
    if (selectedPlan) {
      const newPeriodInt = parseInt(newPeriod);

      // Update the selected periods state
      setSelectedPeriods((prev) => ({
        ...prev,
        [selectedPlan.title]: newPeriodInt,
      }));

      // Calculate price with the new period directly
      const periodOption = periodOptions.find(
        (option) => option.value === newPeriodInt
      );
      const discountedPrice =
        selectedPlan.basePrice * (1 - periodOption.discount);
      const totalPrice = discountedPrice * newPeriodInt;

      const newPriceInfo = {
        monthlyPrice: Math.round(discountedPrice),
        totalPrice: Math.round(totalPrice),
        period: newPeriodInt,
        discount: periodOption.discount,
      };

      setSelectedPlan((prev) => ({
        ...prev,
        ...newPriceInfo,
      }));
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload your payment receipt");
      return;
    }

    // Here you would typically send the data to your backend
    alert(
      `Payment submitted successfully!\nPlan: ${selectedPlan.title}\nAmount: $${selectedPlan.totalPrice}\nMethod: ${selectedPaymentMethod}\nReceipt: ${uploadedFile.name}`
    );
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ring-1 ring-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {isArabic ? "أكمل عملية الشراء" : "Complete Your Purchase"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Plan Details */}
              <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {selectedPlan?.title}
                </h4>

                {/* Duration Selection in Modal */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {isArabic ? "تغيير المدة:" : "Change Duration:"}
                  </label>
                  <select
                    value={selectedPlan?.period || 1}
                    onChange={(e) => handleModalDurationChange(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                  >
                    {periodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {option.discount > 0 &&
                          `(${Math.round(option.discount * 100)}% ${
                            isArabic ? "خصم" : "off"
                          })`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {isArabic ? "السعر الشهري:" : "Monthly Price:"}
                    </span>
                    <span className="text-white font-semibold">
                      ${selectedPlan?.monthlyPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {isArabic ? "المدة:" : "Duration:"}
                    </span>
                    <span className="text-white font-semibold">
                      {selectedPlan?.period} {isArabic ? "شهر" : "month(s)"}
                    </span>
                  </div>
                  {selectedPlan?.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {isArabic ? "الخصم:" : "Discount:"}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {Math.round(selectedPlan.discount * 100)}%{" "}
                        {isArabic ? "خصم" : "off"}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">
                        {isArabic ? "المبلغ الإجمالي:" : "Total Amount:"}
                      </span>
                      <span className="text-[#fd5747]">
                        ${selectedPlan?.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h5 className="text-white font-semibold mb-3">
                  {isArabic ? "اختر طريقة الدفع" : "Choose Payment Method"}
                </h5>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/10 hover:border-[#fd5747]/30 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="vodafone-cash"
                      checked={selectedPaymentMethod === "vodafone-cash"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#fd5747] bg-gray-700 border-gray-600 focus:ring-[#fd5747] focus:ring-2"
                    />
                    <img
                      src="/vodafone.png"
                      alt="Vodafone Cash"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <span className="text-white">Vodafone Cash</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/10 hover:border-[#fd5747]/30 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="instapay"
                      checked={selectedPaymentMethod === "instapay"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#fd5747] bg-gray-700 border-gray-600 focus:ring-[#fd5747] focus:ring-2"
                    />
                    <img
                      src="/instapay.png"
                      alt="InstaPay"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <span className="text-white">InstaPay</span>
                  </label>
                </div>
              </div>

              {/* Payment Instructions */}
              {selectedPaymentMethod && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                  <h6 className="text-blue-400 font-semibold mb-2">
                    {isArabic ? "تعليمات الدفع" : "Payment Instructions"}
                  </h6>
                  {selectedPaymentMethod === "vodafone-cash" && (
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        •{" "}
                        {isArabic
                          ? `أرسل $${selectedPlan?.totalPrice} إلى:`
                          : `Send $${selectedPlan?.totalPrice} to:`}{" "}
                        <span className="text-white font-semibold">
                          01018294811{" "}
                        </span>
                      </p>

                      <p>
                        •{" "}
                        {isArabic
                          ? "ارفع إيصال الدفع أدناه"
                          : "Upload the payment receipt below"}
                      </p>
                    </div>
                  )}
                  {selectedPaymentMethod === "instapay" && (
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        •{" "}
                        {isArabic
                          ? `أرسل $${selectedPlan?.totalPrice} إلى:`
                          : `Send $${selectedPlan?.totalPrice} to:`}{" "}
                        <span className="text-white font-semibold">
                          moe_2@instapay
                        </span>
                      </p>

                      <p>
                        •{" "}
                        {isArabic
                          ? "ارفع إيصال الدفع أدناه"
                          : "Upload the payment receipt below"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* File Upload */}
              <div>
                <h5 className="text-white font-semibold mb-3">
                  {isArabic ? "ارفع إيصال الدفع" : "Upload Payment Receipt"}
                </h5>
                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center hover:border-[#fd5747]/50 transition-colors">
                  <input
                    type="file"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <UploadIcon />
                    <p className="mt-2 text-sm text-gray-300">
                      {uploadedFile ? (
                        <span className="text-green-400 font-semibold">
                          {uploadedFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-white font-semibold">
                            {isArabic ? "اضغط للرفع" : "Click to upload"}
                          </span>{" "}
                          {isArabic ? "أو اسحب وأفلت" : "or drag and drop"}
                          <br />
                          <span className="text-xs text-gray-400">
                            {isArabic
                              ? "PNG, JPG, PDF حتى 10 ميجابايت"
                              : "PNG, JPG, PDF up to 10MB"}
                          </span>
                        </>
                      )}
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedPaymentMethod || !uploadedFile}
                className="w-full bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-3 rounded-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isArabic ? "إرسال الدفع" : "Submit Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center tracking-tight">
            <span className={`text-white ${isArabic? 'font-bold font-arabic' : 'font-bold font-bebas'}`}>
              {" "}
              {isArabic ? "خطط " : "Pricing"}{" "}
            </span>{" "}
            <span className={`text-red-500 ${isArabic? 'font-bold font-arabic' : 'font-bold font-bebas'}`}>
              {" "}
              {isArabic ? "الأسعار" : "Plans"}{" "}
            </span>
          </h2>

          <div className={`mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${isArabic ? 'font-arabic' : 'font-poppins'} `}>
            {/* Regular - Diet only */}
            <div
              className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
                minHeight: "700px",
              }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Regular - Diet only
                  </h3>
                </div>

                {/* Period Selection */}
                <div className="mt-3">
                  <select
                    dir={isArabic ? "rtl" : "ltr"}
                    value={selectedPeriods["Regular - Diet only"] || 1}
                    onChange={(e) =>
                      handlePeriodChange("Regular - Diet only", e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                  >
                    {periodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {option.discount > 0 &&
                          `(${Math.round(option.discount * 100)}% off)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-baseline"
                  >
                    <span
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      ${calculatePrice(49, "Regular - Diet only").monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهر" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(49, "Regular - Diet only").period > 1 && (
                    <div className="mt-1">
                      <span className="text-sm text-gray-300">
                        Total: $
                        {calculatePrice(49, "Regular - Diet only").totalPrice}{" "}
                        for {calculatePrice(49, "Regular - Diet only").period}{" "}
                        months
                      </span>
                      {calculatePrice(49, "Regular - Diet only").discount >
                        0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(49, "Regular - Diet only").discount *
                              100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p
                  dir={isArabic ? "rtl" : "ltr"}
                  className="mt-3 text-gray-300 text-sm"
                >
                  {isArabic
                    ? "خطة تغذية شخصية ومدروسة لتحقيق النتائج."
                    : "Result driven and Personalized nutrition plan."}
                </p>
              </div>

              {/* Divider accent */}
              <div
                className="mt-12 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Features */}
              <div className="flex-1 flex flex-col justify-between">
                <ul className="px-6 pt-4 space-y-2 text-gray-200 text-sm ">
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Customized Diet & medical lab Results"
                          ]
                        : "Customized Diet & medical lab Results"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Change diet & Exercise plan when needed"
                          ]
                        : "Change diet & Exercise plan when needed"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["30mins onboarding zoom"]
                        : "30mins onboarding zoom"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Whatsapp weekly support"]
                        : "Whatsapp weekly support"}
                    </span>
                  </li>

                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      {isArabic
                        ? featureTranslations["Video Exercise form correction"]
                        : "Video Exercise form correction"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      {isArabic
                        ? featureTranslations[
                            "Exercise sheet to track progress"
                          ]
                        : "Exercise sheet to track progress"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      {isArabic
                        ? featureTranslations["2x 45mins zoom check-in / month"]
                        : "2x 45mins zoom check-in / month"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      {isArabic
                        ? featureTranslations["1 live workout session / month"]
                        : "1 live workout session / month"}
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 flex-shrink-0">
                <button
                  onClick={() => handleGetStarted("Regular - Diet only", 49)}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                >
                  {isArabic ? "ابدأ الآن" : "Get Started"}
                </button>
              </div>

              {/* Bottom accent radius strip - now animated */}
              <div
                className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              />
            </div>

            {/* Regular - Diet & Exercise */}
            <div
              className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
                minHeight: "700px",
              }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Regular - Diet & Exercise
                  </h3>
                </div>

                {/* Period Selection */}
                <div className="mt-3">
                  <select
                    dir={isArabic ? "rtl" : "ltr"}
                    value={selectedPeriods["Regular - Diet & Exercise"] || 1}
                    onChange={(e) =>
                      handlePeriodChange(
                        "Regular - Diet & Exercise",
                        e.target.value
                      )
                    }
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                  >
                    {periodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {option.discount > 0 &&
                          `(${Math.round(option.discount * 100)}% off)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-baseline"
                  >
                    <span
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      $
                      {
                        calculatePrice(69, "Regular - Diet & Exercise")
                          .monthlyPrice
                      }
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهر" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(69, "Regular - Diet & Exercise").period >
                    1 && (
                    <div className="mt-1">
                      <span className="text-sm text-gray-300">
                        Total: $
                        {
                          calculatePrice(69, "Regular - Diet & Exercise")
                            .totalPrice
                        }{" "}
                        for{" "}
                        {calculatePrice(69, "Regular - Diet & Exercise").period}{" "}
                        months
                      </span>
                      {calculatePrice(69, "Regular - Diet & Exercise")
                        .discount > 0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(69, "Regular - Diet & Exercise")
                              .discount * 100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p
                  dir={isArabic ? "rtl" : "ltr"}
                  className="mt-3 text-gray-300 text-sm"
                >
                  {isArabic
                    ? "برامج تغذية وتمارين شخصية ومدروسة لتحقيق النتائج."
                    : "Result driven and Personalized nutrition & workout plan."}
                </p>
              </div>

              {/* Divider accent */}
              <div
                className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Features */}
              <div className="flex-1 flex flex-col justify-between">
                <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm max-h-96 overflow-y-auto">
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Customized Diet & medical lab Results"
                          ]
                        : "Customized Diet & medical lab Results"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Change diet & Exercise plan when needed"
                          ]
                        : "Change diet & Exercise plan when needed"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["30mins onboarding zoom"]
                        : "30mins onboarding zoom"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Whatsapp weekly support"]
                        : "Whatsapp weekly support"}
                    </span>
                  </li>

                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Video Exercise form correction"]
                        : "Video Exercise form correction"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Exercise sheet to track progress"
                          ]
                        : "Exercise sheet to track progress"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      1x45mins zoom check-in / month
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      1 live workout session / month
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 flex-shrink-0">
                <button
                  onClick={() =>
                    handleGetStarted("Regular - Diet & Exercise", 69)
                  }
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Get Started
                </button>
              </div>

              {/* Bottom accent radius strip - now animated */}
              <div
                className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              />
            </div>

            {/* Advanced coaching */}
            <div
              className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-[#fd5747]/25 via-red-500/20 to-red-600/25 ring-2 ring-gradient-to-r ring-[#fd5747]/60 animate-gradient-x"
              style={{
                backgroundSize: "400% 400%",
                minHeight: "700px",
              }}
            >
              {/* Popular badge */}
              <div className="absolute -top-1  left-1/2 transform -translate-x-1/2 z-10">
                <span
                  className="bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white text-xs font-bold px-4 py-1 rounded-full animate-gradient-x shadow-lg"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Most Popular
                </span>
              </div>

              {/* Card header */}
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Advanced coaching
                  </h3>
                </div>

                {/* Period Selection */}
                <div className="mt-3">
                  <select
                    dir={isArabic ? "rtl" : "ltr"}
                    value={selectedPeriods["Advanced coaching"] || 1}
                    onChange={(e) =>
                      handlePeriodChange("Advanced coaching", e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                  >
                    {periodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {option.discount > 0 &&
                          `(${Math.round(option.discount * 100)}% off)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-baseline"
                  >
                    <span
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      ${calculatePrice(129, "Advanced coaching").monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهر" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(129, "Advanced coaching").period > 1 && (
                    <div className="mt-1">
                      <span className="text-sm text-gray-300">
                        Total: $
                        {calculatePrice(129, "Advanced coaching").totalPrice}{" "}
                        for {calculatePrice(129, "Advanced coaching").period}{" "}
                        months
                      </span>
                      {calculatePrice(129, "Advanced coaching").discount >
                        0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(129, "Advanced coaching").discount *
                              100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p
                  dir={isArabic ? "rtl" : "ltr"}
                  className="mt-3 text-gray-300 text-sm"
                >
                  {isArabic
                    ? "برامج شخصية مدروسة + اجتماع زووم مع محمد"
                    : "Result Driven personalized programs + zoom meeting with mohamed"}
                </p>
              </div>

              {/* Divider accent */}
              <div
                className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Features */}
              <div className="flex-1 flex flex-col justify-between">
                <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm max-h-96 overflow-y-auto">
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Customized Diet & medical lab Results"
                          ]
                        : "Customized Diet & medical lab Results"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Change diet & Exercise plan when needed"
                          ]
                        : "Change diet & Exercise plan when needed"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["30mins onboarding zoom"]
                        : "30mins onboarding zoom"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Whatsapp weekly support"]
                        : "Whatsapp weekly support"}
                    </span>
                  </li>

                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Video Exercise form correction"]
                        : "Video Exercise form correction"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Exercise sheet to track progress"
                          ]
                        : "Exercise sheet to track progress"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["1x45mins zoom check-in / month"]
                        : "1x45mins zoom check-in / month"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CrossIcon />
                    </span>
                    <span className="text-gray-500 line-through">
                      1 live workout session / month
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 flex-shrink-0">
                <button
                  onClick={() => handleGetStarted("Advanced coaching", 129)}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Get Started
                </button>
              </div>

              {/* Bottom accent radius strip - now animated */}
              <div
                className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              />
            </div>

            {/* Elite athlete */}
            <div
              className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
                minHeight: "700px",
              }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Elite athlete
                  </h3>
                </div>

                {/* Period Selection */}
                <div className="mt-3">
                  <select
                    dir={isArabic ? "rtl" : "ltr"}
                    value={selectedPeriods["Elite athlete"] || 1}
                    onChange={(e) =>
                      handlePeriodChange("Elite athlete", e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                  >
                    {periodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {option.discount > 0 &&
                          `(${Math.round(option.discount * 100)}% off)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="mt-3">
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-baseline"
                  >
                    <span
                      className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      ${calculatePrice(199, "Elite athlete").monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهر" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(199, "Elite athlete").period > 1 && (
                    <div className="mt-1">
                      <span className="text-sm text-gray-300">
                        Total: $
                        {calculatePrice(199, "Elite athlete").totalPrice} for{" "}
                        {calculatePrice(199, "Elite athlete").period} months
                      </span>
                      {calculatePrice(199, "Elite athlete").discount > 0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(199, "Elite athlete").discount * 100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <p
                  dir={isArabic ? "rtl" : "ltr"}
                  className="mt-3 text-gray-300 text-sm"
                >
                  {isArabic
                    ? "برامج شخصية + العمل مباشرة مع محمد على عقليتك."
                    : "Personalized programs + Work Directly with mohamed on your mindset."}
                </p>
              </div>

              {/* Divider accent */}
              <div
                className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Features */}
              <div className="flex-1 flex flex-col justify-between">
                <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm  ">
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Customized Diet & medical lab Results"
                          ]
                        : "Customized Diet & medical lab Results"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Change diet & Exercise plan when needed"
                          ]
                        : "Change diet & Exercise plan when needed"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["30mins onboarding zoom"]
                        : "30mins onboarding zoom"}
                    </span>
                  </li>

                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "mohamed personal Whatsapp - 24 hours support"
                          ]
                        : "Whatsapp - mohamed personal Whatsapp - 24 hours support"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["Video Exercise form correction"]
                        : "Video Exercise form correction"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations[
                            "Exercise sheet to track progress"
                          ]
                        : "Exercise sheet to track progress"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["2x 45mins zoom check-in / month"]
                        : "2x 45mins zoom check-in / month"}
                    </span>
                  </li>
                  <li
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-gray-200">
                      {isArabic
                        ? featureTranslations["1 live workout session / month"]
                        : "1 live workout session / month"}
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 flex-shrink-0">
                <button
                  onClick={() => handleGetStarted("Elite athlete", 199)}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                >
                  Get Started
                </button>
              </div>

              {/* Bottom accent radius strip - now animated */}
              <div
                className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
