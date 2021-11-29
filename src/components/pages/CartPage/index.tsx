import * as React from 'react';
import { useSelector } from 'react-redux';
import { CDN_domain } from '../../../api/appProvider';
import { fileItem } from '../../../interfaces/design';
import { RootReducerState } from "../../../redux";
import Heading from '../../atoms/Heading';

export interface ICartPageProps {
}

export default function CartPage (props: ICartPageProps) {
  const cartItems = useSelector((state: RootReducerState) => state.cart?.designs);

  React.useEffect(()=>{
console.log('cartItems', cartItems)
  },[cartItems])
  return (
    <div>
      <Heading>Your Cart</Heading>
      <div>
      Once purchased, you can use these designs on any of your physical products without any restrictions.
The only thing you cannot do is to sell or distribute the designs that you have purchased.

Please refer to the Terms of Use for further details.
      </div>
      {
        cartItems && cartItems.map((cartItem: fileItem, index:number)=>(
          <div key={index} className="rd-cart-item-container">
           <div className="rd-cart-item-no">
             {index+1}
             </div>
             <div className="rd-cart-preview">
              <img src={cartItem.thumbUrl ||''} alt='preview-thumb'/>
             </div>
             <div className="rd-cart-details">
             {cartItem.name}
             </div>
             <div className="rd-cart-close">
               <img src={`${CDN_domain}/icons/close.svg`} alt='close icon'/>
             </div>
           
          </div>
        ))
      }
      
    </div>
  );
}
