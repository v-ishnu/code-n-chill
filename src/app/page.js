"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CreateEventModal from "@/component/CreateEventModal";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/all`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="h-full flex flex-col bg-black pt-2 px-6 gap-4">
      {/* Create Button */}
      <div className="h-12 flex justify-end px-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="text-white text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="h-full mx-auto py-8 w-full">
        {loading ? (
          <p className="text-white">Loading events...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {events.map((event) => (
              <Link key={event._id} href={`/event/${event._id}`}>
                <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
                  <div className="h-40 bg-gray-700">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="font-semibold text-lg">
                      {event.title}
                    </h2>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {event.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="h-screen"></div>

      {/* Modal (ONLY renders when true) */}
      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
