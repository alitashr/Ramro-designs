import * as React from "react";

export interface ICartOptionsProps {}

export default function CartOptions(props: ICartOptionsProps) {
  return (
    <div className="rd-cart-options" >
      <div className="rd-cart-options-buy">
        <span>
        Buy Design
        </span>
      </div>
      <div className="rd-cart-options-add">
        <span>+</span>
        <div>Cart</div>
      </div>
    </div>
  );
}
