import { useState } from "react";
import "./App.css";
import { Customer, Pricing, Product, PriceHistory } from "./types";
import { useCustomers, usePricing, usePriceHistory } from "./hooks";
import CustomerSelect from "./components/CustomerSelect";
import PricingTable from "./components/PricingTable";
import PriceHistoryChart from "./components/PriceHistoryChart";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { customers } = useCustomers();
  const { pricing, loadPricing } = usePricing(selectedCustomer);
  const { history, loadPriceHistory } = usePriceHistory();

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.customer_id === customerId);
    setSelectedCustomer(customer || null);
    setSelectedProduct(null);
  };

  const handleViewHistory = (pricingId: string) => {
    const product = pricing.find(p => p.pricing_id === pricingId)?.product || null;
    setSelectedProduct(product);
    loadPriceHistory(pricingId);
  };

  return (
    <>
      <h1 className="font-extrabold text-xl">Pricing Management System</h1>

      <CustomerSelect customers={customers} onCustomerChange={handleCustomerChange} />

      <PricingTable pricing={pricing} onViewHistory={handleViewHistory} />

      {history.length > 0 && selectedProduct && (
        <PriceHistoryChart history={history} productName={selectedProduct.product_name} />
      )}
    </>
  );
}

export default App;
