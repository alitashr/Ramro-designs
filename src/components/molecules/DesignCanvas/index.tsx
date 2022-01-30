import * as React from 'react';
import { getRenderedDesign } from '../../../api/appProvider';
import { fileItem } from '../../../interfaces/design';
import { generateHash } from '../../../utils/stringUtils';

export interface IDesignCanvasProps {
  selectedFile: fileItem;
  onLoadComplete?:Function
}

export default function DesignCanvas (props: IDesignCanvasProps) {
  const { selectedFile, onLoadComplete } = props;
  const fulldesignCanvasRef = React.useRef<HTMLCanvasElement>(null);

  
  React.useEffect(() => {
    if (selectedFile && selectedFile.fullPath) {
      const getRenderedDesignProps = {
        fullpath: selectedFile.fullPath,
        designDetails: selectedFile.designProps,
        Width: selectedFile.designProps?.Width,
        Height: selectedFile.designProps?.Height,
        applyKLRatio: true,
        zoom: 1,
        hash: generateHash(selectedFile.designProps),

        KLRatio: selectedFile.designProps.KLRatio,
      };
      getRenderedDesign(getRenderedDesignProps).then((designCanvas: any) => {
        if(!designCanvas) return;
        const canvas = document.getElementById("fulldesign-canvas") as HTMLCanvasElement;
        canvas.width = designCanvas.width;
        canvas.height = designCanvas.height;
        const cxt = canvas.getContext("2d");
        cxt?.drawImage(designCanvas, 0, 0, canvas.width, canvas.height);
        if(onLoadComplete) onLoadComplete();
      });
    }
  }, [selectedFile]);
  return (
    <div className="rd-fulldesign">
          <canvas id="fulldesign-canvas" ref={fulldesignCanvasRef} width={900} height={1200} />
        </div>
  );
}
