import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API;

console.log(import.meta.env.VITE_BACKEND_API);

console.log(import.meta.env);

  
  

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