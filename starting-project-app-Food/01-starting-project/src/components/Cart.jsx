import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){
    const userCtx=useContext(UserProgressContext);
    const cartCtx=useContext(CartContext);
    const cartTotal=cartCtx.items.reduce((acc,current)=>{return acc+ current.quantity*current.price},0);
    function heandelCloser(){
        userCtx.hideCart();
        console.log("hello");
    }
    return <Modal className="cart" open={ userCtx.progress==="cart"?true:false} >
    <h2>Your Cart</h2>
    <ul>
     {
        cartCtx.items.map((item)=>{return <CartItem key={item.id} {...item} item={item}/>})
     }
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
     <Button textOnly={true} onClick={heandelCloser}>Close</Button>
    {cartCtx.items.length>0 && (<Button onClick={userCtx.showCheckout}>Go to Checkout</Button>)} 
    </p>
    </Modal>
}