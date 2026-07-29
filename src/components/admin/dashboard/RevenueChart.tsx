"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";

interface RevenueChartProps {
  data: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
      percentage: number;
    }[];
  };
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  const { isDark } = useMountedTheme();

  const textPrimary = isDark ? "#F1F5F9" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#475569";
  const textMuted = isDark ? "#64748B" : "#64748B";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "#334155" : "#E8EEF5";

  // Colors for chart bars
  const barColors = ["#025395", "#60A5FA", "#34D399"];
  const barColorsDark = ["#3B82F6", "#60A5FA", "#34D399"];

  const maxValue = Math.max(...data.datasets.flatMap((d) => d.data));

  const getBarColor = (index: number) => {
    return isDark
      ? barColorsDark[index % barColorsDark.length]
      : barColors[index % barColors.length];
  };

  return (
    <div
      className="rounded-xl border p-6 shadow-sm"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>
            Monthly Revenue Trends
          </h3>
          <p className="text-xs" style={{ color: textMuted }}>
            2024 (Current Year)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {data.datasets.map((dataset, idx) => (
            <div key={dataset.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getBarColor(idx) }}
              />
              <span style={{ color: textSecondary }}>
                {dataset.name}: {dataset.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48 md:h-56 w-full">
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="text-xs w-12 text-right"
                style={{ color: textMuted }}
              >
                ${(maxValue - (i * maxValue) / 5).toFixed(1)}M
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: isDark ? "#334155" : "#E8EEF5" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pt-8 pb-6 pl-16 flex items-end justify-between gap-2">
          {data.labels.map((label, labelIdx) => {
            // Calculate total height for this column
            const totalValue = data.datasets.reduce(
              (sum, ds) => sum + ds.data[labelIdx],
              0,
            );
            const maxHeight = 100; // percentage
            const totalHeight = (totalValue / maxValue) * maxHeight;

            return (
              <div
                key={label}
                className="flex-1 flex flex-col items-center h-full justify-end gap-1"
              >
                <div
                  className="w-full rounded-t-sm flex flex-col justify-end transition-all duration-500"
                  style={{ height: `${Math.max(totalHeight, 5)}%` }}
                >
                  {data.datasets.map((dataset, idx) => {
                    const value = dataset.data[labelIdx];
                    const height = (value / maxValue) * maxHeight;
                    return (
                      <div
                        key={`${label}-${dataset.name}`}
                        className="w-full transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${(height / totalHeight) * 100}%`,
                          backgroundColor: getBarColor(idx),
                          minHeight: "4px",
                          borderRadius:
                            idx === data.datasets.length - 1
                              ? "2px 2px 0 0"
                              : "0",
                        }}
                      />
                    );
                  })}
                </div>
                <span className="text-xs mt-1" style={{ color: textSecondary }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
