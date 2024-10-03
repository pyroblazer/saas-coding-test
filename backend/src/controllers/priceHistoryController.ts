import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPriceHistory = async (req: Request, res: Response): Promise<void> => {
  const { pricing_id } = req.params;

  try {
    const histories = await prisma.priceHistory.findMany({
      where: { pricing_id },
    });

    if (histories.length === 0) {
      res.status(404).json({ message: 'No price history found for the provided pricing ID.' });
      return
    }

    res.status(200).json({ data: histories });
  } catch (e) {
    console.error("Error fetching price history: " + e);
    res.status(500).json({ error: "Failed to retrieve price history: " + e });
  }
};
