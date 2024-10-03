import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await prisma.customer.findMany();
    console.log(customers);
    
    if (customers.length === 0) {
        res.status(404).json({ message: 'No customers found.' });
        return
    }

    res.status(200).json({ data: customers });
  } catch (e) {
    console.error("Error retrieving customers: " + e);
    res.status(500).json({ error: "Failed to fetch customers: " + e });
  }
};
