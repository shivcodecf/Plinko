import { useState } from "react";
import axios from "axios";

export default function FairnessCard({ roundId }) {
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyFairness = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/rounds/${roundId}/verify`
      );

      setVerification(res.data);
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "10px",
        width: "700px",
        background: "#111827",
      }}
    >
      <h2>🔐 Provably Fair Verification</h2>

      <button
        onClick={verifyFairness}
        disabled={loading}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Verifying..." : "Verify Fairness"}
      </button>

      {verification && (
        <div style={{ marginTop: "20px" }}>
          <h3
            style={{
              color: verification.verified
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            {verification.verified
              ? "✅ VERIFIED"
              : "❌ FAILED"}
          </h3>

          <p>
            <strong>Server Seed:</strong>
          </p>

          <p
            style={{
              wordBreak: "break-all",
            }}
          >
            {verification.serverSeed}
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
            <strong>Commit Hash:</strong>
          </p>

          <p
            style={{
              wordBreak: "break-all",
            }}
          >
            {verification.commitHex}
          </p>

          <hr />

          <p>
            <strong>Stored Bin:</strong>{" "}
            {verification.stored.binIndex}
          </p>

          <p>
            <strong>Recalculated Bin:</strong>{" "}
            {verification.recalculated.binIndex}
          </p>

          <p>
            <strong>Stored Peg Hash:</strong>
          </p>

          <p
            style={{
              wordBreak: "break-all",
            }}
          >
            {verification.stored.pegMapHash}
          </p>

          <p>
            <strong>Recalculated Peg Hash:</strong>
          </p>

          <p
            style={{
              wordBreak: "break-all",
            }}
          >
            {verification.recalculated.pegMapHash}
          </p>
        </div>
      )}
    </div>
  );
}