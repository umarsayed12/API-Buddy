import React from "react";
import { useParams } from "react-router-dom";
import { useGetHistoryByIdQuery } from "../../slices/api/historyApi";
import { Loader2 } from "lucide-react";
import LoadingScreen from "../ui/LoadingScreen";
const JsonBlock = ({ title, data }) => (
  <div className="bg-gray-900 text-white rounded-xl p-4 mb-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <pre className="whitespace-pre-wrap break-all text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

const TestHistoryDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetHistoryByIdQuery(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-red-500 p-4 text-center">
        Failed to load history. Please try again later.
      </div>
    );
  }

  const { testType, testName, createdAt, request, response } = data;

  return (
    <div className="h-full flex flex-col pt-26 p-8">
      <h1 className="text-xl mb-2 font-bold pl-2">Test History Detail</h1>

      <div className="mb-4 p-2 text-sm text-black">
        <p>
          <strong>Type:</strong> {testType}
        </p>
        <p>
          <strong>Name:</strong> {testName || "Untitled"}
        </p>
        <p>
          <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <JsonBlock title="Request Info" data={request} />
      <JsonBlock title="Response Info" data={response} />
    </div>
  );
};

export default TestHistoryDetail;
