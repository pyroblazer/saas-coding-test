import express from 'express';
import { getPriceHistory } from '../controllers/priceHistoryController';

const router = express.Router();

router.get('/:pricing_id', getPriceHistory);

export default router;
