import axios from "axios";

const API =
  "http://localhost:5000/api/rounds";
  

export const createCommit = () =>
  axios.post(`${API}/commit`);

export const startRound = (
  roundId,
  payload
) =>
  axios.post(
    `${API}/${roundId}/start`,
    payload
  );

export const revealRound = (
  roundId
) =>
  axios.post(
    `${API}/${roundId}/reveal`
  );

export const verifyRound = (
  roundId
) =>
  axios.get(
    `${API}/${roundId}/verify`
  );