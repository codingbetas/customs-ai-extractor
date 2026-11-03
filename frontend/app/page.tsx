"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [shipmentId, setShipmentId] = useState("SHP-24811");
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `http://localhost:8000/api/upload/${shipmentId}?doc_type=${docType}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Upload failed. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Customs AI</h1>
          <Link href="/shipments" className="text-sm text-gray-600 hover:text-gray-900">
            Shipment List →
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Upload a Document
        </h2>
        <p className="text-gray-600 mb-8">
          Our AI will extract the fields and check them against your other documents.
        </p>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipment ID
            </label>
            <input
              type="text"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="invoice">Invoice</option>
              <option value="packing_list">Packing List</option>
              <option value="bill_of_lading">Bill of Lading</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {loading ? "AI is reading your document..." : "Extract Data"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Extracted Fields</h3>
            <div className="space-y-2">
              {Object.entries(result.extracted || {}).map(([key, field]: any) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-gray-900">{field.value || "—"}</span>
                  <span
                    className={
                      field.confidence > 0.8
                        ? "text-green-600 text-xs font-semibold"
                        : "text-red-600 text-xs font-semibold"
                    }
                  >
                    {(field.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={`/review/${shipmentId}`}
              className="mt-4 block text-center bg-gray-900 text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition"
            >
              Open Review Screen →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}