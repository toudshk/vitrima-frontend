"use client";
import React, { FC, useState } from "react";
import styles from './PriceFilter.module.scss'
interface IPrice {
  minPrice: number | undefined
  maxPrice: number | undefined
  setMinPrice: any
  setMaxPrice: any
}

const PriceFilter:FC<IPrice> = ({minPrice, maxPrice, setMinPrice,setMaxPrice}) => {

  const handleMinPriceChange = (event: any) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: any) => {
    setMaxPrice(event.target.value);
  };

 

  return (
    <div className={styles.block}>
      <label>
        <input
        className={`${styles.input} mr-[0.8vw]`}
          type="text"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="от 0"
        />
      </label>
      <label>
        <input  className={styles.input} type="text" placeholder="до 1000000" value={maxPrice} onChange={handleMaxPriceChange} />
      </label>
    </div>
  );
};
export default PriceFilter;
