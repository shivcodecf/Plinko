import crypto from "crypto";

import { XorShift32 }
  from "../utils/xorshift32.js";

const ROWS = 12;

const clamp = (
  value,
  min,
  max
) => {
  return Math.max(
    min,
    Math.min(max, value)
  );
};

const roundBias = (
  value
) => {
  return Number(
    value.toFixed(6)
  );
};

const hashPegMap = (
  pegMap
) => {
  return crypto
    .createHash("sha256")
    .update(
      JSON.stringify(pegMap)
    )
    .digest("hex");
};

const seedFromCombinedSeed =
  (combinedSeed) => {

  const first4Bytes =
    combinedSeed.slice(0, 8);

  return parseInt(
    first4Bytes,
    16
  );
};

export const generatePlinkoResult =
  ({
    combinedSeed,
    dropColumn,
  }) => {

  const seed =
    seedFromCombinedSeed(
      combinedSeed
    );

  const rng =
    new XorShift32(seed);

  const pegMap = [];

  // ---------
  // Generate Peg Map
  // ---------

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    const currentRow = [];

    for (
      let peg = 0;
      peg <= row;
      peg++
    ) {

      const leftBias =
        roundBias(
          0.5 +
          (
            rng.random() - 0.5
          ) * 0.2
        );

      currentRow.push({
        leftBias,
      });
    }

    pegMap.push(currentRow);
  }

  const pegMapHash =
    hashPegMap(pegMap);

  // ----------
  // Path Generation
  // ----------

  const path = [];

  let pos = 0;

  const adjustment =
    (
      dropColumn -
      Math.floor(
        ROWS / 2
      )
    ) * 0.01;

  for (
    let row = 0;
    row < ROWS;
    row++
  ) {

    const pegIndex =
      Math.min(
        pos,
        row
      );

    const peg =
      pegMap[row][pegIndex];

    const bias =
      clamp(
        peg.leftBias +
        adjustment,
        0,
        1
      );

    const rnd =
      rng.random();

    if (rnd < bias) {

      path.push("L");

    } else {

      path.push("R");
      pos++;
    }
  }

  const binIndex = pos;

  return {
    rows: ROWS,
    pegMap,
    pegMapHash,
    path,
    binIndex,
  };
};