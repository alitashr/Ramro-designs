import * as React from "react";
import { CDN_domain } from "../../../api/appProvider";
import { fileItem } from "../../../interfaces/design";
import DesignCanvas from "../../molecules/DesignCanvas";
import DesignColorsContainer from "../../molecules/DesignColorsContainer";
import CartOptions from "../../molecules/CartOptions";
export interface IFullDesignContainerProps {
  selectedFile: fileItem;
  onClose: () => void;
  onNavArrowClick: (direction: string) => void;
}

export default function FullDesignContainer(props: IFullDesignContainerProps) {
  const { selectedFile, onClose, onNavArrowClick } = props;

  React.useEffect(() => {}, [selectedFile]);
  const handleClose = () => {
    if (onClose) onClose();
  };
  const onArrowClick = (direction: string) => {
    if (onNavArrowClick) onNavArrowClick(direction);
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
            <DesignCanvas selectedFile={selectedFile} />
          </>
        )}
        {selectedFile && selectedFile.designProps && (
          <DesignColorsContainer designColors={selectedFile.designProps.DesignColors} />
        )}
        <CartOptions />
      </div>
    </div>
  );
}
