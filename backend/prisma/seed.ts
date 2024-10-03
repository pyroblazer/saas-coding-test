import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // List of organic farm produce products
  const products = [
    { product_name: 'Organic Apples', description: 'Freshly picked organic apples' },
    { product_name: 'Organic Carrots', description: 'Crunchy and sweet organic carrots' },
    { product_name: 'Organic Tomatoes', description: 'Juicy and ripe organic tomatoes' },
    { product_name: 'Organic Lettuce', description: 'Crisp and fresh organic lettuce' },
    { product_name: 'Organic Strawberries', description: 'Sweet and juicy organic strawberries' },
    { product_name: 'Organic Cucumbers', description: 'Cool and refreshing organic cucumbers' },
    { product_name: 'Organic Potatoes', description: 'Nutritious and hearty organic potatoes' },
    { product_name: 'Organic Spinach', description: 'Leafy and healthy organic spinach' },
    { product_name: 'Organic Eggs', description: 'Free-range organic eggs' },
    { product_name: 'Organic Honey', description: 'Pure organic honey from local farms' },
  ];

  // Seed products into the database
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  // Diverse range of customers with different currencies
  const customers = [
    { customer_name: 'John Doe', currency: 'USD' },
    { customer_name: 'Sarah Smith', currency: 'IDR' },
    { customer_name: 'Linda Green', currency: 'SGD' },
    { customer_name: 'Alex Brown', currency: 'HKD' },
    { customer_name: 'Chris White', currency: 'AUD' },
    { customer_name: 'Emily Davis', currency: 'EUR' },
    { customer_name: 'Michael Johnson', currency: 'JPY' },
    { customer_name: 'Emma Wilson', currency: 'CAD' },
    { customer_name: 'James Taylor', currency: 'NZD' },
    { customer_name: 'Olivia Martinez', currency: 'CHF' },
  ];

  // Seed customers into the database
  for (const customer of customers) {
    await prisma.customer.create({ data: customer });
  }

  // Fetch all products and customers to assign pricing
  const allProducts = await prisma.product.findMany();
  const allCustomers = await prisma.customer.findMany();

  // Loop through all products and customers to assign prices and histories
  for (const product of allProducts) {
    for (const customer of allCustomers) {
      const basePrice = parseFloat((Math.random() * 10 + 5).toFixed(2)); // Random price between 5.00 and 15.00
      const effectiveDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in the last 30 days

      // Create initial pricing
      const pricing = await prisma.pricing.create({
        data: {
          product_id: product.product_id,
          customer_id: customer.customer_id,
          price: basePrice,
          effective_date: effectiveDate,
        },
      });

      // Create random price history updates
      for (let i = 0; i < 3; i++) {
        const previousPrice = pricing.price;
        const updatedPrice = parseFloat((previousPrice * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2)); // +/- 10% price change
        const updateTimestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random past date

        // Create price history entry
        await prisma.priceHistory.create({
          data: {
            pricing_id: pricing.pricing_id,
            previous_price: previousPrice,
            updated_price: updatedPrice,
            update_timestamp: updateTimestamp,
          },
        });

        // Update the pricing table with the new price
        await prisma.pricing.update({
          where: { pricing_id: pricing.pricing_id },
          data: {
            price: updatedPrice,
            effective_date: new Date(), // Set effective date to now
          },
        });
      }
    }
  }

  console.log('Seed data inserted successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
