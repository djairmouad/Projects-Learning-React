import { useContext } from "react";
import logImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header(){
    const {items} = useContext(CartContext);
    const userCartProgress=useContext(UserProgressContext)
     const NumberCart = items.reduce((acc, item) =>{return acc + item.quantity }, 0) 
    return(
        <header id="main-header">
            <div id="title">
                <img src={logImg} alt="A restaurant"/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={userCartProgress.showCart}>Cart ({NumberCart})</Button>
            </nav>
        </header>
    );
}
