"use client";

export default function Navbar() {
  return (
    <div className="bg-black shadow px-6 py-4 flex justify-between">
      <div className="flex flex-col">
        <div className="text-white text-lg font-bold">
          Dashboard Overview
        </div>
        <div className="text-gray-400 text-[13px]">
          Manage your events and settings
        </div>
      </div>
    </div>
  );
}
