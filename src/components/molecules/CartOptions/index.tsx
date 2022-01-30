import * as React from "react";
import { getPriceFromPath } from "../../../utils/stringUtils";

export interface ICartOptionsProps {
  FullPath?: string;
  handleBuy?: () => void;
  handleCartAdd?: () => void;
}

export default function CartOptions(props: ICartOptionsProps) {
  const { FullPath, handleBuy, handleCartAdd } = props;
  console.log("CartOptions -> FullPath", FullPath);

  return (
    <div className="rd-cart-options">
      <div className="rd-cart-options-buy" onClick={handleBuy}>
        <span>Buy Design</span>
        {FullPath && <div>$ {getPriceFromPath(FullPath)}</div>}
      </div>
      <div className="rd-cart-options-add" onClick={handleCartAdd}>
        <span>+</span>
        <div>Cart</div>
      </div>
    </div>
  );
}
