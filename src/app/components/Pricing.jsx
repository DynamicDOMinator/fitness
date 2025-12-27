"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import axios from "axios";
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
  const [selectedPeriods, setSelectedPeriods] = useState({
    "Elite athlete": 3 // Default Elite athlete to 3 months
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Form state for customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: ''
  });

  // Drag and drop state
  const [isDragOver, setIsDragOver] = useState(false);

  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Store original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      // Prevent body and html scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isModalOpen]);

  // Function to show notification
  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Period options with discounts
  const periodOptions = [
    { value: 1, label: isArabic ? "شهر واحد" : "1 Month", discount: 0 },
    { value: 3, label: isArabic ? "3 أشهر" : "3 Months", discount: 0.1 }, // 10% discount
    { value: 6, label: isArabic ? "6 أشهر" : "6 Months", discount: 0.25 }, // 25% discount
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
    "Whatsapp - 48hours support": "دعم واتساب - 48 ساعة",
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
    
    // Special pricing for Elite athlete plan
    if (planTitle === "Elite athlete") {
      if (selectedPeriod === 3) {
        return {
          monthlyPrice: 5000, // Monthly price for display
          totalPrice: 15000, // Fixed price for 3 months
          period: selectedPeriod,
          discount: 0, // No discount calculation for fixed pricing
        };
      } else if (selectedPeriod === 6) {
        return {
          monthlyPrice: 5000, // Monthly price for display
          totalPrice: 30000, // Fixed price for 6 months
          period: selectedPeriod,
          discount: 0, // No discount calculation for fixed pricing
        };
      } else {
        // For 1 month, use standard calculation
        return {
          monthlyPrice: basePrice,
          totalPrice: basePrice,
          period: selectedPeriod,
          discount: 0,
        };
      }
    }
    
    // Standard calculation for other plans
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

      // Calculate price with the new period directly for Elite athlete
      let newPriceInfo;
      if (selectedPlan.title === "Elite athlete") {
        if (newPeriodInt === 3) {
          newPriceInfo = {
            monthlyPrice: 5000,
            totalPrice: 15000,
            period: newPeriodInt,
            discount: 0,
          };
        } else if (newPeriodInt === 6) {
          newPriceInfo = {
            monthlyPrice: 5000,
            totalPrice: 30000,
            period: newPeriodInt,
            discount: 0,
          };
        } else {
          newPriceInfo = {
            monthlyPrice: selectedPlan.basePrice,
            totalPrice: selectedPlan.basePrice,
            period: newPeriodInt,
            discount: 0,
          };
        }
      } else {
        // Standard calculation for other plans
        const periodOption = periodOptions.find(
          (option) => option.value === newPeriodInt
        );
        const discountedPrice = selectedPlan.basePrice * (1 - periodOption.discount);
        const totalPrice = discountedPrice * newPeriodInt;

        newPriceInfo = {
          monthlyPrice: Math.round(discountedPrice),
          totalPrice: Math.round(totalPrice),
          period: newPeriodInt,
          discount: periodOption.discount,
        };
      }

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

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        showNotification('error', isArabic ? 'نوع الملف غير مدعوم. يرجى رفع PNG, JPG أو PDF' : 'File type not supported. Please upload PNG, JPG, or PDF');
      }
    }
  };

  // Function to validate form
  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = isArabic ? "الاسم مطلوب" : "Name is required";
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = isArabic ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = isArabic ? "البريد الإلكتروني غير صحيح" : "Email is invalid";
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = isArabic ? "رقم الهاتف مطلوب" : "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(customerInfo.phone)) {
      errors.phone = isArabic ? "رقم الهاتف غير صحيح" : "Phone number is invalid";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form input changes
  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Function to send user data to API
  const sendUserData = async (userData) => {
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('user_name', userData.user_name);
      formData.append('user_phone', userData.user_phone);
      formData.append('user_email', userData.user_email);
      formData.append('plan', userData.plan);
      formData.append('duration_days', userData.duration_days);
      formData.append('price', userData.price);
      formData.append('payment_method', userData.payment_method);
      
      // Append the payment receipt file if it exists
      if (userData.payment_receipt) {
        formData.append('payment_receipt', userData.payment_receipt);
      }

      const response = await axios.post('https://dashboard.bettrfitness.com/api/subscribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error sending user data:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Failed to send data'
      };
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    if (!selectedPaymentMethod) {
      showNotification('error', isArabic ? "يرجى اختيار طريقة الدفع" : "Please select a payment method");
      return;
    }
    if (!uploadedFile) {
      showNotification('error', isArabic ? "يرجى رفع إيصال الدفع" : "Please upload your payment receipt");
      return;
    }

    // Send user data to API
    try {
      // Get the selected duration for the current plan, default to 1 month
      const currentDuration = selectedPlan ? (selectedPeriods[selectedPlan.title] || 1) : 1;
      
      // Transform payment method value for API (kebab-case -> camelCase)
      const transformedPaymentMethod = selectedPaymentMethod
        .split('-')
        .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      const userData = {
        user_name: customerInfo.name,
        user_phone: customerInfo.phone,
        user_email: customerInfo.email,
        payment_receipt: uploadedFile, // Include the uploaded file as payment receipt
        plan: selectedPlan?.title || "Unknown Plan",
        duration_days: currentDuration * 30, // Convert months to days (30 days per month)
        price: selectedPlan?.totalPrice || 0,
        payment_method: transformedPaymentMethod
      };

      const result = await sendUserData(userData);
      
      if (result.success) {
        showNotification('success', isArabic ? "شكراً لاشتراكك! سنتواصل معك في أقرب وقت ممكن" : "Thank you for your subscription! We will contact you as soon as possible");
        setIsModalOpen(false);
        
        // Reset form
        setCustomerInfo({ name: "", email: "", phone: "" });
        setFormErrors({});

        // Track Facebook Pixel Purchase event
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Purchase', {
            content_name: userData.plan,
            content_type: 'subscription',
            value: userData.price || 0,
            currency: 'EGP',
            plan_duration_days: userData.duration_days
          });
        }
      } else {
        showNotification('error', `${isArabic ? "خطأ في إرسال البيانات:" : "Error sending data:"} ${result.error}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      showNotification('error', isArabic ? "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى." : "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-[60] max-w-sm w-full transform transition-all duration-300 ease-in-out ${
          notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`rounded-lg shadow-lg p-4 border-l-4 ${
            notification.type === 'success' 
              ? 'bg-green-900/90 border-green-400 text-green-100' 
              : 'bg-red-900/90 border-red-400 text-red-100'
          } backdrop-blur-sm`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <CheckIcon />
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                  className="inline-flex text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    suppressHydrationWarning={true}
                  >
                    {periodOptions.filter(option => 
                      selectedPlan?.title === "Elite athlete" ? option.value !== 1 : true
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        {selectedPlan?.title !== "Elite athlete" && option.discount > 0 &&
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
                      L.E {selectedPlan?.monthlyPrice}
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
                  {selectedPlan?.discount > 0 && selectedPlan?.title !== "Elite athlete" && (
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
                        L.E {selectedPlan?.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <div>
                <h5 className="text-white font-semibold mb-3">
                  {isArabic ? "معلومات العميل" : "Customer Information"}
                </h5>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full bg-black/30 border ${formErrors.name ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm transition-colors`}
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      placeholder={isArabic ? "البريد الإلكتروني" : "Email Address"}
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full bg-black/30 border ${formErrors.email ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm transition-colors`}
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <input
                      type="tel"
                      placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full bg-black/30 border ${formErrors.phone ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm transition-colors`}
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                    {formErrors.phone && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>
                    )}
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
                      value="vodafoneCash"
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
                  {selectedPaymentMethod === "vodafoneCash" && (
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        •{" "}
                        {isArabic
                          ? `أرسل ${selectedPlan?.totalPrice}L.E إلى:`
                          : `Send ${selectedPlan?.totalPrice}L.E to:`}{" "}
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
                          ? `أرسل ${selectedPlan?.totalPrice}L.E  إلى:`
                          : `Send ${selectedPlan?.totalPrice}L.E  to:`}{" "}
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
                <div 
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                    isDragOver 
                      ? 'border-[#fd5747] bg-[#fd5747]/10 scale-105' 
                      : 'border-gray-600 hover:border-[#fd5747]/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
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
                disabled={!selectedPaymentMethod || !uploadedFile || !customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()}
                className="w-full bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-3 rounded-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isArabic ? "إرسال الدفع" : "Submit Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="pricing-section" className="py-16 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="lg:text-6xl text-3xl font-extrabold text-center tracking-tight">
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
              className="rounded-3xl backdrop-blur-xl lg:min-h-[700px] shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
              
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
                    suppressHydrationWarning={true}
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
                      L.E {calculatePrice(900, "Regular - Diet only").monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهور" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(49, "Regular - Diet only").period > 1 && (
                    <div className="mt-1">
                    
                      {calculatePrice(900, "Regular - Diet only").discount >
                        0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(900, "Regular - Diet only").discount *
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
              <div className=" flex flex-col justify-between">
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
                    <span className="text-orange-500">
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
                        : <>Whatsapp <span className="text-orange-500">weekly</span> support</>}
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
              <div className="px-6 pb-6 flex-shrink-0 ">
                <button
                  onClick={() => handleGetStarted("Regular - Diet only", 900)}
                  className="w-full rounded-2xl bg-gradient-to-r mt-10 lg:mt-13 from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                  suppressHydrationWarning={true}
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
              className="rounded-3xl backdrop-blur-xl lg:min-h-[700px] shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
           
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
                    suppressHydrationWarning={true}
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
                      L.E {
                        calculatePrice(1500, "Regular - Diet & Exercise")
                          .monthlyPrice
                      }
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? 
                        `/${calculatePrice(1500, "Regular - Diet & Exercise").period} شهر` : 
                        `/${calculatePrice(1500, "Regular - Diet & Exercise").period} month`
                      }
                    </span>
                  </div>
                  {calculatePrice(1500, "Regular - Diet & Exercise").period >
                    1 && (
                    <div className="mt-1">
                     
                      {calculatePrice(1500, "Regular - Diet & Exercise")
                        .discount > 0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(1500, "Regular - Diet & Exercise")
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
              <div className="lg:flex-1 flex flex-col justify-between">
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
                    <span className="text-orange-500">
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
                        : <>Whatsapp <span className="text-orange-500">weekly</span> support</>}
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
                      <CrossIcon />
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
                  onClick={() =>
                    handleGetStarted("Regular - Diet & Exercise", 1500)
                  }
                  className="w-full rounded-2xl bg-gradient-to-r mt-8 lg:mt-0 from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
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
              className="rounded-3xl lg:min-h-[700px] backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-[#fd5747]/25 via-red-500/20 to-red-600/25 ring-2 ring-gradient-to-r ring-[#fd5747]/60 animate-gradient-x"
              style={{
                backgroundSize: "400% 400%",
              
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
                    suppressHydrationWarning={true}
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
                      L.E {calculatePrice(3000, "Advanced coaching").monthlyPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? "/شهر" : "/month"}
                    </span>
                  </div>
                  {calculatePrice(3000, "Advanced coaching").period > 1 && (
                    <div className="mt-1">
                    
                      {calculatePrice(3000, "Advanced coaching").discount >
                        0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(3000, "Advanced coaching").discount * 100
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
                <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm lg:max-h-96 overflow-y-auto">
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
                    <span className="text-orange-500">
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
                        ? featureTranslations["Whatsapp - 48hours support"]
                        : <>Whatsapp - <span className="text-orange-500">48hours</span> support</>}
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
                  onClick={() => handleGetStarted("Advanced coaching", 3000)}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                  suppressHydrationWarning={true}
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
              className="rounded-3xl lg:min-h-[700px] backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
             
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
                    value={selectedPeriods["Elite athlete"] || 3}
                    onChange={(e) =>
                      handlePeriodChange("Elite athlete", e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                    suppressHydrationWarning={true}
                  >
                    {periodOptions.filter(option => option.value !== 1).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}{" "}
                        
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
                      L.E {calculatePrice(5000, "Elite athlete").totalPrice}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {isArabic ? 
                        `/${calculatePrice(5000, "Elite athlete").period}شهر` : 
                        `/${calculatePrice(5000, "Elite athlete").period}month`
                      }
                    </span>
                  </div>
                  {calculatePrice(5000, "Elite athlete").period > 1 && (
                    <div className="mt-1">
                   
                      {calculatePrice(5000, "Elite athlete").discount > 0 && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Save{" "}
                          {Math.round(
                            calculatePrice(5000, "Elite athlete").discount * 100
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
                    <span className="text-orange-500">
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
                        : <>Whatsapp - mohamed personal Whatsapp - <span className="text-orange-500">24 hours</span> support</>}
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
                    className="flex items-start gap-2 "
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
                    <span className="text-gray-200 ">
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
                  onClick={() => handleGetStarted("Elite athlete", 5000)}
                  className="w-full rounded-2xl bg-gradient-to-r  from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{ backgroundSize: "300% 300%" }}
                  suppressHydrationWarning={true}
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
