"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BannerControls from "./BannerControls";

// Slide data – replace images with your own high‑quality surgical equipment photos
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&q=80", // surgical tools
    title: "ELITE SURGICAL SOLUTIONS",
    subtitle: "Precision Tools for Life‑Saving Excellence",
    description:
      "Equipping world-class clinics with FDA-approved surgical instruments designed for tactile feedback and unwavering durability.",
    primaryCta: "Explore Products",
    secondaryCta: "Download Catalog",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1516062423079-7ca13cdc7b0b?w=1920&q=80", // operating room
    title: "Advanced OR Equipment",
    subtitle: "Innovation That Surgeons Trust",
    description:
      "From robotic-assisted systems to precision hand tools – our portfolio covers every surgical specialty with uncompromising quality.",
    primaryCta: "View Collection",
    secondaryCta: "Request Demo",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80", // medical instruments
    title: "Global Healthcare Partner",
    subtitle: "Reliable Supply Chain, Exceptional Care",
    description:
      "Serving 50+ countries with ISO‑certified manufacturing and just‑in‑time delivery for hospitals and surgical centers worldwide.",
    primaryCta: "Our Partners",
    secondaryCta: "Contact Sales",
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }, [currentIndex, goToSlide]);

  // Auto‑play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[90vh] min-h-[500px] max-h-[800px] overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay gradient – dark at bottom, softer on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Small label/badge */}
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-blue-700/80 backdrop-blur-sm text-white rounded-full">
                {currentSlide.subtitle}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {currentSlide.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl mx-auto drop-shadow-md">
                {currentSlide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {currentSlide.primaryCta}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white border-2 border-white/70 hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  {currentSlide.secondaryCta}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <BannerControls
        total={slides.length}
        current={currentIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={goToSlide}
      />

      {/* Chevron buttons – desktop only */}
      <div className="hidden md:block absolute inset-y-0 left-0 right-0 pointer-events-none z-20">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-200 border border-white/20"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-200 border border-white/20"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default BannerSlider;
