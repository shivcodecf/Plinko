import prisma from "../../prisma/client.js";
import {
  createRoundFairness,
  generateCombinedSeed,
} from "../services/fairness.service.js";
import { generatePlinkoResult } from "../services/plinko.service.js";

export const createCommit = async (req, res) => {
  try {
    console.log("prisma.round =", prisma.round);

    const { serverSeed, nonce, commitHex } = createRoundFairness();

    const round = await prisma.round.create({
      data: {
        status: "CREATED",
        nonce,
        commitHex,
        serverSeed,
      },
    });

    return res.status(201).json({
      success: true,
      roundId: round.id,
      commitHex: round.commitHex,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create round",
    });
  }
};

export const startRound = async (req, res) => {
  try {
    const { id } = req.params;

    const { clientSeed, betCents, dropColumn } = req.body;

    const betAmount = Number(betCents);

    if (isNaN(betAmount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bet amount",
      });
    }

    if(dropColumn<0 || dropColumn>12)
    {
        return res.status(400).json({
            success:false,
            message:"Invalid drop column"
        })
    }

    const round = await prisma.round.findUnique({
      where: {
        id,
      },
    });

    if (!round) {
      return res.status(404).json({
        success: false,
        message: "Round not found",
      });
    }

    const combinedSeed = generateCombinedSeed(
      round.serverSeed,
      clientSeed,
      round.nonce,
    );

    const result = generatePlinkoResult({
      combinedSeed,
      dropColumn,
    });

    const updatedRound = await prisma.round.update({
      where: {
        id,
      },
      data: {
        status: "STARTED",
        clientSeed,
        combinedSeed,
        pegMapHash: result.pegMapHash,
        dropColumn,
        binIndex: result.binIndex,
        betCents,
        pathJson: result.path,
      },
    });

    return res.json({
      success: true,
      round: updatedRound,
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to start round",
    });
  }
};

export const revealRound = async (req, res) => {
  try {
    const { id } = req.params;

    const round = await prisma.round.findUnique({
      where: { id },
    });

    if (!round) {
      return res.status(404).json({
        success: false,
        message: "Round not found",
      });
    }

    const updatedRound = await prisma.round.update({
      where: { id },
      data: {
        status: "REVEALED",
        revealedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      roundId: updatedRound.id,
      serverSeed: updatedRound.serverSeed,
      revealedAt: updatedRound.revealedAt,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to reveal round",
    });
  }
};

export const verifyRound = async (req, res) => {
  try {
    const { id } = req.params;

    const round = await prisma.round.findUnique({
      where: { id },
    });

    if (!round) {
      return res.status(404).json({
        success: false,
        message: "Round not found",
      });
    }

    const combinedSeed = generateCombinedSeed(
      round.serverSeed,
      round.clientSeed,
      round.nonce,
    );

    const result = generatePlinkoResult({
      combinedSeed,
      dropColumn: round.dropColumn,
    });

    const verified =
      result.binIndex === round.binIndex &&
      result.pegMapHash === round.pegMapHash;

    return res.json({
      success: true,
      verified,

      stored: {
        binIndex: round.binIndex,
        pegMapHash: round.pegMapHash,
      },

      recalculated: {
        binIndex: result.binIndex,
        pegMapHash: result.pegMapHash,
      },

      serverSeed: round.serverSeed,

      clientSeed: round.clientSeed,

      nonce: round.nonce,

      commitHex: round.commitHex,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};
