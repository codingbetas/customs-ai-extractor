"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const shipmentId = unwrappedParams.id;

  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/shipments/${shipmentId}/cross-check`
        );
        if (!res.ok) throw new Error("Shipment not found");
        const data = await res.json();
        setShipment(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [shipmentId]);

  const exportCSV = () => {
    window.open(
      `http://localhost:8000/api/shipments/${shipmentId}/export`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Review: {shipmentId}
          </h1>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Upload
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {loading && <p className="text-gray-500">Loading cross-check results...</p>}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800">
              No cross-check data found for this shipment. Upload both Invoice
              and Packing List first.
            </p>
          </div>
        )}

        {shipment && !error && (
          <>
            <div
              className={`p-4 rounded-lg mb-6 ${
                shipment.is_consistent
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <h2 className="font-semibold">{shipment.message}</h2>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Cross-Document Weights
              </h3>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Document Type
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                      Gross Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(shipment.weights || {}).map(
                    ([type, weight]: any) => (
                      <tr key={type} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                          {type.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 font-mono">
                          {weight}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <button
              onClick={exportCSV}
              className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
            >
              📥 Export to CSV
            </button>
          </>
        )}
      </main>
    </div>
  );
}