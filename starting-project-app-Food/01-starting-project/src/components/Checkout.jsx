import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import useHttp from './hooks/useHttp';
import Error from './Error';

const requestConfig={
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((acc, current) => acc + current.quantity * current.price, 0);
    function heandelCloas(){
        userCtx.hideCheckout();
       }
    const {data ,error,isLoading:isSending,sendRequest}=useHttp("http://localhost:3000/orders",requestConfig,[]);
    async function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
 

            sendRequest(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            }))
           
    }
    
    let action=(
     <>
         <Button type='button' onClick={heandelCloas} textOnly>Close</Button>
         <Button>Submit the Order</Button>
     </>
    )
    if(isSending){
      action=(<span>Sending order data....</span>)
    }
    if(data.length!==0 && !error){
        return <Modal open={userCtx.progress === 'checkout'}>
          <h2>success!!!</h2>
          <Button onClick={()=>{heandelCloas();cartCtx.emptyItems()}} >Okay</Button>
        </Modal>
    }
    return (
        <Modal open={userCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type='text' id='name' />
                <Input label='E-Mail Address' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className='control-row'>
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                {error && (<Error title="failed to submit" message={error}/>)}
                <p className='modal-actions'>
                   {action}
                </p>
            </form>
        </Modal>
    );
}
