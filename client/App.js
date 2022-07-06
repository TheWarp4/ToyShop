import React, { createContext } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = (props) => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
