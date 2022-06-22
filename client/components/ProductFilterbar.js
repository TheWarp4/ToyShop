import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const ProductFilterbar = ({ filter, setFilter }) => {
  const categories = [
    "ALL",
    "LEGOS",
    "TRANSFORMERS",
    "JURASSIC",
    "BARBIE",
    "STUFFED ANIMALS",
  ];

  let currentTab = 0

  const handleChange = (e, i) => {
    setFilter({ type: e.target.innerHTML });
    currentTab = i
    console.log(e.target.innerHTML )
  };

  return (
    <div>
    <Paper square>
    <Tabs
              value={currentTab}
              textColor="primary"
              indicatorColor="primary"
              // style='transparent'
    >
              {categories.map((category, i) => {
                return (
                  <Tab label={category} onClick={(event) =>{handleChange(event, i)}} key={i}/>
                );
              })}
      </Tabs>
      </Paper>



    </div>
  );
};

/**
 * CONTAINER
 */

// <Paper square>
//         <Tabs
//           value={value}
//           textColor="primary"
//           indicatorColor="primary"
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//         >
//           <Tab label="Active TAB One" />
//           <Tab label="Active TAB Two" />
//           <Tab label="Disabled TAB!" disabled />
//           <Tab label="Active Tab Three" />
//         </Tabs>
//         <h3>TAB NO: {value} clicked!</h3>
//       </Paper>

export default ProductFilterbar;
