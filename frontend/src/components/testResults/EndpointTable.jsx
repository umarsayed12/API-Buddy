import React from "react";

function EndpointTable({ endpoints }) {
  return (
    <div className="overflow-x-auto bg-gray-900 shadow-2xl shadow-black rounded-xl p-4">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2">Name</th>
            <th className="p-2">Method</th>
            <th className="p-2">URL</th>
            <th className="p-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{ep.name}</td>
              <td className="p-2 font-bold text-blue-600">{ep.method}</td>
              <td className="p-2 text-sm">{ep.url}</td>
              <td className="p-2 whitespace-pre-wrap text-xs text-gray-200">
                {ep.body || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EndpointTable;
