"use client";
import { useEffect, useState } from "react";
import Link from "next/link"

export default function ShipmentList() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/shipments");
        const data = await res.json();
        setShipments(data.shipments || []);
      } catch (e) {
        alert("Failed to load shipments.");
      }
      setLoading(false);
    };
    fetchShipments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Shipments</h1>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            + New Upload
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          All Shipments
        </h2>
        <p className="text-gray-600 mb-8">
          Review the status of all uploaded shipments.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading shipments...</p>
        ) : shipments.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500 mb-4">No shipments yet.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Upload Your First Document
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Shipment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.shipment_id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {s.shipment_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {s.document_count} document{s.document_count !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/review/${s.shipment_id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Review →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}