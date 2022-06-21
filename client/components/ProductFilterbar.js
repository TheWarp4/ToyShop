import React, { useState } from "react";

const ProductFilterbar = ({ filter, setFilter }) => {
  const categories = [
    "ALL",
    "LEGOS",
    "TRANSFORMERS",
    "JURASSIC",
    "BARBIE",
    "STUFFED ANIMALS",
  ];

  const handleChange = (e) => {
    setFilter({ type: e.target.innerHTML });
  };

  return (
    <div className="product-categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              onClick={handleChange}
              className={filter.type === category ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * CONTAINER
 */

export default ProductFilterbar;
