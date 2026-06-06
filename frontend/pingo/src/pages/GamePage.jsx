import { useState } from "react";
import { useEffect } from "react";

import GameForm from "../components/GameForm";

import PlinkoBoard from "../components/PlinkoBoard";

import ResultCard from "../components/ResultCard";

import { createCommit, startRound } from "../services/api";

import FairnessCard from "../components/FairnessCard";

export default function GamePage() {
  const [clientSeed, setClientSeed] = useState("shivam");

  const [betCents, setBetCents] = useState(100);

  const [dropColumn, setDropColumn] = useState(6);

  const [roundId, setRoundId] = useState("");

  const [commitHex, setCommitHex] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  //   const [roundId, setRoundId] = useState("");

 const [error, setError] = useState("");

const handlePlay = async () => {
  if (dropColumn < 0 || dropColumn > 12) {
    setError("Drop column must be between 0 and 12");
    return;
  }

  setError("");

  try {
    const commitRes = await createCommit();
    setLoading(true);

    const id = commitRes.data.roundId;

    setRoundId(id);
    setCommitHex(commitRes.data.commitHex);

    const startRes = await startRound(id, {
      clientSeed,
      betCents,
      dropColumn,
    });

    setResult(startRes.data.result);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setDropColumn((prev) => Math.max(0, prev - 1));
    }

    if (e.key === "ArrowRight") {
      setDropColumn((prev) => Math.min(12, prev + 1));
    }

    if (e.code === "Space") {
      e.preventDefault();

      if (!loading) {
        handlePlay();
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [loading, handlePlay]);






  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Plinko Game</h1>

      <GameForm
        clientSeed={clientSeed}
        setClientSeed={setClientSeed}
        betCents={betCents}
        setBetCents={setBetCents}
        dropColumn={dropColumn}
        setDropColumn={setDropColumn}
        handlePlay={handlePlay}
        loading={loading}
        setLoading={setLoading}
        error={error}
        
      />

      <PlinkoBoard result={result} />

      {roundId && <FairnessCard roundId={roundId} />}

      <ResultCard roundId={roundId} commitHex={commitHex} result={result} />
    </div>
  );
}
