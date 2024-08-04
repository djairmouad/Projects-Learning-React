import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
  return (
    
    <>
    <UserProgressContextProvider>
    <CartContextProvider>
    
      <Header/>
      <Meals/>
      <Cart></Cart>
      <Checkout></Checkout>
      
    </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
