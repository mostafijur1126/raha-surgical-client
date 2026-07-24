import { FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: "Genuine Equipment",
      description:
        "100% authentic instruments sourced directly from certified ISO-compliant manufacturers.",
    },
    {
      id: 2,
      icon: FaTruck,
      title: "Fast Delivery",
      description:
        "Strategic logistics ensuring critical surgical tools reach your clinic within 24-48 hours.",
    },
    {
      id: 3,
      icon: FaHeadset,
      title: "Clinical Support",
      description:
        "Dedicated product specialists available to assist with technical specifications and compatibility.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-blue-400 bg-blue-700/20 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Surgical Professionals <br className="hidden sm:block" />
            Choose <span className="text-blue-400">Raha Surgical</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            We bridge the gap between manufacturing precision and clinical
            urgency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:bg-white/10"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-700/20 text-blue-400 mb-5 group-hover:bg-blue-700/30 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-blue-700/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
