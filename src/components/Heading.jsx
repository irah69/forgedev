// Heading.jsx
import "../styles/Perspectives.css";

export default function Heading({ title, subtitle, width = '100%', height = 'auto' }) {
  return (
    <div className="perspectives-header" style={{ width, height }}>
      <h2>{title}</h2>
      {/* Optionally render subtitle if provided */}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}