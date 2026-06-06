import { useState } from "react";
import axios from "axios";

const shortenHash = (hash) => {
  if (!hash) return "";
  return `${hash.slice(0, 12)}...${hash.slice(-12)}`;
};

export default function FairnessCard({ roundId }) {
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);

  const [revealData, setRevealData] = useState(null);
  const [revealLoading, setRevealLoading] = useState(false);

  const API = import.meta.env.VITE_BACKEND_API;

  const verifyFairness = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/${roundId}/verify`
      );

      setVerification(res.data);
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReveal = async () => {
    try {
      setRevealLoading(true);

      const res = await axios.post(
        `${API}/${roundId}/reveal`
      );

      setRevealData(res.data);
    } catch (error) {
      console.error(error);
      alert("Reveal failed");
    } finally {
      setRevealLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: "30px auto",
        padding: "25px",
        border: "1px solid #374151",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "750px",
        background: "#111827",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🔐 Provably Fair Verification
      </h2>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={verifyFairness}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Verifying..." : "Verify Fairness"}
        </button>

        <button
          onClick={handleReveal}
          disabled={revealLoading}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {revealLoading ? "Revealing..." : "Reveal Server Seed"}
        </button>
      </div>

      {/* Reveal Card */}
      {revealData && (
        <div
          style={{
            background: "#052e16",
            border: "1px solid #22c55e",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#22c55e",
              marginBottom: "10px",
            }}
          >
            ✅ Server Seed Revealed
          </h3>

          <p>
            <strong>Server Seed:</strong>
          </p>

          <p
            style={{
              wordBreak: "break-all",
              color: "#d1d5db",
            }}
          >
            {shortenHash(revealData.serverSeed)}
          </p>

          <p>
            <strong>Revealed At:</strong>{" "}
            {new Date(revealData.revealedAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Verification Results */}
      {verification && (
        <div>
          <div
            style={{
              display: "inline-block",
              background: verification.verified
                ? "#16a34a"
                : "#dc2626",
              color: "white",
              padding: "8px 18px",
              borderRadius: "999px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {verification.verified
              ? "✅ VERIFIED"
              : "❌ FAILED"}
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>Server Seed:</strong>{" "}
              {shortenHash(verification.serverSeed)}
            </p>

            <p>
              <strong>Client Seed:</strong>{" "}
              {verification.clientSeed}
            </p>

            <p>
              <strong>Nonce:</strong>{" "}
              {verification.nonce}
            </p>

            <p>
              <strong>Commit Hash:</strong>{" "}
              {shortenHash(verification.commitHex)}
            </p>

            <hr
              style={{
                margin: "15px 0",
                borderColor: "#374151",
              }}
            />

            <p>
              <strong>Stored Bin:</strong>{" "}
              {verification.stored.binIndex}
            </p>

            <p>
              <strong>Recalculated Bin:</strong>{" "}
              {verification.recalculated.binIndex}
            </p>

            <p>
              <strong>Stored Peg Hash:</strong>{" "}
              {shortenHash(
                verification.stored.pegMapHash
              )}
            </p>

            <p>
              <strong>Recalculated Peg Hash:</strong>{" "}
              {shortenHash(
                verification.recalculated.pegMapHash
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}