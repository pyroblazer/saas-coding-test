import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getCustomers } from "../controllers/customerController";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", getCustomers);

export default router;
