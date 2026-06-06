export default function ResultCard({
  roundId,
  commitHex,
  result,
}) {

  if (!result) return null;

  return (
    <div>

      <h3>
        Result
      </h3>

      <p>
        Round:
        {roundId}
      </p>

      <p>
        Commit:
        {commitHex}
      </p>

      <p>
        Bin:
        {result.binIndex}
      </p>

    </div>
  );
}