"use client";

export default function AdminHeading({
  title,
  subtitle,
  size = "md",
  align = "left",
  badge,
  className = "",
}) {

  const sizes = {
    sm: {
      title: "text-4xl md:text-5xl",
      subtitle: "text-base",
      spacing: "mb-2",
    },
    md: {
      title: "text-5xl md:text-6xl",
      subtitle: "text-lg",
      spacing: "mb-3",
    },
    lg: {
      title: "text-6xl md:text-7xl",
      subtitle: "text-xl",
      spacing: "mb-4",
    },
  };

  const current = sizes[size] || sizes.md;

  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className={`w-full pt-[30px] pb-[30px] ${alignClass} ${className}`}>
      
      {/* Title + Badge */}
      <div className="flex items-center gap-4 flex-wrap">
        <h1
          className={`
            font-['Playfair_Display'] 
            font-bold 
            text-gray-900 
            tracking-tight
            ${current.title} 
            ${current.spacing}
          `}
        >
          {title}
        </h1>

        {badge && (
          <span className="px-4 py-1 text-sm font-medium bg-black text-white rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-gray-500 ${current.subtitle}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}