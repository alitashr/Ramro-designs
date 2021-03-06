import * as React from "react";
import { CDN_domain } from "../../../api/appProvider";
import { fileItem } from "../../../interfaces/design";
import DesignCanvas from "../../molecules/DesignCanvas";
import DesignColorsContainer from "../../molecules/DesignColorsContainer";
import CartOptions from "../../molecules/CartOptions";
import { AddToCart } from "../../../redux/Cart/cartActions";
import { RootReducerState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
export interface IFullDesignContainerProps {
  selectedFile: fileItem;
  onClose: () => void;
  onNavArrowClick: (direction: string) => void;
}

export default function FullDesignContainer(props: IFullDesignContainerProps) {
  const { selectedFile, onClose, onNavArrowClick } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const cartItems = useSelector((state: RootReducerState) => state.cart?.designs);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleClose = () => {
    if (onClose) onClose();
  };
  const onArrowClick = (direction: string) => {
    setIsLoading(true);
    if (onNavArrowClick) onNavArrowClick(direction);
  };
  const onDesignImageLoadComplete = () => {
    setIsLoading(false);
  };
  const handleAddtoCart = () => {
    if (cartItems && cartItems.length) {
      const alreadyInCart = cartItems.find(
        (cartitem) => cartitem.fullPath.toLowerCase() === selectedFile.fullPath.toLowerCase()
      );
      if (alreadyInCart) {
        return;
      }
    }
    dispatch(AddToCart(selectedFile));
  };
  const handleBuy = () => {
    handleAddtoCart();
    navigate("/:cart");
  };

  return (
    <div className="rd-fulldesign-container">
      <div className="rd-fulldesign-box">
        <div className="rd-fulldesign-box-icons close-popup" onClick={handleClose}>
          <img alt="close button icon" src={`${CDN_domain}/icons/closePopUp.png`} width="100%" />
        </div>
        <div className="rd-fulldesign-box-icons navIcons next-button" onClick={() => onArrowClick("next")}>
          <img alt="prev button icon" src={`${CDN_domain}/icons/next.png`} width="100%" />
        </div>
        <div className="rd-fulldesign-box-icons navIcons prev-button" onClick={() => onArrowClick("prev")}>
          <img alt="next button icon" src={`${CDN_domain}/icons/prev.png`} width="100%" />
        </div>
        {selectedFile && (
          <>
            <DesignCanvas selectedFile={selectedFile} onLoadComplete={onDesignImageLoadComplete} />
          </>
        )}
        {selectedFile && selectedFile.designProps && (
          <DesignColorsContainer designColors={selectedFile.designProps.DesignColors} />
        )}
        {selectedFile && (
          <CartOptions FullPath={selectedFile.fullPath} handleBuy={handleBuy} handleCartAdd={handleAddtoCart} />
        )}
        {isLoading && (
          <div className="rd-LoadingOverlay">
            <img src={`${CDN_domain}/icons/loading.gif`} alt="loading gif" />
          </div>
        )}
      </div>
    </div>
  );
}
