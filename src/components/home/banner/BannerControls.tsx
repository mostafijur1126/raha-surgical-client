"use client";

interface BannerControlsProps {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const BannerControls = ({
  total,
  current,
  onDotClick,
}: BannerControlsProps) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-3">
      {/* Dots */}
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerControls;
