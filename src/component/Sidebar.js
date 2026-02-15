"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const isEventRoute = pathname.startsWith("/event/");
  const isParticipationRoute = pathname.includes("/participants");

  const [usersOpen, setUsersOpen] = useState(false);

  useEffect(() => {
    if (isEventRoute) {
      setUsersOpen(true);
    }
  }, [isEventRoute]);

  return (
    <div className="w-64 min-h-screen bg-[#0f172a] text-white p-6 border-r border-gray-800">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">Admin</h2>

      <ul className="space-y-3">

        {/* Dashboard */}
        <li>
          <Link
            href="/"
            className={`block px-4 py-2 rounded-lg transition ${
              pathname === "/"
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            Dashboard
          </Link>
        </li>

        {/* Users Dropdown */}
        <li>
          <button
            onClick={() => setUsersOpen(!usersOpen)}
            className="w-full flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <span>Users</span>
            <span className={`transition ${usersOpen ? "rotate-90" : ""}`}>
              ▶
            </span>
          </button>

          {usersOpen && (
            <ul className="ml-4 mt-2 space-y-2 border-l border-gray-700 pl-4">

              <li>
                <Link
                  href="/admin/users"
                  className={`block px-3 py-2 rounded-lg text-sm transition ${
                    pathname === "/admin/users"
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }`}
                >
                  All Users
                </Link>
              </li>

              {isEventRoute && (
                <li>
                  <Link
                    href={`${pathname.split("/participants")[0]}/participants`}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      isParticipationRoute
                        ? "bg-blue-600"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    Participation
                  </Link>
                </li>
              )}

            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <Link
            href="/admin/settings"
            className={`block px-4 py-2 rounded-lg transition ${
              pathname === "/admin/settings"
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            Settings
          </Link>
        </li>

      </ul>
    </div>
  );
}
