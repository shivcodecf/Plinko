export default function GameForm({
  clientSeed,
  setClientSeed,
  betCents,
  setBetCents,
  dropColumn,
  setDropColumn,
  handlePlay,
  loading,
  setLoading,
  error
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "end",
          marginBottom: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#9ca3af",
            }}
          >
            Client Seed
          </label>

          <input
            type="text"
            value={clientSeed}
            onChange={(e) => setClientSeed(e.target.value)}
            placeholder="Enter client seed"
            style={{
              padding: "12px",
              width: "220px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#111827",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#9ca3af",
            }}
          >
            Bet Amount
          </label>

          <input
            type="number"
            value={betCents}
            onChange={(e) => setBetCents(Number(e.target.value))}
            placeholder="100"
            style={{
              padding: "12px",
              width: "140px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#111827",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#9ca3af",
            }}
          >
            Drop Column
          </label>

          <input
            type="number"
            min="0"
            max="12"
            value={dropColumn}
            min="0"
            max="12"
            placeholder="enter in range of [0,12]"
            onChange={(e) => setDropColumn(Number(e.target.value))}
            placeholder="0"
            style={{
              padding: "12px",
              width: "140px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#111827",
              color: "white",
              fontSize: "16px",
            }}
          />

          {error && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              {error}
            </p>
          )}


        </div>
      </div>

      <button
        onClick={handlePlay}
        disabled={loading}
        style={{
          padding: "12px 24px",
          background: "#f59e0b",
          border: "none",
          borderRadius: "8px",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Dropping..." : "🎲 Drop Ball"}
      </button>
    </div>
  );
}
