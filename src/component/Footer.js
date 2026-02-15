"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Left Side */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Event Booking Admin Panel. 
          All rights reserved.
        </p>

        {/* Right Side */}
        <p className="mt-2 md:mt-0 text-center md:text-right">
          Powered by{" "}
          <span className="text-white font-medium">
            Dinex Services
          </span>
        </p>

      </div>
    </footer>
  );
}
