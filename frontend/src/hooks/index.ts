import { useEffect, useState } from "react";
import { Customer, Pricing, PriceHistory } from "./types";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  useEffect(() => {
    async function fetchCustomers() {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/v1/customers`);
      const data = await response.json();
      setCustomers(data.data);
    }
    fetchCustomers();
  }, []);
  
  return { customers };
};

export const usePricing = (selectedCustomer: Customer | null) => {
  const [pricing, setPricing] = useState<Pricing[]>([]);

  useEffect(() => {
    if (selectedCustomer) {
      async function fetchPricing() {
        const response = await fetch(
          `${import.meta.env.VITE_API_HOST}/v1/pricing?customer_id=${selectedCustomer.customer_id}`
        );
        const data = await response.json();
        setPricing(data.data);
      }
      fetchPricing();
    }
  }, [selectedCustomer]);

  return { pricing };
};

export const usePriceHistory = () => {
  const [history, setHistory] = useState<PriceHistory[]>([]);

  const loadPriceHistory = async (pricingId: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/v1/price-history/${pricingId}`);
    const data = await response.json();
    setHistory(data.data);
  };

  return { history, loadPriceHistory };
};
