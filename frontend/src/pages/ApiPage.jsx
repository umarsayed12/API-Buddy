import React, { useState } from "react";
import FileUpload from "../components/inputs/FileUpload";
import EndpointTable from "../components/testResults/EndpointTable";
import TestResultsTable from "../components/testResults/TestResultsTable";
import ManualInputForm from "../components/inputs/ManualInputForm";
import axios from "axios";
import JwtTokenInput from "../components/inputs/JWTTokenInput";
import { useJwt } from "../context/JWTContext";
import { useSelector } from "react-redux";
function ApiPage() {
  const [activeTab, setActiveTab] = useState("collection");
  const [endpoints, setEndpoints] = useState([]);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useJwt();
  const runTests = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/test",
        { endpoints },
        {
          headers: token.token
            ? { Authorization: `Bearer ${token.token}` }
            : {},
        }
      );
      setResults(res.data.results);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Test failed", err);
      alert("Test run failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full pt-[10%] bg-gradient-to-br text-white from-[#1E2F97] via-[#1AA7EC] to-[#1E2F97] p-6">
      <div className="w-full flex justify-center items-center">
        <JwtTokenInput />
      </div>
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "collection"
              ? "text-gray-900 bg-white"
              : "bg-gray-900 text-white cursor-pointer"
          }`}
          onClick={() => {
            setActiveTab("collection");
            setResults([]);
            setSummary(null);
          }}
        >
          Collection Upload
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "manual"
              ? "text-gray-900 bg-white"
              : "bg-gray-900 text-white cursor-pointer"
          }`}
          onClick={() => {
            setActiveTab("manual");
            setEndpoints([]);
            setResults([]);
            setSummary(null);
          }}
        >
          URL Input
        </button>
      </div>

      {activeTab === "collection" && (
        <>
          {/* Upload Collection File */}
          <FileUpload setEndpoints={setEndpoints} />

          {endpoints.length > 0 && (
            <>
              <button
                onClick={runTests}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4 cursor-pointer"
              >
                {loading ? "Running Tests..." : "Run Tests"}
              </button>
              <EndpointTable endpoints={endpoints} />
            </>
          )}
        </>
      )}

      {activeTab === "manual" && (
        <div className="my-6">
          <ManualInputForm setResults={setResults} setSummary={setSummary} />
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Test Results</h2>
          <TestResultsTable
            activeTab={activeTab}
            results={results}
            summary={summary}
          />
        </div>
      )}
    </div>
  );
}

export default ApiPage;
