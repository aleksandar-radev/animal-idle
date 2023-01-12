import "./App.css";
import Store from "./Store";
import React from "react";
import Random from "./components/Random";

function App () {
  return (
    <>
    <Store>
      <Random/>
    </Store>
    </>
  );
}

export default App;
