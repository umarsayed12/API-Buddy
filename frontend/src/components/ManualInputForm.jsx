import React, { useState } from "react";
import axios from "axios";
import { useJwt } from "../context/JWTContext";
function ManualInputForm({ setResults, setSummary }) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useJwt();

  const handleSend = async () => {
    if (!url.trim()) {
      setUrlError(true);
      return;
    }

    setLoading(true);
    try {
      const endpoint = {
        name: "Manual Request",
        method,
        url,
        body: body.trim() ? body : "{}",
        headers: (() => {
          try {
            const parsedHeaders = headers.trim() ? JSON.parse(headers) : {};
            return {
              ...parsedHeaders,
              ...(token.token && { Authorization: `Bearer ${token.token}` }),
            };
          } catch (err) {
            console.error("Invalid headers JSON", err);
            return token.token
              ? { Authorization: `Bearer ${token.token}` }
              : {};
          }
        })(),
      };

      const res = await axios.post("http://localhost:5000/api/test", {
        endpoints: [endpoint],
      });

      setResults(res.data.results);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Manual send failed", err);
      alert("Manual test failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Manual API Request</h2>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2 border rounded bg-gray-900"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {urlError && <p className="text-red-600">Please Enter a valid URL.</p>}
        <button
          onClick={handleSend}
          disabled={loading}
          className="sm:hidden bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {(method === "POST" || method === "PUT" || method === "PATCH") && (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Request Body (JSON)"
          rows={4}
          className="w-full p-2 border rounded font-mono text-sm"
        ></textarea>
      )}

      <textarea
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        placeholder='Headers (JSON), e.g. {"Authorization": "Bearer ..."}'
        rows={3}
        className="w-full p-2 border rounded font-mono text-sm"
      ></textarea>
    </div>
  );
}

export default ManualInputForm;
