import * as React from 'react';
import { CDN_domain, domain, fetch1xFullDesign } from '../../../api/appProvider';
import { fileItem } from '../../../interfaces/design';

export interface IFullDesignContainerProps {
  selectedFile: fileItem
}

export default function FullDesignContainer (props: IFullDesignContainerProps) {
  const { selectedFile} = props;
  const fulldesignCanvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(()=>{
    if(selectedFile && selectedFile.fullPath){
      fetch1xFullDesign(selectedFile.fullPath).then((designUrl )=>{
        const fullDesignUrl = `${domain}${designUrl}`;
        console.log("fetch1xFullDesign -> designUrl", fullDesignUrl);
        var image = new Image();
        image.src = fullDesignUrl;
        image.onload=function(){
          const canvas  =  document.getElementById('fulldesign-canvas') as HTMLCanvasElement;
          canvas.width = image.width;
          canvas.height = image.height;
          
          const cxt = canvas.getContext("2d");
          console.log("fetch1xFullDesign -> cxt", cxt)
          cxt?.drawImage(image,0,0, image.width, image.height);
          
        }
        
      })
    }


  },[selectedFile])
  return (
    <div className="rd-fulldesign-container">
      <div className="close-button"><img alt="close button icon" src={`${CDN_domain}/icons/close.svg`} width="20"/></div>
      <div className="navIcons prev-button"><img alt="prev button icon" src={`${CDN_domain}/icons/next.png`} width="20"/></div>
      <div className="navIcons next-button"><img alt="next button icon" src={`${CDN_domain}/icons/prev.png`} width="20"/></div>
      
      <div className='rd-fulldesign-box'>
      <div className='rd-fulldesign'>
        <canvas id="fulldesign-canvas" ref={fulldesignCanvasRef}/>
      </div>

      </div>
      
    </div>
  );
}
