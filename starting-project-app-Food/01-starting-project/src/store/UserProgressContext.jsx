import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

export default UserProgressContext;

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
    console.log("yep");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userCtx = {
    progress: userProgress,
    showCart: showCart,
    hideCart: hideCart,
    showCheckout: showCheckout,
    hideCheckout: hideCheckout
  };

  return (
    <UserProgressContext.Provider value={userCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
