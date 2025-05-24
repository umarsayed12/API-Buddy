import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import EndpointTable from "./components/EndpointTable";

function App() {
  const [endpoints, setEndpoints] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">API Buddy</h1>
      <FileUpload setEndpoints={setEndpoints} />
      {endpoints.length > 0 && <EndpointTable endpoints={endpoints} />}
    </div>
  );
}

export default App;
