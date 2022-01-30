import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_domain } from "../../../api/appProvider";
import { fileItem } from "../../../interfaces/design";
import { RootReducerState } from "../../../redux";
import { RemoveFromCart } from "../../../redux/Cart/cartActions";
import { getPriceFromFullPath } from "../../../utils/treeUtils";
import Heading from "../../atoms/Heading";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootReducerState) => state.cart?.designs);

  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    if (!cartItems || !cartItems.length) return;

    var price = 0;
    cartItems.forEach((cartItem) => {
      price += getPriceFromFullPath(cartItem.fullPath);
    });
    console.log("price", price);
    setTotalPrice(price);
  }, [cartItems]);
  const handleRemove = (item: fileItem)=>{
    dispatch(RemoveFromCart(item))
  }
  return (
    <div className="rd-cart-page-container">
      <Heading className="page-heading">Your Cart</Heading>
      <div className="rd-subtext rd-page-info-textbox">
        Once purchased, you can use these designs on any of your physical products without any restrictions. The only
        thing you cannot do is to sell or distribute the designs that you have purchased. Please refer to the Terms of
        Use for further details.
      </div>

      {totalPrice && (
        <div className="rd-subtext rd-cart-pricearea">
          <div className="rd-cart-pricearea-title">TOTAL</div>
          <div className="rd-cart-pricearea-value">${totalPrice}</div>
        </div>
      )}
      {cartItems && (
        <div className="rd-cart-items-container">
          {cartItems.map((cartItem: fileItem, index: number) => (
            <div key={index} className="rd-cart-item-container">
              <div className="rd-subtext rd-cart-item-no">{index + 1}.</div>
              <div className="rd-cart-preview">
                <img src={cartItem.thumbUrl || ""} alt="preview-thumb" />
              </div>
              <div className="rd-cart-details">
              <div className="rd-subtext rd-cart-details-designtype">
                Single
                </div>
                <div className="rd-subtext rd-cart-details-designname">
                {cartItem.name}
                </div>
                <div className="rd-subtext rd-cart-details-price">
                  {`$${getPriceFromFullPath(cartItem.fullPath)}`}
                </div>
                </div>
              <div className="rd-cart-close" onClick={()=>handleRemove(cartItem)}>
                <img src={`${CDN_domain}/icons/close.svg`} alt="close icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
