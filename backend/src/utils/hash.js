import crypto from "crypto";

export const sha256 = (value) => {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
};

export const createCommitHex = (
  serverSeed,
  nonce
) => {
  return sha256(
    `${serverSeed}:${nonce}`
  );
};

export const createCombinedSeed = (
  serverSeed,
  clientSeed,
  nonce
) => {
  return sha256(
    `${serverSeed}:${clientSeed}:${nonce}`
  );
};