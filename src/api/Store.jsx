import React, { useState } from "react";
// import { ref, onValue } from "firebase/database";
// import database from "./api/Api";

const initialState = {
  activeTab: '',
  activeCharacterScreenMenuTab: '',
  name: "asdx",
  email: "asdf@abv.bg",
  hero: {
    name: "Johnny",
    age: 1,
    action: () => this.age++,
  }
}

export const Context = React.createContext();

const Store = ({ children }) => {

  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )
}

export default Store;