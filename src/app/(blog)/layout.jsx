import React from "react";

export default async function BlogLayout({ children }) {
  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      {children}
    </div>
  );
}
