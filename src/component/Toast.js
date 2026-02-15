"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error"
      ? "bg-red-600"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <div className="fixed top-5 right-5 z-50 animate-slideIn">
      <div
        className={`px-6 py-3 rounded-xl shadow-lg text-white text-sm ${bgColor}`}
      >
        {message}
      </div>
    </div>
  );
}
