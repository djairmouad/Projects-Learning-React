import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

export default function CartItem({name,quantity,price,item}){
    const {addItem,removeItem}=useContext(CartContext);
    return(
        <li className="cart-item">
         <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
         </p>
         <p className="cart-item-actions">
           <button onClick={()=>removeItem(item)}>-</button>
           <span>{quantity}</span>
           <button onClick={()=>addItem(item)}>+</button>
         </p>
        </li>
    )
}