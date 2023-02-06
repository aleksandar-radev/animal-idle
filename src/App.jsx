import "./App.scss";
import Store from "./api/Store";
import React, { useEffect } from "react";
import Container from "./main/Container";

function App () {
  useEffect(() => {
    function setScale () {
      document.documentElement.style.setProperty("--pixelWidth", `${window.innerWidth - 50}px`);
    }
    window.addEventListener("resize", setScale);
    setScale();
  }, [])

  return (
    <>
      <Store>
        <Container></Container>
      </Store>
    </>
  );
}

export default App;
