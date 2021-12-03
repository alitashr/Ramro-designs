import * as React from "react";
import { CDN_domain, domain, fetch1xFullDesign, getRenderedDesign } from "../../../api/appProvider";
import { fileItem } from "../../../interfaces/design";
import { getLogoCanvas } from "../../../utils/canvasUtils";
import { generateHash } from "../../../utils/stringUtils";

export interface IFullDesignContainerProps {
  selectedFile: fileItem;
}

export default function FullDesignContainer(props: IFullDesignContainerProps) {
  const { selectedFile } = props;
  const fulldesignCanvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (selectedFile && selectedFile.fullPath) {
      const getRenderedDesignProps = {
        fullpath: selectedFile.fullPath,
        designDetails: selectedFile.designProps,
        Width: selectedFile.designProps.Width,
        Height: selectedFile.designProps.Height,
        applyKLRatio: true,
        zoom: 1,
        hash: generateHash(selectedFile.designProps),

        KLRatio: selectedFile.designProps.KLRatio,
      };
      getRenderedDesign(getRenderedDesignProps).then((designCanvas: any) => {
        const canvas = document.getElementById("fulldesign-canvas") as HTMLCanvasElement;
        canvas.width = designCanvas.width;
        canvas.height = designCanvas.height;
        const cxt = canvas.getContext("2d");
        cxt?.drawImage(designCanvas, 0, 0, canvas.width, canvas.height);
      });
    }
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
        <div className="rd-fulldesign">
          <canvas id="fulldesign-canvas" ref={fulldesignCanvasRef} />
        </div>
      </div>
    </div>
  );
}
