"use client";
import CustomerCard from "@/components/customer-card/CustomerCard";
import styles from "./page.module.css";
import { useGetCustomerListQuery } from "@/queries/customer";
import CustomerDetails from "@/components/customer-details/CustomerDetails";
import { useCallback, useState } from "react";
import { Customer } from "@/interfaces/customer";

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const { customerList } = useGetCustomerListQuery();

  const handleCustomerClick = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.customerList}>
        {customerList.map((customer) => (
          <CustomerCard
            key={customer.id}
            details={customer}
            isSelected={selectedCustomer?.id === customer.id}
            onClick={() => handleCustomerClick(customer)}
          />
        ))}
      </div>
      <div className={styles.customerDetails}>
        {selectedCustomer && (
          <CustomerDetails selectedCustomer={selectedCustomer} />
        )}
      </div>
    </div>
  );
}
