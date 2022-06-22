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
    <div >
      <div className="product-categories">
        {categories.map((category, i) => {
          return (
            <button
              key={i}
              onClick={handleChange}
              className={filter.type === category ? "active" : ""}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

export default ProductFilterbar;
