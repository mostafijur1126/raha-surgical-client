"use client";

import { useTheme } from "next-themes";

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
  onPrev,
  onNext,
  onDotClick,
}: BannerControlsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dotColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)";
  const dotActiveColor = isDark ? "#60A5FA" : "#FFFFFF";

  return (
    <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-3">
      {/* Dots */}
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: index === current ? "32px" : "8px",
              backgroundColor: index === current ? dotActiveColor : dotColor,
            }}
            onMouseEnter={(e) => {
              if (index !== current) {
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.9)";
              }
            }}
            onMouseLeave={(e) => {
              if (index !== current) {
                e.currentTarget.style.backgroundColor = dotColor;
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerControls;
