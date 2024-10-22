import { Customer } from "@/interfaces/customer";
import styles from "./CustomerCard.module.scss";
import React from "react";

interface CustomerCardProps {
  details: Customer;
  isSelected: boolean;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = React.memo(
  ({ details, isSelected, onClick }) => {
    return (
      <div
        className={`${styles.card} ${isSelected ? styles.selected : ""}`}
        onClick={onClick}
      >
        <h3>{details.name}</h3>
        <p>{details.title}</p>
      </div>
    );
  }
);

CustomerCard.displayName = "CustomerCard";
export default CustomerCard;
