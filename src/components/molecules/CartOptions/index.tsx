import * as React from "react";
import { getPriceFromPath } from "../../../utils/stringUtils";

export interface ICartOptionsProps {
  FullPath?: string
}

export default function CartOptions(props: ICartOptionsProps) {
  const {FullPath} = props;
  console.log("CartOptions -> FullPath", FullPath)

  return (
    <div className="rd-cart-options" >
      <div className="rd-cart-options-buy">
        <span>
        Buy Design
        </span>
       {FullPath && <div>
          $ {getPriceFromPath(FullPath)}
        </div>}
      </div>
      <div className="rd-cart-options-add">
        <span>+</span>
        <div>Cart</div>
      </div>
    </div>
  );
}
