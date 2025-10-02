export default function Pricing() {
  const plans = [
    {
      title: "Diet only",
      price: "$49",
      period: "/month",
      description: "Personalized nutrition plan tailored to your goals.",
      features: [
        "Custom macro targets and meal timing",
        "Weekly check-ins",
        "Messaging support",
      ],
      cta: "Get Started",
      isPopular: false,
    },
    {
      title: "Elite athlete",
      price: "$89",
      period: "/month",
      description: "High-performance program for competitive athletes.",
      features: [
        "Performance-focused nutrition",
        "Periodized training guidance",
        "Recovery optimization",
      ],
      cta: "Get Started",
      isPopular: false,
    },
    {
      title: "Advanced coaching",
      price: "$129",
      period: "/month",
      description: "1:1 guidance, accountability, and progress tracking.",
      features: [
        "Weekly coaching calls",
        "Form reviews and feedback",
        "Adaptive programming",
      ],
      cta: "Get Started",
      isPopular: true,
    },
    {
      title: "Diet & Exercise",
      price: "$69",
      period: "/month",
      description: "Complete plan combining workouts and nutrition.",
      features: [
        "Goal-specific workouts",
        "Matched nutrition plan",
        "Progress tracking dashboard",
      ],
      cta: "Get Started",
      isPopular: false,
    },
  ];

  return (
    <section className="py-16 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center text-white tracking-tight">
          Pricing
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col ${
                plan.isPopular 
                  ? "bg-gradient-to-br from-[#fd5747]/25 via-pink-500/20 to-purple-600/25 ring-2 ring-gradient-to-r ring-[#fd5747]/60 animate-gradient-x" 
                  : "bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              }`}
              style={{
                backgroundSize: '400% 400%',
                height: '520px',
              }}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-1  left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#fd5747] via-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full animate-gradient-x shadow-lg" style={{backgroundSize: '200% 200%'}}>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card header */}
              <div className="px-6 pt-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {plan.title}
                  </h3>
                </div>
                
                {/* Price */}
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-blue-700 animate-gradient-x" style={{backgroundSize: '200% 200%'}}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                </div>
                
                <p className="mt-3 text-gray-300 text-sm">{plan.description}</p>
              </div>

              {/* Divider accent */}
              <div className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-blue-700/50 animate-gradient-x" style={{backgroundSize: '200% 200%'}} />

              {/* Features */}
              <div className="flex-1 flex flex-col justify-between">
                <ul className="px-6 py-4 space-y-3 text-gray-200 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#fd5747] to-blue-700 animate-pulse" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 flex-shrink-0">
                <button 
                  className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-purple-600 to-blue-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                  style={{backgroundSize: '300% 300%'}}
                >
                  {plan.cta}
                </button>
              </div>

              {/* Bottom accent radius strip - now animated */}
              <div className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-blue-700 animate-gradient-x" style={{backgroundSize: '300% 300%'}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}