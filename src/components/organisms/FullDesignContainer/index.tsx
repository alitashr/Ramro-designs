import * as React from "react";
import { CDN_domain } from "../../../api/appProvider";
import { fileItem } from "../../../interfaces/design";
import DesignCanvas from "../../molecules/DesignCanvas";
import DesignColorsContainer from "../../molecules/DesignColorsContainer";
import CartOptions from "../../molecules/CartOptions";
export interface IFullDesignContainerProps {
  selectedFile: fileItem;
}

export default function FullDesignContainer(props: IFullDesignContainerProps) {
  const { selectedFile } = props;

  React.useEffect(() => {
    
  }, [selectedFile]);
  return (
    <div className="rd-fulldesign-container">
      <div className="close-button">
        <img alt="close button icon" src={`${CDN_domain}/icons/close.svg`} width="20" />
      </div>
      <div className="navIcons prev-button">
        <img alt="prev button icon" src={`${CDN_domain}/icons/next.png`} width="20" />
      </div>
      <div className="navIcons next-button">
        <img alt="next button icon" src={`${CDN_domain}/icons/prev.png`} width="20" />
      </div>

      <div className="rd-fulldesign-box">
        {
          selectedFile && (
          <><DesignCanvas selectedFile={selectedFile}/>

          </>)
        }
        {
          selectedFile && selectedFile.designProps && (
            <DesignColorsContainer/>
          )
        }
        <CartOptions/>
      </div>
    </div>
  );
}
