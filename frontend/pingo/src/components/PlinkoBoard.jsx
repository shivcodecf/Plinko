import { useEffect, useState } from "react";

export default function PlinkoBoard({ result }) {
  const rows = result?.rows || 12;

  const [ballPosition, setBallPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!result?.path) return;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    // Accessibility:
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      const finalX =
        (result.binIndex - 6) * 55;

      setBallPosition({
        x: finalX,
        y: 465,
      });

      return;
    }

    let currentX = 0;
    let currentY = 0;

    setBallPosition({
      x: 0,
      y: 0,
    });

    result.path.forEach((step, index) => {
      setTimeout(() => {
        currentY += 32;

        if (step === "L") {
          currentX -= 12;
        } else {
          currentX += 12;
        }

        setBallPosition({
          x: currentX,
          y: currentY,
        });

        // Final landing
        if (
          index === result.path.length - 1
        ) {
          const finalX =
            (result.binIndex - 6) * 55;

          setTimeout(() => {
            setBallPosition({
              x: finalX,
              y: currentY + 80,
            });
          }, 250);
        }
      }, index * 350);
    });
  }, [result]);

  const multipliers = [
    20,
    10,
    5,
    3,
    2,
    1,
    0.5,
    1,
    2,
    3,
    5,
    10,
    20,
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      {/* Board */}
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "450px",
        }}
      >
        {/* Animated Ball */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#ef4444",
            transform: `translate(${ballPosition.x}px, ${ballPosition.y}px)`,
            transition: "all 0.3s ease",
            zIndex: 10,
            boxShadow:
              "0 0 12px rgba(239,68,68,0.8)",
          }}
        />

        {/* Pegs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {Array.from({ length: rows }).map(
            (_, row) => (
              <div
                key={row}
                style={{
                  display: "flex",
                  gap: "24px",
                  marginBottom: "18px",
                }}
              >
                {Array.from({
                  length: row + 1,
                }).map((_, peg) => (
                  <div
                    key={peg}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#60a5fa",
                    }}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Multiplier Bins */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "40px",
        }}
      >
        {multipliers.map((m, i) => (
          <div
            key={i}
            style={{
              width: "50px",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "bold",
              background:
                result?.binIndex === i
                  ? "#22c55e"
                  : "#f59e0b",
              color: "black",
              transition: "all 0.3s ease",
            }}
          >
            {m}x
          </div>
        ))}
      </div>

      {/* Accessibility Hint */}
      <p
        style={{
          color: "#9ca3af",
          fontSize: "14px",
          marginTop: "15px",
        }}
      >
        ⬅ ➡ Change Drop Column • SPACE Drop Ball
      </p>

      {/* Result */}
      {result && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <h3>
            🎯 Final Bin: {result.binIndex}
          </h3>
        </div>
      )}
    </div>
  );
}
