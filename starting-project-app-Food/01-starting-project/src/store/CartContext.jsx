import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  emptyItems:()=>{}
});
export default CartContext;

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updateItems = [...state.items];
    if (existingItem.quantity === 1) {
      updateItems.splice(existingCartItemIndex, 1);
    } else {
      const updateItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updateItems[existingCartItemIndex] = updateItem;
    }
    return { ...state, items: updateItems };
  }
  if(action.type==="REMOVE_ALL_ITEM"){
   return {items: []}
  }
  return state; // return the current state for default case
}

export function CartContextProvider({ children }) {
  const [statItems, dispatchItems] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchItems({
      type: "ADD_ITEM",
      item: item,
    });
  }

  function removeItem(item) {
    dispatchItems({
      type: "REMOVE_ITEM",
      item: item, // Ensuring the key is explicit
    });
  }
 function emptyItems(){
  dispatchItems({
    type: "REMOVE_ALL_ITEM"
  });
 }
  const cartCtx = {
    items: statItems.items, // Correcting the structure of the state
    addItem: addItem,
    removeItem: removeItem,
    emptyItems:emptyItems,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {children}
    </CartContext.Provider>
  );
}
