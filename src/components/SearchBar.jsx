import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search products..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginRight: "12px",
        fontSize: "16px",
        width: "220px"
      }}
    />
  );
}
