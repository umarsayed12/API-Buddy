import { useState } from "react";
import { useJwt } from "../../context/JWTContext";
import { jwtDecode } from "jwt-decode";
import { EyeOff, Eye } from "lucide-react";
export default function JwtTokenInput() {
  const { token, setToken } = useJwt();

  let decoded = null;
  let isExpired = false;

  try {
    decoded = jwtDecode(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      isExpired = true;
    }
  } catch {}
  const [showJwt, setShowJwt] = useState(false);
  return (
    <div className="bg-white w-[40%] shadow p-4 rounded-lg space-y-2 mb-4 border">
      <label className="block text-sm font-medium text-gray-700">
        JWT Auth Token
      </label>
      <div className="relative">
        <input
          type={showJwt ? "text" : "password"}
          className="w-full border rounded p-2 text-black text-sm pr-10"
          placeholder="Paste your JWT here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowJwt(!showJwt)}
          className="absolute z-50 inset-y-0 right-0 flex items-center px-3 text-black cursor-pointer"
        >
          {showJwt ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {token && (
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div>
            {isExpired ? (
              <span className="text-red-500">This Token is Expired</span>
            ) : (
              <span className="text-green-600">This Token is Valid</span>
            )}
            {decoded?.exp && (
              <div>Exp: {new Date(decoded.exp * 1000).toLocaleString()}</div>
            )}
          </div>
          <button
            onClick={() => setToken("")}
            className="text-red-500 underline text-xs cursor-pointer"
          >
            Clear Token
          </button>
        </div>
      )}
    </div>
  );
}
