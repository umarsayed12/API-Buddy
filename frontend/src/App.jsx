import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import EndpointTable from "./components/EndpointTable";
import TestResultsTable from "./components/TestResultsTable";
import axios from "axios";

function App() {
  const [endpoints, setEndpoints] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/test", {
        endpoints,
      });
      setResults(res.data.results);
    } catch (err) {
      console.error("Test failed", err);
      alert("Test run failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Auto API Tester Agent
      </h1>
      <FileUpload setEndpoints={setEndpoints} />
      {endpoints.length > 0 && (
        <>
          <button
            onClick={runTests}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
          >
            {loading ? "Running Tests..." : "Run Tests"}
          </button>
          <EndpointTable endpoints={endpoints} />
        </>
      )}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Test Results</h2>
          <TestResultsTable results={results} />
        </div>
      )}
    </div>
  );
}

export default App;
