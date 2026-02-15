import { notFound } from "next/navigation";
import EditableEvent from "./EditableEvent";

async function fetchEvent(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/get/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
  
    return data.event; // adjust if API structure differs
  } catch (error) {
    console.error("Fetch event error:", error);
    return null;
  }
}

export default async function EventPage({ params }) {

  const { eventId } = await params;
  const event = await fetchEvent(eventId);

  if (!event) {
    notFound();
  }

    return <EditableEvent initialEvent={event} />;

}
