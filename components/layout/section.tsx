import React from "react";

export const Section = ({ children, hasBgColor = false, className = "" }) => {
  const sectionhasBgColorCss = hasBgColor ? "text-white bg-pink-600 bg-gradient-to-br from-pink-600 to-pink-700" : "";

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${sectionhasBgColorCss} ${className}`}
    >
      {children}
    </section>
  );
};
