import Image from "next/image";

export default function Container({
  // Image
  src,
  alt = "Image",

  // Text
  text,
  textClassName = "",

  // Size
  width = "300px",
  height = "300px",

  // Position
  top,
  left,
  right,
  bottom,

  // Style
  rotate = 0,
  bg = "transparent",
  z = 1,
  radius = "0px",
  opacity = 1,

  // Image
  objectFit = "cover",

  // Container
  className = "",

  // Custom JSX
  children,
}) {
  return (
    <div
      className={`absolute overflow-hidden ${className}`}
      style={{
        width,
        height,
        top,
        left,
        right,
        bottom,
        background: bg,
        borderRadius: radius,
        transform: `rotate(${rotate}deg)`,
        zIndex: z,
        opacity,
      }}
    >
      {/* Image */}
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          draggable={false}
          className={`object-${objectFit}`}
        />
      )}

      {/* Text */}
      {text && (
        <div
          className={`relative flex h-full w-full items-center justify-center ${textClassName}`}
        >
          {text}
        </div>
      )}

      {/* Custom JSX */}
      {children}
    </div>
  );
}