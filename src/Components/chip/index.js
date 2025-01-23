import React from "react";
import "./style.css";
const Chip = ({ stock }) => {


  return (
    <>
      { stock == 0 ? (
        <span className="out-of-stock">out of stock</span>
      ) : (
        <span className="in-stock">
          in stock <span className="text-black"> {`(${stock})`}</span>
        </span>
      )}
    </>
  );
};

export default Chip;
