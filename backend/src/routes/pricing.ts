import express from 'express';
import { updatePrice, getActivePricing } from '../controllers/pricingController';
import { checkPriceMiddleware } from '../middleware/checkPrice';

const router = express.Router();

router.post('/', checkPriceMiddleware, updatePrice);
router.get('/', getActivePricing)

export default router;
