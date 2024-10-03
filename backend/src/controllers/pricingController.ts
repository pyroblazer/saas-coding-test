import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updatePrice = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, product_id, new_price } = req.body;

  try {
    const numericNewPrice = parseFloat(new_price);
    const existingPricing = res.locals.existingPricing;

    if (!existingPricing) {
      const newPricing = await prisma.pricing.create({
        data: {
          customer_id,
          product_id,
          price: numericNewPrice,
          effective_date: new Date(),
        },
      });
      res.status(201).json({ message: 'New price created.', newPricing: { ...newPricing, price: numericNewPrice } });
      return; 
    }

    const updatedPricing = await prisma.pricing.update({
      where: { pricing_id: existingPricing.pricing_id },
      data: { price: numericNewPrice, effective_date: new Date() },
    });

    await prisma.priceHistory.create({
      data: {
        pricing_id: existingPricing.pricing_id,
        previous_price: existingPricing.price,
        updated_price: numericNewPrice,
        update_timestamp: new Date(),
      },
    });

    res.json({ message: 'Price updated and history logged.', updatedPricing: { ...updatedPricing, price: numericNewPrice } });
  } catch (e) {
    console.error("Price update error: " + e);
    res.status(500).json({ error: "Price update error: " + e });
  }
};

export const getActivePricing = async (req: Request, res: Response) => {
  const { product_id, customer_id } = req.query;
  const query: Record<string, unknown> = {};

  if (product_id) query["product_id"] = product_id;
  if (customer_id) query["customer_id"] = customer_id;

  try {
    const prices = await prisma.pricing.findMany({
      where: query,
      include: { customer: true, product: true },
    });

    res.status(200).json({ data: prices });
  } catch (e) {
    console.error("Failed to retrieve active pricing: " + e);
    res.status(500).json({ error: "Failed to retrieve active pricing: " + e });
  }
};
