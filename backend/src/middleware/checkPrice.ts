import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkPriceMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { customer_id, product_id, new_price } = req.body;

  try {
    const existingPricing = await prisma.pricing.findFirst({
      where: { customer_id, product_id },
      orderBy: { effective_date: 'desc' }
    });

    if (!existingPricing) {
      return next(); 
    }

    if (existingPricing.price === new_price) {
      res.status(200).json({ message: 'Price remains unchanged.' });
      return
    }

    res.locals.existingPricing = existingPricing;
    next();
  } catch (e) {
    console.error("Error checking price: " + e);
    res.status(500).json({ error: "Failed to check pricing: " + e });
  }
};
