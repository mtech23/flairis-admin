import React from "react";
import "./style.css";
const Chip = ({ stock, isStockItem }) => {

  
  return (
    <>
      {!isStockItem ? (
        <span className="in-stock">Available</span>
      ) : stock > 0 ? (
        <span className="in-stock">
          in stock <span className="text-black"> {`(${stock})`}</span>
        </span>
      ) : (
        <span className="out-of-stock">out of stock</span>
      )}
    </>
  );
};

export default Chip;
