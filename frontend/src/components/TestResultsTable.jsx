import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  useGetTestHistoryQuery,
  useSaveTestHistoryMutation,
} from "../slices/api/historyApi";

function TestResultsTable({ results, summary }) {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [warningModalData, setWarningModalData] = useState(null);
  const [warningExplainIndex, setWarningExplainIndex] = useState(null);
  const [warningAIResponses, setWarningAIResponses] = useState({});
  const [saveTestHistory] = useSaveTestHistoryMutation();
  // const [getTestHistory, { data: testHistoryData }] = useGetTestHistoryQuery();
  const handleWarningClick = (warnings, index, url) => {
    setWarningModalData({ warnings, index, url });
    setWarningAIResponses({});
  };
  const handleWarningExplain = async (warning, index, url) => {
    if (warningAIResponses && warningAIResponses[index]) {
      setWarningAIResponses((prev) => {
        const updated = {};
        Object.keys(prev).forEach((key) => {
          updated[key] = { ...prev[key], show: false };
        });

        updated[index] = {
          message: warningAIResponses[index].message,
          show: true,
        };

        return updated;
      });
    } else {
      setWarningExplainIndex(index);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/ai/explain-security-warnings",
          {
            warning,
            url,
          }
        );

        setWarningAIResponses((prev) => {
          const updated = {};
          Object.keys(prev).forEach((key) => {
            updated[key] = { ...prev[key], show: false };
          });

          updated[index] = {
            message: res.data.explanation,
            show: true,
          };

          return updated;
        });
      } catch (err) {
        console.log("Warning AI failed:", err);
        alert("AI explanation for warning failed");
      } finally {
        setWarningExplainIndex(null);
      }
    }
  };

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
    const codeSplit = text.split(/(`[^`]+`)/g);

    return codeSplit.map((segment, i) => {
      if (segment.startsWith("`") && segment.endsWith("`")) {
        return (
          <code
            key={`code-${i}`}
            className="bg-gray-200 px-1 py-0.5 rounded text-sm"
          >
            {segment.slice(1, -1)}
          </code>
        );
      }
      const boldSplit = segment.split(/(\*\*[^*]+\*\*)/g);
      return boldSplit.map((part, j) => {
        if (
          part.startsWith("**") &&
          (part.endsWith("**") || part.endsWith("**."))
        ) {
          return <strong key={`bold-${i}-${j}`}>{part.slice(2, -2)}</strong>;
        }
        return <span key={`text-${i}-${j}`}>{part}</span>;
      });
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

  const handleSaveHistory = async (res) => {
    await saveTestHistory({
      testType: "Collection",
      testName: res.name,
      request: {
        name: res?.name,
        method: res?.method,
        url: res?.url,
        body: res?.body,
        headers: res?.headers,
      },
      response: {
        status: res.status,
        data: res.data,
        duration: res.time,
        isSuccess: res.status >= 200 && res.status < 300,
        warning: res.data,
        errorSummary: res.error,
      },
    });
  };

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
            <th className="p-2">Warnings</th>
            <th className="p-2">Save</th>
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
                    <div className="max-h-[180px] max-w-[550px] overflow-y-scroll text-black whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded border">
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
                    className="text-sm cursor-pointer flex justify-center items-center bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                    onClick={() => handleExplain(res, i)}
                  >
                    {loadingIndex === i ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Explain"
                    )}
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-2">
                {res.securityWarnings && res.securityWarnings.length > 0 ? (
                  <button
                    className="text-yellow-500 font-semibold cursor-pointer hover:bg-gray-600 flex justify-center items-center p-1 rounded-sm"
                    onClick={() =>
                      handleWarningClick(res.securityWarnings, i, res.url)
                    }
                  >
                    {res.securityWarnings.length}⚠️
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-2">
                <button
                  className="text-yellow-500 font-semibold cursor-pointer hover:bg-gray-600 flex justify-center items-center p-1 rounded-sm"
                  onClick={(e) => handleSaveHistory(res)}
                >
                  💾
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && aiResponse && (
        <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              API Buddy Explanation
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
      {warningModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 overflow-y-scroll flex justify-center items-center z-50">
          <div className="bg-white absolute text-black rounded-xl shadow-lg p-6 max-w-5xl w-full">
            <h3 className="text-lg font-semibold mb-4">Security Warnings</h3>
            <table className="w-full border text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Warning</th>
                  <th className="p-2 text-left">AI Explain</th>
                </tr>
              </thead>
              <tbody>
                {warningModalData.warnings.map((warning, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{warning}</td>
                    <td className="p-2">
                      {warningAIResponses[idx]?.show ? (
                        <div className="text-gray-800 max-h-[180px] whitespace-pre-wrap bg-gray-100 p-2 rounded overflow-y-scroll">
                          {parseBold(warningAIResponses[idx].message)}
                        </div>
                      ) : (
                        <button
                          className="text-sm flex justify-center items-center bg-purple-600 cursor-pointer text-white w-28 py-2 rounded hover:bg-purple-700 transition"
                          onClick={() =>
                            handleWarningExplain(
                              warning,
                              idx,
                              warningModalData.url
                            )
                          }
                          disabled={warningExplainIndex === idx}
                        >
                          {warningExplainIndex === idx ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Explain"
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setWarningModalData(null)}
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
