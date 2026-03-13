import React, { useState } from "react";

export default function ContactUsMsgs({ contactusQuery }) {
  const [filter, setFilter] = useState("all");

  // Helper to filter messages
  const getFilteredMessages = () => {
    if (!Array.isArray(contactusQuery.data)) return [];
    if (filter === "all") return contactusQuery.data;
    if (filter === "bulk") {
      return contactusQuery.data.filter(msg => msg.queryType?.toLowerCase().includes("bulk"));
    }
    if (filter === "general") {
      return contactusQuery.data.filter(msg => !msg.queryType?.toLowerCase().includes("bulk"));
    }
    return contactusQuery.data;
  };

  const filteredMessages = getFilteredMessages();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Contact us Msgs</h2>
      <div className="mb-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${filter === "all" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded border ${filter === "bulk" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setFilter("bulk")}
        >
          Bulk Orders
        </button>
        <button
          className={`px-3 py-1 rounded border ${filter === "general" ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setFilter("general")}
        >
          General Queries
        </button>
      </div>
      {contactusQuery.isLoading ? (
        <div className="text-gray-600">Loading contact messages…</div>
      ) : contactusQuery.isError ? (
        <div className="text-red-700">Failed to load: {contactusQuery.error?.message || "Error"}</div>
      ) : (
        <div className="overflow-auto bg-gray-50 p-4 rounded text-xs">
          {Array.isArray(filteredMessages) && filteredMessages.length === 0 ? (
            <div>No contact messages found.</div>
          ) : (
            <ul>
              {filteredMessages.map((msg, idx) => (
                <li key={idx} className="mb-2 border-b pb-2">
                  <div><strong>Name:</strong> {msg.name}</div>
                  <div><strong>Email:</strong> {msg.email}</div>
                  <div><strong>Type:</strong> {msg.queryType}</div>
                  <div><strong>Message:</strong> {msg.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
