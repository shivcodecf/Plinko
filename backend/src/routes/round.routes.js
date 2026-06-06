import express from "express";

import {
  createCommit,
  revealRound,
  startRound,
  verifyRound,
} from "../controllers/round.controller.js";

const router = express.Router();

router.post("/commit", createCommit);

router.post("/:id/start", startRound);

router.post("/:id/reveal", revealRound);

router.get("/:id/verify", verifyRound);

export default router;