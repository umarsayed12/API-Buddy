import React, { useState } from "react";
import axios from "axios";

function TestResultsTable({ results }) {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleExplain = async (result, index) => {
    setLoadingIndex(index);
    setAiResponse(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/explain",
        result
      );
      setAiResponse(res.data.explanation);
      setShowModal(true);
    } catch (err) {
      console.log("AI Failed : ", err);

      alert("AI explanation failed");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Method</th>
            <th className="p-2">URL</th>
            <th className="p-2">Status</th>
            <th className="p-2">Time</th>
            <th className="p-2">Error</th>
            <th className="p-2">AI Explain</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{res.name}</td>
              <td className="p-2">{res.method}</td>
              <td className="p-2 text-sm">{res.url}</td>
              <td className="p-2 font-semibold text-blue-600">{res.status}</td>
              <td className="p-2">{res.time}</td>
              <td className="p-2 text-red-600 text-xs whitespace-pre-wrap">
                {res.error ? JSON.stringify(res.error, null, 2) : "-"}
              </td>
              <td className="p-2">
                {res.error ? (
                  <button
                    className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                    onClick={() => handleExplain(res, i)}
                  >
                    {loadingIndex === i ? "Loading..." : "Explain"}
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AI Explanation Modal */}
      {showModal && aiResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              🧠 Gemini AI Explanation
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">
              {aiResponse}
            </pre>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestResultsTable;
