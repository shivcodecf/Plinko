import crypto from "crypto";

import {
  createCommitHex,
  createCombinedSeed,
} from "../utils/hash.js";

export const generateServerSeed = () => {
  return crypto
    .randomBytes(32)
    .toString("hex");
};

export const generateNonce = () => {
  return crypto
    .randomBytes(8)
    .toString("hex");
};



export const createRoundFairness = () => {
  const serverSeed =
    generateServerSeed();

  const nonce = generateNonce();

  const commitHex =
    createCommitHex(
      serverSeed,
      nonce
    );

  return {
    serverSeed,
    nonce,
    commitHex,
  };
};



export const generateCombinedSeed =
  (
    serverSeed,
    clientSeed,
    nonce
  ) => {
    return createCombinedSeed(
      serverSeed,
      clientSeed,
      nonce
    );
  };