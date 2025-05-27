import React, { useState } from "react";
import axios from "axios";

function TestResultsTable({ results, summary }) {
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
  function parseBold(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }
  function extractErrorMessage(htmlString) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const pre = doc.querySelector("pre");
      if (pre) {
        return pre.innerHTML
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&#039;/g, `'`)
          .replace(/&quot;/g, `"`);
      }
      return htmlString;
    } catch {
      return htmlString;
    }
  }

  return (
    <div className="overflow-x-auto bg-gray-900 shadow-2xl shadow-black rounded-xl p-4 space-y-6">
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="font-medium">Total</div>
            <div className="text-xl font-bold">{summary.total}</div>
          </div>
          <div className="bg-green-600 rounded-lg p-3">
            <div className="font-medium">Passed</div>
            <div className="text-xl font-bold">{summary.passed}</div>
          </div>
          <div className="bg-red-600 rounded-lg p-3">
            <div className="font-medium">Failed</div>
            <div className="text-xl font-bold">{summary.failed}</div>
          </div>
          <div className="bg-blue-600 rounded-lg p-3">
            <div className="font-medium">Avg Time</div>
            <div className="text-xl font-bold">{summary.avgTime}</div>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Method</th>
            <th className="p-2">URL</th>
            <th className="p-2">Status</th>
            <th className="p-2">Time</th>
            <th className="p-2">Response</th>
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
              <td className="p-2 text-xs whitespace-pre-wrap">
                {res.error ? (
                  <div className="text-red-600">
                    <div className="font-bold mb-1">Error : </div>
                    <div className="max-h-[180px] overflow-y-scroll text-red-600 whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded border">
                      {typeof extractErrorMessage(res.error) === "string"
                        ? extractErrorMessage(res.error)
                        : JSON.stringify(extractErrorMessage(res.error))}
                    </div>
                  </div>
                ) : res.data ? (
                  <div className="">
                    <div className="text-green-600 font-bold mb-1">Success</div>
                    <div className="font-bold mb-1">Data :</div>
                    <div className="max-h-[180px] overflow-y-scroll text-black whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded border">
                      {(() => {
                        if (typeof res.data === "string") {
                          return res.data;
                        } else if (Array.isArray(res.data)) {
                          return (
                            <>
                              [
                              {res.data.map((item, idx) =>
                                typeof item === "object" ? (
                                  <div key={idx}>
                                    {JSON.stringify(item, null, 2)},
                                  </div>
                                ) : (
                                  <div key={idx}>{item}</div>
                                )
                              )}
                              ]
                            </>
                          );
                        } else if (typeof res.data === "object") {
                          return JSON.stringify(res.data, null, 2);
                        } else {
                          return String(res.data);
                        }
                      })()}
                    </div>
                  </div>
                ) : (
                  "-"
                )}
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

      {showModal && aiResponse && (
        <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              🤖 API Buddy Explanation
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">
              {parseBold(aiResponse)}
            </pre>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
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
