import express from 'express';
import pricingRoutes from './routes/pricing';
import customerRoutes from './routes/customer';
import priceHistoryRoutes from './routes/priceHistory';
import cors from "cors";

export const PORT = process.env.PORT || 3000;
export const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/pricing', pricingRoutes);
app.use('/api/v1/price-history', priceHistoryRoutes);
app.use('/api/v1/customers', customerRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
